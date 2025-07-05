import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IFileStorageService } from 'src/lib/interfaces/i-file-storage-service';
import { STORAGE_PROVIDER } from '../cloudinary/constants';

@Injectable()
export class FilesService {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageService: IFileStorageService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    fileName?: string,
  ): Promise<string> {
    const name = fileName ? fileName : `${Date.now()}-${file.originalname}`;
    return this.storageService.upload(file, name);
  }

  validateImage(file: Express.Multer.File) {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const minSize = 1024; // 1KB mínimo

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de archivo no permitido. Solo se permiten imágenes JPEG o PNG.',
      );
    }
    if (file.size > maxSize) {
      throw new BadRequestException(
        'La imagen excede el tamaño máximo permitido de 5MB.',
      );
    }
    if (file.size < minSize) {
      throw new BadRequestException(
        'La imagen es demasiado pequeña. El tamaño mínimo permitido es 1KB.',
      );
    }
  }

  async deleteImage(url: string) {
    return await this.storageService.delete(url);
  }
}
