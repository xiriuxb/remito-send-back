import { Exclude } from 'class-transformer';
import { CatalogResponseDto } from 'src/modules/products/dto/catalog-response.dto';

export class FeaturedProductItem {
  @Exclude()
  id: string;
  @Exclude()
  createdAt: string;
  product: CatalogResponseDto;
}
