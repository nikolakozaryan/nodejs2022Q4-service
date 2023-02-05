import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistStorage } from './store/artist.store';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
  exports: [ArtistService],
  imports: [TrackModule],
})
export class ArtistModule {}
