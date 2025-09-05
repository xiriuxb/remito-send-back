import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeaturedProduct } from './entities/featured-products.entity';
import { ProductsService } from '../products/products.service';
import { plainToInstance } from 'class-transformer';
import { CatalogResponseDto } from '../products/dto/catalog-response.dto';

@Injectable()
export class FeaturedProductService {
  constructor(
    @InjectRepository(FeaturedProduct)
    private readonly featuredRepo: Repository<FeaturedProduct>,

    private readonly _prodsService: ProductsService,
  ) {}

  async countFeatured(): Promise<number> {
    return this.featuredRepo.count();
  }

  async addFeatured(productId: string): Promise<FeaturedProduct> {
    const count = await this.countFeatured();
    if (count >= 6) {
      throw new BadRequestException(
        'Máximo de 6 productos destacados alcanzado',
      );
    }

    const product = await this._prodsService.findOne(productId);

    const alreadyFeatured = await this.featuredRepo.findOne({
      where: { product: { idArticulo: productId } },
      relations: ['product'],
    });

    if (alreadyFeatured) {
      throw new BadRequestException('Este producto ya está en destacados');
    }

    const featured = this.featuredRepo.create({ product });
    return this.featuredRepo.save(featured);
  }

  async removeFeatured(productId: string): Promise<void> {
    const featured = await this.featuredRepo.findOne({
      where: { product: { idArticulo: productId } },
      relations: ['product'],
    });

    if (!featured) {
      throw new NotFoundException('Producto no está en destacados');
    }

    await this.featuredRepo.remove(featured);
  }

  async clearAllFeatured(): Promise<void> {
    await this.featuredRepo.clear();
  }

  async getAllFeatured() {
    const prods = await this.featuredRepo.find({
      relations: ['product', 'product.rubro'],
      order: { createdAt: 'DESC' },
      select: {
        product: {
          idArticulo: true,
          idRubro: true,
          rubro: { descripcion: true },
          descripcion: true,
          precioVenta: true,
          imagen: true,
          fechaAlta: true,
          alicuotaIVA: true,
          detalle1: true,
          costoNeto: true,
        },
      },
    });
    const featured = prods.map((item) => item.product);
    return plainToInstance(CatalogResponseDto, featured);
  }
}
