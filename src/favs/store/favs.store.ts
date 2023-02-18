import { Injectable } from '@nestjs/common';
import { EntityType } from '../interfaces/entityType';
import { IFavsStorage } from '../interfaces/favs-storage.interface';

@Injectable()
export class FavsStorage implements IFavsStorage {
  private favTracks: string[];
  private favAlbums: string[];
  private favArtists: string[];
  constructor() {
    this.favTracks = [];
    this.favAlbums = [];
    this.favArtists = [];
  }

  findAll() {
    return {
      artists: this.favArtists,
      tracks: this.favTracks,
      albums: this.favAlbums,
    };
  }

  add(type: EntityType, entityId: string) {
    switch (type) {
      case 'album':
        this.favAlbums.push(entityId);
        return entityId;
      case 'artist':
        this.favArtists.push(entityId);
        return entityId;
      case 'track':
        this.favTracks.push(entityId);
        return entityId;
      default:
        return null;
    }
  }

  delete(type: EntityType, entityId: string) {
    switch (type) {
      case 'album':
        this.favAlbums = this.favAlbums.filter(
          (albumId) => albumId !== entityId,
        );
        return entityId;
      case 'artist':
        this.favArtists = this.favArtists.filter(
          (artistId) => artistId !== entityId,
        );
        return entityId;
      case 'track':
        this.favTracks = this.favTracks.filter(
          (trackId) => trackId !== entityId,
        );
        return entityId;
    }
  }
}
