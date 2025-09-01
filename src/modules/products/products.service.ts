import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ILike,
  Repository,
  MoreThan,
  FindOptionsWhere,
  Raw,
  In,
} from 'typeorm';
import { Product } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { CatalogResponseDto } from './dto/catalog-response.dto';
import {
  QueryCatalogProductDto,
  QueryProductDto,
} from './dto/query-product.dto';
import { FilesService } from '../files/files.service';
import { PedidoArticulo } from '../pedidos/entities/pedido_articulos.entity';

@Injectable()
export class ProductsService {
  private readonly publicSelectFields = {
    idArticulo: true,
    idRubro: true,
    rubro: { descripcion: true },
    descripcion: true,
    precioVenta: true,
    imagen: true,
    fechaAlta: true,
    detalle1: true,
    costoNeto: true,
    alicuotaIVA: true,
  };

  constructor(
    @InjectRepository(Product)
    private readonly _prodRepository: Repository<Product>,
    private readonly _filesService: FilesService,
    @InjectRepository(PedidoArticulo)
    private readonly _pedidoProdRepository: Repository<PedidoArticulo>,
  ) {}

  async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
    const existSameName = await this.findByName(createProductDto.descripcion);
    if (existSameName) {
      throw new ConflictException('El nombre de producto ya está en uso');
    }
    const newId = await this.generateNextProductId();

    await this._prodRepository.save({
      ...createProductDto,
      idArticulo: newId,
      imagen: undefined,
    });

    let status: 'SUCCESS' | 'PARTIAL_SUCCESS' = 'SUCCESS';
    let message: string | undefined;

    if (file) {
      const imageResult = await this.handleUploadImage(file, newId);

      if (imageResult.success) {
        await this._prodRepository.update(newId, {
          imagen: imageResult.imageUrl,
        });
      } else {
        status = 'PARTIAL_SUCCESS';
        message = imageResult.message;
      }
    }

    return {
      ok: true,
      status,
      message,
    };
  }

  private async handleUploadImage(
    file: Express.Multer.File,
    productId: string,
  ): Promise<{
    success: boolean;
    imageUrl?: string;
    message?: string;
  }> {
    try {
      this._filesService.validateImage(file);
      const imageUrl = await this._filesService.uploadImage(file, productId);

      return {
        success: true,
        imageUrl,
      };
    } catch (error) {
      console.error('Error al subir la imagen:', error.message);

      return {
        success: false,
        message: 'La imagen no pudo subirse.',
      };
    }
  }

  private whereBuilder(
    queryDto: QueryProductDto | QueryCatalogProductDto,
  ): FindOptionsWhere<Product> {
    const whereConditions: FindOptionsWhere<Product> = {
      descripcion: queryDto.description
        ? ILike(`%${queryDto.description}%`)
        : undefined,
      idRubro: queryDto.rubro || undefined,
    };

    if ('cursor' in queryDto && queryDto.cursor) {
      whereConditions.idArticulo = MoreThan(queryDto.cursor);
    }

    return whereConditions;
  }

  async findAll(queryDto: QueryProductDto) {
    const take = queryDto.take || 20;
    const page = queryDto.page || 1;
    const skip = (page - 1) * take;

    const whereConditions = this.whereBuilder(queryDto);

    const [products, total] = await this._prodRepository.findAndCount({
      relations: ['rubro'],
      where: whereConditions,
      order: { fechaAlta: 'DESC' },
      select: this.publicSelectFields,
      skip,
      take,
    });

    const totalPages = Math.ceil(total / take);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      items: plainToInstance(CatalogResponseDto, products),
      pagination: {
        page,
        take,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  async findAllCursorPaginated(queryDto: QueryCatalogProductDto) {
    const limit = queryDto.limit || 20;

    const whereConditions = this.whereBuilder(queryDto);

    const products = await this._prodRepository.find({
      relations: ['rubro'],
      where: whereConditions,
      order: { idRubro: 'ASC', fechaAlta: 'DESC' },
      select: this.publicSelectFields,
      take: limit + 1,
    });

    const hasNextPage = products.length > limit;
    const items = hasNextPage ? products.slice(0, limit) : products;

    const nextCursor = hasNextPage ? items[items.length - 1].idArticulo : null;

    return {
      items: plainToInstance(CatalogResponseDto, items),
      pagination: {
        hasNextPage,
        nextCursor,
        limit,
      },
    };
  }

  async findOne(id: string) {
    const prod = await this._prodRepository.findOne({
      where: { idArticulo: id },
      select: this.publicSelectFields,
    });
    if (!prod) {
      throw new NotFoundException('Producto no encontrado');
    }
    return prod;
  }

  async updateData(id: string, dto: UpdateProductDto) {
    if (dto.descripcion) {
      const existSameName = await this.findByName(dto.descripcion);
      if (existSameName && id != existSameName.idArticulo) {
        throw new ConflictException('El nombre de producto ya está en uso');
      }
    }

    await this._prodRepository.update({ idArticulo: id }, { ...dto });
    return { ok: true };
  }

  async updateImage(id: string, file: Express.Multer.File) {
    this._filesService.validateImage(file);
    const prod = await this.findOne(id);
    if (prod.imagen) {
      await this._filesService.deleteImage(prod.imagen);
    }
    const newImage = await this.handleUploadImage(file, id);
    await this._prodRepository.update(id, {
      imagen: newImage.imageUrl,
    });
    return { ok: true };
  }

  private async findByName(descripcion: string) {
    return await this._prodRepository.findOne({
      where: {
        descripcion: Raw((alias) => `${alias} ILIKE :busqueda`, {
          busqueda: `${descripcion}`,
        }),
      },
      select: { descripcion: true, idArticulo: true },
    });
  }

  async remove(id: string) {
    const prod = await this.findOne(id);
    if (!prod) {
      throw new NotFoundException('Producto no encontrado');
    }
    const hasRelations = await this._pedidoProdRepository.count({
      where: { idArticulo: id },
    });
    if (hasRelations) {
      await this.softDelete(id);
      return { ok: true };
    }
    if (prod.imagen) {
      await this._filesService.deleteImage(prod.imagen);
    }
    await this._prodRepository.delete({ idArticulo: id });
    return { ok: true };
  }

  async softDelete(id: string) {
    await this.findOne(id);
    await this._prodRepository.update(id, { eliminado: true });
    return { ok: true };
  }

  async getFeaturedProducts() {
    const news = await this._prodRepository.find({
      order: { fechaAlta: 'DESC' },
      relations: ['rubro'],
      select: this.publicSelectFields,
      take: 15,
    });
    return plainToInstance(CatalogResponseDto, news);
  }

  async validateIdsExist(ids: string[]) {
    const products = await this._prodRepository.find({
      where: { idArticulo: In(ids) },
      select: { idArticulo: true },
    });

    return products;
  }

  async generateNextProductId(): Promise<string> {
    const lastProduct = await this._prodRepository.find({
      order: { idArticulo: 'DESC' },
      select: ['idArticulo'],
    });

    let nextIdNumber = 1;
    if (lastProduct && lastProduct[0].idArticulo) {
      nextIdNumber = parseInt(lastProduct[0].idArticulo, 10) + 1;
    }

    // Rellenar con ceros a la izquierda hasta 5 caracteres
    const nextId = nextIdNumber.toString().padStart(5, '0');
    return nextId;
  }
}
