import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { UpdateAlbumDTO } from './dto/update-album.dto';
import { IAlbum } from './interfaces/album.interface';
import { AlbumStorage } from './store/album.store';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    private storage: AlbumStorage,
    private trackService: TrackService,
  ) {}

  async findAll(): Promise<IAlbum[]> {
    const albums = await this.storage.findAll();
    return albums;
  }

  async findOne(id: string): Promise<IAlbum | null> {
    const album = await this.storage.findById(id);
    if (!album) return null;
    return album;
  }

  async createAlbum(data: CreateAlbumDTO): Promise<IAlbum> {
    const createdAlbum = await this.storage.create(data);
    return createdAlbum;
  }

  async updateAlbum(id: string, data: UpdateAlbumDTO): Promise<IAlbum> {
    const updatedAlbum = await this.storage.update(id, data);
    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<IAlbum | null> {
    const album = await this.storage.findById(id);
    if (!album) return null;

    await this.trackService.deleteAlbumInTrack(id);

    await this.storage.delete(id);
    return album;
  }

  async deleteArtistInAlbum(artistId: string): Promise<void> {
    const albums = await this.storage.findAll();
    const albumsWithArtist = albums.filter(
      (album) => album.artistId === artistId,
    );

    await Promise.all(
      albumsWithArtist.map((album) =>
        this.updateAlbum(album.id, { ...album, artistId: null }),
      ),
    );
  }
}
