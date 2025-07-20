import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, FindOptionsWhere } from 'typeorm';
import { CreatePedidoDto, ProductPedido } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ProductsService } from '../products/products.service';
import { Pedido } from './entities/pedido.entity';
import { QueryPedidoDto } from './dto/get-query.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly _pedidoRepository: Repository<Pedido>,
    private readonly _prodService: ProductsService,
  ) {}

  private whereBuilder(queryDto: QueryPedidoDto): FindOptionsWhere<Pedido> {
    const whereConditions: FindOptionsWhere<Pedido> = {
      clientName: queryDto.client ? ILike(`%${queryDto.client}%`) : undefined,
      seen: typeof queryDto.seen == 'boolean' ? queryDto.seen : undefined,
    };

    return whereConditions;
  }

  async create(dto: CreatePedidoDto) {
    this.throwIfDuplicates(dto.products);
    await this.validateProducts(dto.products);

    await this._pedidoRepository.save({
      clientName: dto.clientName,
      fechaPedido: dto.fechaAlta,
      productos: dto.products,
      status: 'PENDIENTE',
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

  async findAllList(queryDto: QueryPedidoDto) {
    const take = queryDto.take || 50;
    const page = queryDto.page || 1;
    const skip = (page - 1) * take;
    const whereConditions = this.whereBuilder(queryDto);

    const [pedidos, total] = await this._pedidoRepository.findAndCount({
      order: { fechaPedido: 'DESC' },
      where: whereConditions,
      select: {
        idPedido: true,
        clientName: true,
        fechaPedido: true,
        seen: true,
        status: true,
      },
      skip,
      take,
    });

    const totalPages = Math.ceil(total / take);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      items: pedidos,
      pagination: {
        page,
        take,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    console.log(updatePedidoDto);
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
