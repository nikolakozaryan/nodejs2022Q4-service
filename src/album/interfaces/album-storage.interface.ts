import { CreateAlbumDTO } from '../dto/create-album.dto';
import { UpdateAlbumDTO } from '../dto/update-album.dto';
import { IAlbum } from './album.interface';

export interface IAlbumStorage {
  findById: (id: string) => IAlbum | null;
  findAll: () => IAlbum[];
  create: (data: CreateAlbumDTO) => IAlbum;
  update: (id: string, data: UpdateAlbumDTO) => IAlbum;
  delete: (id: string) => void;
}
