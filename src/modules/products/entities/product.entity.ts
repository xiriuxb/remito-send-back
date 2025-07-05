import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rubro } from '../../rubros/entities/rubro.entity';

@Entity('articulos')
export class Product {
  @PrimaryColumn({ name: 'IDARTICULO', length: 15 })
  idArticulo: string;

  @Column('int', { name: 'IDRUBRO' })
  idRubro: number;

  @ManyToOne(() => Rubro)
  @JoinColumn({ name: 'IDRUBRO' })
  rubro: Rubro;

  @Column('int', { name: 'IDSUBRU', nullable: true })
  idSubrubro: number;

  @Column('int', { name: 'IDMARCA', nullable: true })
  idMarca: number;

  @Column({ name: 'DESCARTI', length: 60 })
  descripcion: string;

  @Column({ name: 'CODIGOAUX', length: 40, nullable: true })
  codigoAux: string;

  @Column('int', { name: 'IDPROV', nullable: true })
  idProveedor: number;

  @Column('int', { name: 'TIPOARTI', nullable: true })
  tipoArticulo: number;

  @Column({ name: 'UBICAC', length: 15, nullable: true })
  ubicacion: string;

  @Column('int', { name: 'NUMERO', nullable: true })
  numero: number;

  @Column({ name: 'UMEDIDA', length: 4, default: 'UNID' })
  unidadMedida: string;

  @Column({ name: 'STOCKSINO', length: 1, type: 'varchar', default: 'S' })
  manejaStock: string;

  @Column('decimal', { name: 'STOCKACT', precision: 12, scale: 4, default: 0 })
  stockActual: number;

  @Column('decimal', {
    name: 'STOCKMIN',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  stockMinimo: number;

  @Column('decimal', {
    name: 'PTOREPO',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  puntoReposicion: number;

  @Column('decimal', { name: 'PCIOVENTA', precision: 12, scale: 4 })
  precioVenta: number;

  @Column('decimal', { name: 'ALICIVA', precision: 7, scale: 4, default: 21.0 })
  alicuotaIVA: number;

  @Column('decimal', {
    name: 'ALICIINT',
    precision: 7,
    scale: 4,
    nullable: true,
  })
  alicuotaIInterno: number;

  @Column('decimal', {
    name: 'IINTIMPO',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  impuestoInterno: number;

  @Column('decimal', { name: 'COSTO', precision: 12, scale: 4, nullable: true })
  costo: number;

  @Column('decimal', { name: 'COSTONETO', precision: 12, scale: 4 })
  costoNeto: number;

  @Column({ name: 'IMAGEN', length: 512, nullable: true })
  imagen: string;

  @Column({ name: 'DETALLE1', length: 80, nullable: true })
  detalle1: string;

  @Column({ name: 'DETALLE2', length: 80, nullable: true })
  detalle2: string;

  @Column({ name: 'DETALLE3', length: 80, nullable: true })
  detalle3: string;

  @Column('decimal', {
    name: 'ITCALIC',
    precision: 7,
    scale: 4,
    nullable: true,
  })
  itcAlicuota: number;

  @Column('decimal', {
    name: 'TASAITC',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  tasaITC: number;

  @Column('decimal', {
    name: 'VIALALIC',
    precision: 7,
    scale: 4,
    nullable: true,
  })
  vialAlicuota: number;

  @Column('decimal', {
    name: 'TASAVIAL',
    precision: 12,
    scale: 4,
    nullable: true,
  })
  tasaVial: number;

  @Column('date', { name: 'FEALTA', default: () => 'CURRENT_DATE' })
  fechaAlta: Date;

  @Column('boolean', { name: 'ENLIQUIDA', nullable: true })
  enLiquidacion: boolean;
}
