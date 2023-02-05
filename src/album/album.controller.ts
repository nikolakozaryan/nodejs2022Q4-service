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
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { UpdateAlbumDTO } from './dto/update-album.dto';
import { IAlbum } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAll(): Promise<IAlbum[]> {
    const result = await this.albumService.findAll();
    return result;
  }

  @Get(':id')
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<IAlbum> {
    const result = await this.albumService.findOne(id);
    if (!result)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return result;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createAlbumDTO: CreateAlbumDTO): Promise<IAlbum> {
    const created = await this.albumService.createAlbum(createAlbumDTO);
    return created;
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ) {
    const album = await this.albumService.findOne(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);

    const updated = await this.albumService.updateAlbum(id, updateAlbumDTO);
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
    const deletedUser = await this.albumService.deleteAlbum(id);

    if (!deletedUser)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }
}
