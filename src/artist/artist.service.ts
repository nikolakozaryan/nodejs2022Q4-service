import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { Artist } from './artist.entity';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    private trackService: TrackService,
  ) {}

  async findAll(): Promise<Artist[]> {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    return artist;
  }

  async createArtist(data: CreateArtistDTO): Promise<Artist> {
    const { name, grammy } = data;
    const artist = await this.artistRepository.save(new Artist(name, grammy));
    return artist;
  }

  async updateArtist(id: string, data: UpdateArtistDTO): Promise<Artist> {
    const { name, grammy } = data;
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) return null;

    artist.name = name ?? artist.name;
    artist.grammy = grammy ?? artist.grammy;

    const updated = await this.artistRepository.save(artist);
    return updated;
  }

  async deleteArtist(id: string): Promise<Artist | null> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) return null;

    await this.trackService.deleteArtistInTrack(id);
    await this.artistRepository.remove(artist);
    return artist;
  }
}
