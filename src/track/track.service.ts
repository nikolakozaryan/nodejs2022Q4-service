import { Injectable } from '@nestjs/common';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-artist.dto';
import { ITrack } from './interfaces/track.interface';
import { TrackStorage } from './store/track.store';

@Injectable()
export class TrackService {
  constructor(private storage: TrackStorage) {}

  async findAll(): Promise<ITrack[]> {
    const tracks = await this.storage.findAll();
    return tracks;
  }

  async findOne(id: string): Promise<ITrack | null> {
    const track = await this.storage.findById(id);
    if (!track) return null;
    return track;
  }

  async createTrack(data: CreateTrackDTO): Promise<ITrack> {
    const created = await this.storage.create(data);
    return created;
  }

  async updateTrack(id: string, data: UpdateTrackDTO): Promise<ITrack> {
    const updated = await this.storage.update(id, data);
    return updated;
  }

  async deleteTrack(id: string): Promise<ITrack | null> {
    const track = await this.findOne(id);
    if (!track) return null;

    await this.storage.delete(id);
    return track;
  }
}
