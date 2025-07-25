import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

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

export class ReturnPedidoProductDto {
  @ApiProperty()
  idArticulo: string;
  @ApiProperty()
  cantidad: number;
  @ApiProperty()
  observation?: string;
  @ApiProperty()
  @Expose()
  @Transform(
    ({ obj }: { obj: ReturnPedidoProductDto }) => obj.articulo.descripcion,
  )
  descripcion: string;
  @Exclude()
  articulo: {
    descripcion: string;
  };
}

export class ReturnOneAppPedidoDto {
  @ApiProperty()
  idPedido: string;
  @ApiProperty()
  clientName: string;
  @ApiProperty()
  fechaPedido: string;
  @ApiProperty()
  observation?: string;
  @ApiProperty()
  seen: boolean;
  @Exclude()
  status: string;
  @ApiProperty({ type: [ReturnPedidoProductDto] })
  @Type(() => ReturnPedidoProductDto)
  productos: ReturnPedidoProductDto[];
}
