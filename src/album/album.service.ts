import { Injectable } from '@nestjs/common';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { UpdateAlbumDTO } from './dto/update-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { AlbumStorage } from './store/album.store';

@Injectable()
export class AlbumService {
  constructor(private storage: AlbumStorage) {}

  async findAll(): Promise<IAlbum[]> {
    const albums = await this.storage.findAll();
    return albums;
  }

  async findOne(id: string): Promise<IAlbum | null> {
    const album = await this.storage.findById(id);
    if (!album) return null;
    return album;
  }

  async createUser(data: CreateAlbumDTO): Promise<IAlbum> {
    const created = await this.storage.create(data);
    return created;
  }

  async updateUser(id: string, data: UpdateAlbumDTO): Promise<IAlbum> {
    const updated = await this.storage.update(id, data);
    return updated;
  }

  async deleteUser(id: string): Promise<IAlbum | null> {
    const album = await this.findOne(id);
    if (!album) return null;

    await this.storage.delete(id);
    return album;
  }
}
