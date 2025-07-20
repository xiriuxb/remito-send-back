import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePedidoDto, ProductPedido } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly _pedidoRepository: Repository<Pedido>,
    private readonly _prodService: ProductsService,
  ) {}

  async create(dto: CreatePedidoDto) {
    console.log(dto);
    this.throwIfDuplicates(dto.products);
    await this.validateProducts(dto.products);

    await this._pedidoRepository.save({
      clientName: dto.clientName,
      fechaPedido: dto.fechaAlta,
      productos: dto.products,
      estado: 'PENDIENTE',
      observation: dto.observation,
    });

    return { ok: true };
  }

  private throwIfDuplicates(products: ProductPedido[]) {
    const prodsSet = new Set(products);

    if (prodsSet.size !== products.length) {
      throw new ConflictException('Hay productos duplicados');
    }
    return;
  }

  private async validateProducts(products: ProductPedido[]) {
    const exists = await this._prodService.validateIdsExist(
      products.map((p) => p.idArticulo),
    );
    if (exists && exists.length !== products.length)
      throw new ConflictException('Hay productos que no existen');

    return;
  }

  findAll() {
    return `This action returns all pedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
