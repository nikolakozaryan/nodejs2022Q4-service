import { Injectable } from '@nestjs/common';
import { UpdateArtistDTO } from 'src/track/dto/update-artist.dto';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { IArtist } from './interfaces/artist.interface';
import { ArtistStorage } from './store/artist.store';

@Injectable()
export class ArtistService {
  constructor(private storage: ArtistStorage) {}

  async findAll(): Promise<IArtist[]> {
    const artists = await this.storage.findAll();
    return artists;
  }

  async findOne(id: string): Promise<IArtist | null> {
    const artist = await this.storage.findById(id);
    if (!artist) return null;
    return artist;
  }

  async createArtist(data: CreateArtistDTO): Promise<IArtist> {
    const created = await this.storage.create(data);
    return created;
  }

  async updateArtist(id: string, data: UpdateArtistDTO): Promise<IArtist> {
    const updated = await this.storage.update(id, data);
    return updated;
  }

  async deleteArtist(id: string): Promise<IArtist | null> {
    const artist = await this.findOne(id);
    if (!artist) return null;

    await this.storage.delete(id);
    return artist;
  }
}
