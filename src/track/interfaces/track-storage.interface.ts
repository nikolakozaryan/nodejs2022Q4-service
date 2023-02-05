import { CreateTrackDTO } from '../dto/create-track.dto';
import { UpdateTrackDTO } from '../dto/update-track.dto';
import { ITrack } from './track.interface';

export interface ITrackStorage {
  findById: (id: string) => ITrack | null;
  findAll: () => ITrack[];
  create: (data: CreateTrackDTO) => ITrack;
  update: (id: string, data: UpdateTrackDTO) => ITrack;
  delete: (id: string) => void;
}
