import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { EntityType } from './interfaces/entityType';
import { FavsStorage } from './store/favs.store';

@Injectable()
export class FavsService {
  constructor(
    private storage: FavsStorage,
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  async findAll() {
    const favorites = await this.storage.findAll();
    const { albums, artists, tracks } = favorites;

    const detailedAlbums = (await this.albumService.findAll()).filter((album) =>
      albums.includes(album.id),
    );
    const detailedArtists = (await this.artistService.findAll()).filter(
      (artist) => artists.includes(artist.id),
    );
    const detailedTracks = (await this.trackService.findAll()).filter(
      (artist) => tracks.includes(artist.id),
    );

    return {
      albums: detailedAlbums,
      artists: detailedArtists,
      tracks: detailedTracks,
    };
  }

  async createFav(type: EntityType, entityId: string) {
    const isExist = await this.isEntityExists(type, entityId);
    if (!isExist) return null;

    const createdId = await this.storage.add(type, entityId);
    return createdId;
  }

  async deleteFav(type: EntityType, entityId: string) {
    const isFav = await this.isEntityFav(type, entityId);
    if (!isFav) return null;

    const deletedId = await this.storage.delete(type, entityId);
    return deletedId;
  }

  async isEntityFav(type: EntityType, entityId: string): Promise<boolean> {
    const favorites = await this.storage.findAll();
    let targetIds: string[];
    switch (type) {
      case 'album':
        targetIds = favorites.albums;
        break;
      case 'artist':
        targetIds = favorites.artists;
        break;
      case 'track':
        targetIds = favorites.tracks;
        break;
      default:
        targetIds = [];
    }

    return targetIds.includes(entityId);
  }

  async isEntityExists(type: EntityType, entityId: string): Promise<boolean> {
    switch (type) {
      case 'album':
        return !!(await this.albumService.findOne(entityId));
      case 'artist':
        return !!(await this.artistService.findOne(entityId));
      case 'track':
        return !!(await this.trackService.findOne(entityId));
      default:
        return false;
    }
  }
}
