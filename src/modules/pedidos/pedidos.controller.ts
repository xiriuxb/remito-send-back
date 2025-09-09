import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreateManyDto, CreatePedidoDto } from './dto/create-pedido.dto';
import {
  UpdatePedidoDto,
  UpdateSeenPedidoDto,
  UpdateStatusPedidoDto,
} from './dto/update-pedido.dto';
import { QueryPedidoDto } from './dto/get-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Post('/many')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  createMany(@Body() dto: CreateManyDto) {
    return this.pedidosService.createMany(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() dto: QueryPedidoDto) {
    return this.pedidosService.findAllList(dto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Patch(':id/seen')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateSeen(@Param('id') id: string, @Body() dto: UpdateSeenPedidoDto) {
    return this.pedidosService.updateSeen(+id, dto);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusPedidoDto) {
    return this.pedidosService.updateStatus(+id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
