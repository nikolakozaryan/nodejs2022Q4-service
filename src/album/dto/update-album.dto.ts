import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDTO {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  year: number;
  @IsOptional()
  artistId: string | null;
}
