import { Injectable } from '@nestjs/common';
import { CreateTrackDTO } from '../dto/create-track.dto';
import { ITrackStorage } from '../interfaces/track-storage.interface';
import { ITrack } from '../interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackStorage implements ITrackStorage {
  private tracks: ITrack[];
  constructor() {
    this.tracks = [];
  }

  findAll() {
    return this.tracks;
  }

  findById(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    return track || null;
  }

  create(data: CreateTrackDTO) {
    const id = uuidv4();
    const newTrack: ITrack = {
      id,
      ...data,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, data: CreateTrackDTO) {
    const track = this.tracks.find((track) => track.id === id);

    const updatedTrack: ITrack = {
      ...track,
      ...data,
    };

    this.tracks = this.tracks.map((user) =>
      user.id === id ? updatedTrack : user,
    );

    return updatedTrack;
  }

  delete(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
