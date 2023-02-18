import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDTO } from '../dto/create-artist.dto';
import { UpdateArtistDTO } from '../dto/update-artist.dto';
import { IArtistStorage } from '../interfaces/artist-storage.interface';
import { IArtist } from '../interfaces/artist.interface';

@Injectable()
export class ArtistStorage implements IArtistStorage {
  private artists: IArtist[];
  constructor() {
    this.artists = [];
  }

  findAll() {
    return this.artists;
  }

  findById(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist || null;
  }

  create(data: CreateArtistDTO) {
    const id = uuidv4();
    const newArtist: IArtist = {
      id,
      ...data,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, data: UpdateArtistDTO) {
    const artist = this.artists.find((artist) => artist.id === id);

    const updatedArtist: IArtist = {
      ...artist,
      ...data,
    };

    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );

    return updatedArtist;
  }

  delete(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
