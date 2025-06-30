import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, MoreThan, FindOptionsWhere } from 'typeorm';
import { Product } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { CatalogResponseDto } from './dto/catalog-response.dto';
import {
  QueryCatalogProductDto,
  QueryProductDto,
} from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  private readonly publicSelectFields = {
    idArticulo: true,
    idRubro: true,
    rubro: { descripcion: true },
    descripcion: true,
    precioVenta: true,
    imagen: true,
  };

  constructor(
    @InjectRepository(Product)
    private readonly _prodRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return 'This action adds a new product';
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
      order: { idArticulo: 'ASC' },
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
      order: { idArticulo: 'ASC' },
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
