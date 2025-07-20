import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnPedidoListDto {
  @ApiProperty()
  @Expose()
  clientName: string;
  @ApiProperty()
  @Expose()
  fechaPedido: string;
  @Expose()
  status: string;
  @Expose()
  seen: boolean;
  @Expose()
  idPedido: number;
}
