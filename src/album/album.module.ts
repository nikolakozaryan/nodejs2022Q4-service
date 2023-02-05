import { Module } from '@nestjs/common';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumStorage } from './store/album.store';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStorage],
  imports: [TrackModule, ArtistModule],
  exports: [AlbumService],
})
export class AlbumModule {}
