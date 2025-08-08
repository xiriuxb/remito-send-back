import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('pedido_articulos')
export class PedidoArticulo {
  @PrimaryColumn('int', { name: 'IDPEDIDO' })
  idPedido: number;

  @PrimaryColumn('varchar', { name: 'IDARTICULO', length: 15 })
  idArticulo: string;

  @Column('int', { name: 'CANTIDAD', nullable: true })
  cantidad: number;

  @Column('decimal', {
    name: 'PRECIO',
    precision: 12,
    scale: 2,
    nullable: true,
    default: 0,
  })
  precio: number;

  @Column('decimal', {
    name: 'IMPORTE',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  importe?: number;

  @Column('varchar', { name: 'OBSERVAC', nullable: true, length: 512 })
  observation?: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.productos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'IDPEDIDO', referencedColumnName: 'idPedido' })
  pedido: Pedido;

  @ManyToOne(() => Product, (producto) => producto.pedidosArticulo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'IDARTICULO', referencedColumnName: 'idArticulo' })
  articulo: Product;
}
