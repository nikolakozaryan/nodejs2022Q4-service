import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistStorage } from './store/artist.store';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistStorage],
  exports: [ArtistService],
})
export class ArtistModule {}
