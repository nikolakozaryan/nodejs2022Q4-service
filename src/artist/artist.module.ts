import { Module } from '@nestjs/common';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [AlbumController, ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
