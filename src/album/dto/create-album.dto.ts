import { IsString, IsNumber } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  artistId: string | null;
}
