import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoArticulo } from './entities/pedido_articulos.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoArticulo]), ProductsModule],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
