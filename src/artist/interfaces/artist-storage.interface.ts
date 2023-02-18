import { CreateArtistDTO } from '../dto/create-artist.dto';
import { UpdateArtistDTO } from '../dto/update-artist.dto';
import { IArtist } from './artist.interface';

export interface IArtistStorage {
  findById: (id: string) => IArtist | null;
  findAll: () => IArtist[];
  create: (data: CreateArtistDTO) => IArtist;
  update: (id: string, data: UpdateArtistDTO) => IArtist;
  delete: (id: string) => void;
}
