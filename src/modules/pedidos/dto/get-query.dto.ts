import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class QueryPedidoDto {
  @ApiProperty({ required: false })
  @IsString()
  @MinLength(2)
  @IsOptional()
  @MaxLength(60)
  client?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  seen?: boolean;
  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  page?: number;
  @ApiProperty({ required: false })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @Max(100)
  take?: number = 20;
}
