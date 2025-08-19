import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class ProductPedido {
  @ApiProperty({ maxLength: 15, minLength: 1 })
  @MinLength(1)
  @MaxLength(15)
  idArticulo: string;

  @ApiProperty({ maximum: 9999, minimum: 1 })
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Max(9999)
  cantidad: number;

  @ApiProperty({ maxLength: 512, minLength: 1 })
  @IsOptional()
  @MinLength(1)
  @MaxLength(512)
  @Transform(({ value }) => value?.trim())
  observation?: string;

  @ApiProperty({ maximum: 9999999999.99, minimum: 0 })
  @IsNumber()
  @IsPositive()
  @Max(9999999999.99)
  precio: number = 0;
}

export class CreatePedidoDto {
  @ApiProperty({ required: true, maxLength: 128, minLength: 1 })
  @MinLength(1)
  @MaxLength(128)
  clientName: string;

  @ApiProperty({ required: true, maxLength: 128, minLength: 1 })
  @IsOptional()
  @MinLength(1)
  @MaxLength(128)
  @Transform(({ value }) => value?.trim())
  observation?: string;

  @ApiProperty({ type: [ProductPedido] })
  @ValidateNested({ each: true })
  @Type(() => ProductPedido)
  products: ProductPedido[];

  @ApiProperty({ example: new Date() })
  @IsISO8601()
  fechaAlta: string;

  @ApiProperty({ required: false, maxLength: 36, minLength: 1 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  @Transform(({ value }) => value?.trim())
  frontId: string;
}

export class CreateManyDto {
  @ApiProperty({ type: [CreatePedidoDto] })
  @ValidateNested({ each: true })
  @Type(() => CreatePedidoDto)
  pedidos: CreatePedidoDto[];
}
