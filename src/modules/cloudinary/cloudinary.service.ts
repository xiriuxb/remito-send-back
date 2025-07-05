import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { IFileStorageService } from 'src/lib/interfaces/i-file-storage-service';

@Injectable()
export class CloudinaryService implements IFileStorageService {
  constructor(private readonly _configService: ConfigService) {}

  private readonly CHUNK_SIZE = 6 * 1000 * 1000;
  private readonly TIMEOUT = 2 * 60 * 1000;

  async upload(file: Express.Multer.File, fileName: string): Promise<string> {
    const folder = this._configService.get('STORAGE_FOLDER_NAME');

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          chunk_size: this.CHUNK_SIZE,
          allowed_formats: ['jpg', 'png'],
          unique_filename: false,
          filename_override: fileName,
          timeout: this.TIMEOUT,
          use_filename: true,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        },
      );

      const bufferStream = Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    });
  }

  async delete(url: string): Promise<void> {
    const publicId = this.extractPublicIdFromUrl(url);
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(error);
        } else if (result.result === 'ok') {
          resolve();
        } else {
          reject(new Error(`Failed to delete image: ${result.result}`));
        }
      });
    });
  }

  private extractPublicIdFromUrl(url: string): string {
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) {
      throw new Error('URL inválida de Cloudinary');
    }

    const pathAfterUpload = url.substring(uploadIndex + 8); // salta '/upload/'
    const parts = pathAfterUpload.split('/');

    // Elimina el versionado, ej. v1712345678
    if (parts[0].startsWith('v') && /^\d+$/.test(parts[0].substring(1))) {
      parts.shift(); // quita la versión
    }

    // Elimina la extensión del archivo final (último elemento)
    const filename = parts.pop();
    const filenameWithoutExt =
      filename?.split('.').slice(0, -1).join('.') ?? '';

    return [...parts, filenameWithoutExt].join('/');
  }
}
