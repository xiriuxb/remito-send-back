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
  @IsNumber({}, { message: 'El ID de rubro debe ser un número.' })
  @IsInt({ message: 'El ID de rubro debe ser un número entero.' })
  @IsPositive({ message: 'El ID de rubro debe ser un número positivo.' })
  @Max(99, { message: 'El ID de rubro no puede ser mayor a 99.' })
  idRubro: number;

  @ApiProperty()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MaxLength(60, {
    message: 'La descripción no puede tener más de 60 caracteres.',
  })
  @MinLength(2, {
    message: 'La descripción debe tener al menos 2 caracteres.',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  descripcion: string;

  @ApiProperty()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber({}, { message: 'El precio de venta debe ser un número.' })
  @IsPositive({ message: 'El precio de venta debe ser un número positivo.' })
  @Max(999999999999.99, {
    message: 'El precio de venta no puede ser mayor a 999999999999.99.',
  })
  precioVenta: number;

  @ApiProperty()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber({}, { message: 'La alícuota de IVA debe ser un número.' })
  @IsPositive({
    message: 'La alícuota de IVA debe ser un número positivo.',
  })
  @Max(100, { message: 'La alícuota de IVA no puede ser mayor a 100.' })
  alicuotaIVA: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return typeof value === 'string' ? parseFloat(value) : value;
  })
  @IsNumber({}, { message: 'El costo neto debe ser un número.' })
  @IsPositive({ message: 'El costo neto debe ser un número positivo.' })
  @Max(999999999999.99, {
    message: 'El costo neto no puede ser mayor a 999999999999.99.',
  })
  costoNeto?: number;

  @IsOptional()
  @ApiPropertyOptional({ type: 'string', format: 'binary', required: false })
  imagen?: string;

  @IsOptional()
  @IsString({ message: 'El detalle 1 debe ser una cadena de texto.' })
  @MaxLength(80, {
    message: 'El detalle 1 no puede tener más de 80 caracteres.',
  })
  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  detalle1?: string;
}
