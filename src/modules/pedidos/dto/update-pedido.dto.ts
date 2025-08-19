import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}

export class UpdateSeenPedidoDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  seen: boolean;
}

export class UpdateStatusPedidoDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @IsIn(['PENDIENTE', 'SUBIDO'])
  status: string;
}
