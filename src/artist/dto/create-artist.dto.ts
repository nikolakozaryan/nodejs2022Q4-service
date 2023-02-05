import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDTO {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
