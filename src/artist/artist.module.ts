import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistStorage } from './store/artist.store';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
  imports: [TrackModule, forwardRef(() => AlbumModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
