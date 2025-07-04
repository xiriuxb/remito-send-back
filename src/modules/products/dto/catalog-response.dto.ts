import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CatalogResponseDto {
  @ApiProperty()
  idArticulo: string;
  @ApiProperty()
  idRubro: number;
  @ApiProperty({ type: String })
  @Transform(({ obj }: { obj: any }) => obj.rubro.descripcion)
  rubro: { id: true; descripcion: true };
  @ApiProperty()
  descripcion: string;
  @ApiProperty()
  precioVenta: number;
  @ApiProperty()
  imagen: string | null;
}

export class CursorPaginationDto {
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  nextCursor: string;
  @ApiProperty()
  limit: number;
}

export class NormalPaginationDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  take: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  hasPreviousPage: boolean;
}

export class PaginatedProductsCursorResponseDto {
  @ApiProperty({ type: [CatalogResponseDto] })
  items: CatalogResponseDto[];
  @ApiProperty({ type: CursorPaginationDto })
  pagination: CursorPaginationDto;
}

export class PaginatedProductsNormalResponseDto {
  @ApiProperty({ type: [CatalogResponseDto] })
  items: CatalogResponseDto[];
  @ApiProperty({ type: NormalPaginationDto })
  pagination: NormalPaginationDto;
}
