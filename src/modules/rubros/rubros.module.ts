import { Module } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { RubrosController } from './rubros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubro } from './entities/rubro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rubro])],
  controllers: [RubrosController],
  providers: [RubrosService],
})
export class RubrosModule {}
