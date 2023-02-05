import { Module } from '@nestjs/common';
import { TrackStorage } from './store/track.store';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackStorage],
})
export class TrackModule {}
