import { IsNumber, IsString } from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  artistId: string | null;
  albumId: string | null;
}
