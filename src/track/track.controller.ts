import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-artist.dto';
import { ITrack } from './interfaces/track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAll(): Promise<ITrack[]> {
    const result = await this.trackService.findAll();
    return result;
  }

  @Get(':id')
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<ITrack> {
    const result = await this.trackService.findOne(id);
    if (!result)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    return result;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDTO: CreateTrackDTO): Promise<ITrack> {
    const created = await this.trackService.createTrack(createUserDTO);
    return created;
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ) {
    const track = await this.trackService.findOne(id);
    if (!track)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);

    const updated = await this.trackService.updateTrack(id, updateTrackDTO);
    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    const deletedTrack = await this.trackService.deleteTrack(id);

    if (!deletedTrack)
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }
}
