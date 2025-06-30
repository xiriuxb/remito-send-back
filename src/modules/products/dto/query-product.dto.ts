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
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(60)
  description?: string;
  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(99)
  rubro?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(15)
  cursor?: string;
  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(100)
  limit?: number = 20;
}

export class QueryProductDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(60)
  description?: string;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(99)
  rubro?: number;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  page?: number;
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(100)
  take?: number = 20;
}
