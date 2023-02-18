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
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<UserDTO[]> {
    const result = await this.userService.findAll();
    return result.map((user) => {
      const resp = { ...user };
      delete resp.password;
      return resp;
    });
  }

  @Get(':id')
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<UserDTO> {
    const result = await this.userService.findOne(id);
    if (!result)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const resp = { ...result };
    delete resp.password;
    return resp;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const created = await this.userService.createUser(createUserDTO);
    const resp = { ...created };
    delete resp.password;
    return created;
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDTO.oldPassword)
      throw new HttpException(
        'Old password is not correct',
        HttpStatus.FORBIDDEN,
      );

    const updated = await this.userService.updateUser(id, updateUserDTO);
    const resp = { ...updated };
    delete resp.password;
    return resp;
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
    const deletedUser = await this.userService.deleteUser(id);

    if (!deletedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
