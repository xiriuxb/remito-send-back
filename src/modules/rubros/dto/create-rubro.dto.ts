import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRubroDto {
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  descripcion: string;
}
