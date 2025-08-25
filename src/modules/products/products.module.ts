import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FilesModule } from '../files/files.module';
import { PedidoArticulo } from '../pedidos/entities/pedido_articulos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, PedidoArticulo]), FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
