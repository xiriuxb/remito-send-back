import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { CreateRubroDto } from './dto/create-rubro.dto';
import { UpdateRubroDto } from './dto/update-rubro.dto';
import { Rubro } from './entities/rubro.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseRubroDto } from './dto/response-rubro.dto';

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
    const rubros = this.rubroRepository.find();
    return plainToInstance(ResponseRubroDto, rubros, {
      excludeExtraneousValues: true,
    });
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
