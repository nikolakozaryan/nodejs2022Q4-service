import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  year: number;

  artistId: string | null;
}
