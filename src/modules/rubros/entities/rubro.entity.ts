import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rubros')
export class Rubro {
  @PrimaryGeneratedColumn({ name: 'IDRUBRO' })
  id: number;

  @Column({ name: 'DESCRUBRO', length: 30, unique: true })
  descripcion: string;

  @Column('decimal', {
    name: 'TASAGAN',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  tasaGanancia?: number;

  @Column('decimal', {
    name: 'TASARVTA',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  tasaRevista?: number;

  @Column('decimal', {
    name: 'TASAPCIO1',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  tasaPrecio1?: number;

  @Column('decimal', {
    name: 'TASAPCIO2',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  tasaPrecio2?: number;

  @Column('decimal', {
    name: 'TASAPCIO3',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  tasaPrecio3?: number;

  @Column('decimal', {
    name: 'TASAFLET',
    precision: 7,
    scale: 2,
    nullable: true,
  })
  tasaFlete?: number;
}
