import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  controllers: [],
  providers: [FilesService],
  imports: [CloudinaryModule],
  exports: [FilesService],
})
export class FilesModule {}
