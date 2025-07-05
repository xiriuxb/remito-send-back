export interface IFileStorageService {
  upload(file: Express.Multer.File, fileName: string): Promise<string>;
  delete(url: string): Promise<void>;
}
