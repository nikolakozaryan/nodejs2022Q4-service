import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { IArtist } from './interfaces/artist.interface';
import { ArtistStorage } from './store/artist.store';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    private storage: ArtistStorage,
    private trackService: TrackService,
  ) {}

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

    await this.trackService.deleteArtistInTrack(id);

    await this.storage.delete(id);
    return artist;
  }
}
