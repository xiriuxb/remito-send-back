import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturedProduct } from './entities/featured-products.entity';
import { FeaturedProductService } from './featured-prducts.service';
import { FeaturedProductController } from './featured-products.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([FeaturedProduct]), ProductsModule],
  controllers: [FeaturedProductController],
  providers: [FeaturedProductService],
  exports: [FeaturedProductService],
})
export class FeaturedProductsModule {}
