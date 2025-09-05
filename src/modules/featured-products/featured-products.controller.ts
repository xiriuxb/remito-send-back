import { Controller, Post, Delete, Param, Get, Body } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { FeaturedProductService } from './featured-prducts.service';

@ApiTags('Featured Products')
@Controller('featured-products')
export class FeaturedProductController {
  constructor(
    private readonly featuredProductService: FeaturedProductService,
  ) {}

  @Post()
  @ApiBody({ schema: { properties: { productId: { type: 'string' } } } })
  async addFeatured(@Body('productId') productId: string) {
    return this.featuredProductService.addFeatured(productId);
  }

  @Delete(':productId')
  @ApiParam({ name: 'productId', type: 'string' })
  async removeFeatured(@Param('productId') productId: string) {
    await this.featuredProductService.removeFeatured(productId);
    return { message: 'Producto eliminado de destacados' };
  }

  @Delete()
  async clearAll() {
    await this.featuredProductService.clearAllFeatured();
    return { message: 'Todos los productos destacados eliminados' };
  }

  @Get()
  async getAll() {
    return this.featuredProductService.getAllFeatured();
  }

  @Get('count')
  async count() {
    const count = await this.featuredProductService.countFeatured();
    return { count };
  }
}
