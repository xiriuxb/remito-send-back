import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsBoolean } from 'class-validator';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}

export class UpdateSeenPedidoDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  seen: boolean;
}
