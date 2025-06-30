import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { Rubro } from './entities/rubro.entity';

@Injectable()
export class RubrosService {
  constructor(
    @InjectRepository(Rubro)
    private readonly rubroRepository: Repository<Rubro>,
  ) {}

  create(createRubroDto: CreateRubroDto) {
    const existingRubro = this.findByName(createRubroDto.descripcion);
    if (existingRubro) throw new ConflictException('Descripción ya en uso');
    return this.rubroRepository.save({ ...createRubroDto });
  }

  findAll() {
    return this.rubroRepository.find();
  }

  findByName(descripcion: string) {
    return this.rubroRepository.find({
      where: {
        descripcion: Raw((alias) => `${alias} ILIKE :busqueda`, {
          busqueda: `${descripcion}`,
        }),
      },
    });
  }

  update(id: number, updateRubroDto: UpdateRubroDto) {
    const existingRubro = this.findByName(updateRubroDto.descripcion);
    if (existingRubro) throw new ConflictException('Descripción ya en uso');
    return this.rubroRepository.update({ id }, { ...updateRubroDto });
  }

  remove(id: number) {
    return `This action removes a #${id} rubro`;
  }
}
