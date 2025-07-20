import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PedidoArticulo } from './pedido_articulos.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn({ name: 'IDPEDIDO', type: 'int' })
  idPedido: number;

  @Column('varchar', { name: 'CLIENTNAME', nullable: false, length: 128 })
  clientName: string;

  @Column('timestamptz', { name: 'FEPEDIDO', nullable: true })
  fechaPedido: Date;

  @Column('timestamptz', { name: 'FEENTREGA', nullable: true })
  fechaEntrega?: Date;

  @Column('varchar', { name: 'OBSERVAC', nullable: true })
  observation?: string;

  @Column('varchar', { name: 'ESTADO', nullable: true, length: 32 })
  estado: string;

  @Column('bool', { name: 'SEEN', nullable: false, default: false })
  seen: boolean;

  @OneToMany(() => PedidoArticulo, (pedidoProducto) => pedidoProducto.pedido, {
    cascade: true,
  })
  productos: PedidoArticulo[];
}
