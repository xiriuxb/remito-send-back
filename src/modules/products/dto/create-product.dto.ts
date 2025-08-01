import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseInt(value, 10) : value;
  })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Max(99)
  idRubro: number;

  @ApiProperty()
  @IsString()
  @MaxLength(60)
  @MinLength(2)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  descripcion: string;

  @ApiProperty()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber()
  @IsPositive()
  @Max(999999999999.99)
  precioVenta: number;

  @ApiProperty()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber()
  @IsPositive()
  @Max(100)
  alicuotaIVA: number;

  @ApiProperty()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber()
  @IsPositive()
  @Max(999999999999.99)
  costoNeto: number;

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', format: 'binary', required: false })
  imagen?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  detalle1?: string;
}
