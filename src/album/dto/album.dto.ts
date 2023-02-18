import { IArtist } from 'src/artist/interfaces/artist.interface';

export class AlbumDTO {
  id: string;
  name: string;
  year: number;
  artist: IArtist | null;
}
