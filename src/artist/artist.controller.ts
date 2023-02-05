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
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { IArtist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAll(): Promise<IArtist[]> {
    const result = await this.artistService.findAll();
    return result;
  }

  @Get(':id')
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<IArtist> {
    const artist = await this.artistService.findOne(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createArtistDTO: CreateArtistDTO): Promise<IArtist> {
    const createdArtist = await this.artistService.createArtist(
      createArtistDTO,
    );
    return createdArtist;
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ) {
    const artist = await this.artistService.findOne(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    const updatedArtist = await this.artistService.updateArtist(
      id,
      updateArtistDTO,
    );
    return updatedArtist;
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
    const deletedArtist = await this.artistService.deleteArtist(id);

    if (!deletedArtist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }
}
