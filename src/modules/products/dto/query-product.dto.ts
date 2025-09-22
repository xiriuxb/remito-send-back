import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class QueryCatalogProductDto {
  @ApiProperty({ required: false, maxLength: 60, minLength: 2 })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(60)
  description?: string;
  @ApiProperty({ required: false, maximum: 99, minimum: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(99)
  rubro?: number;
  @ApiProperty({ required: false, maxLength: 12, minLength: 2 })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(12)
  idArticulo?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(15)
  cursor?: string;
  @ApiProperty({ required: false, maximum: 100, minimum: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(100)
  limit?: number = 20;
}

export class QueryProductDto {
  @ApiProperty({ required: false, maxLength: 60, minLength: 2 })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(60)
  description?: string;
  @ApiProperty({ required: false, maxLength: 12, minLength: 2 })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(12)
  idArticulo?: string;
  @ApiProperty({ required: false, maximum: 99, minimum: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(99)
  rubro?: number;
  @ApiProperty({ required: false, minimum: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  page?: number;
  @ApiProperty({ required: false, maximum: 100, minimum: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(100)
  take?: number = 20;
}
