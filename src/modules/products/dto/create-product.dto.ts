export class CreateProductDto {
  idRubro: number;
  descripcion: string;
  codigoAux?: string;
  tipoArticulo?: number;
  unidadMedida: string;
  manejaStock: string;
  stockActual: number;
  precioVenta: number;
  alicuotaIVA: number;
  costoNeto: number;
  imagen?: string;
  detalle1?: string;
  fechaAlta: Date;
}
