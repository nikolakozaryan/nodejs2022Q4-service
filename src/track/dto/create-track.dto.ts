import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  duration: number;

  artistId: string | null;
  albumId: string | null;
}
