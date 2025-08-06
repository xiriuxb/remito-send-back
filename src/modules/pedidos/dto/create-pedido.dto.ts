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
  @ApiProperty()
  @MinLength(1)
  @MaxLength(15)
  idArticulo: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Max(9999)
  cantidad: number;

  @ApiProperty()
  @IsOptional()
  @MinLength(1)
  @MaxLength(512)
  @Transform(({ value }) => value?.trim())
  observation?: string;
}

export class CreatePedidoDto {
  @ApiProperty({ required: true })
  @MinLength(1)
  @MaxLength(128)
  clientName: string;

  @ApiProperty()
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

  @ApiProperty({ required: false })
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
