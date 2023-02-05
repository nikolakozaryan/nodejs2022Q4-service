import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumStorage } from './store/album.store';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumStorage],
})
export class AlbumModule {}
