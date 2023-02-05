import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDTO } from '../dto/create-album.dto';
import { UpdateAlbumDTO } from '../dto/update-album.dto';
import { IAlbumStorage } from '../interfaces/album-storage.interface';
import { IAlbum } from '../interfaces/album.interface';

@Injectable()
export class AlbumStorage implements IAlbumStorage {
  private albums: IAlbum[];
  constructor() {
    this.albums = [];
  }

  findAll() {
    return this.albums;
  }

  findById(id: string) {
    const album = this.albums.find((user) => user.id === id);

    return album || null;
  }

  create(data: CreateAlbumDTO) {
    const id = uuidv4();
    const newAlbum: IAlbum = {
      id,
      ...data,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, data: UpdateAlbumDTO) {
    const album = this.albums.find((album) => album.id === id);

    const updatedAlbum: IAlbum = {
      ...album,
      ...data,
    };

    this.albums = this.albums.map((user) =>
      user.id === id ? updatedAlbum : user,
    );

    return updatedAlbum;
  }

  delete(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
