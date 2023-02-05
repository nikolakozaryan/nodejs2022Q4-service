import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  artistId: string | null;

  @IsOptional()
  albumId: string | null;
}
