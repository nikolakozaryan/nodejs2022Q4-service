import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { EntityType } from './interfaces/entityType';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getAll() {
    return this.favsService.findAll();
  }

  @Post(':type/:id')
  @HttpCode(201)
  async create(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Param('type')
    type: EntityType,
  ) {
    const res = await this.favsService.createFav(type, id);
    if (!res)
      throw new HttpException(
        "Entity doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return 'Entity added to favorites';
  }

  @Delete(':type/:id')
  @HttpCode(204)
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Param('type')
    type: EntityType,
  ) {
    const res = await this.favsService.deleteFav(type, id);
    if (!res)
      throw new HttpException(
        'Entity is not in favorites',
        HttpStatus.NOT_FOUND,
      );
    return 'Entity deleted from favorites';
  }
}
