import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { FavsStorage } from './store/favs.store';

@Module({
  controllers: [FavsController],
  providers: [FavsService, FavsStorage],
  imports: [AlbumModule, ArtistModule, TrackModule],
})
export class FavsModule {}
