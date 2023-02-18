import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { IUser } from './interfaces/user.interface';
import { UserStorage } from './store/user.store';

@Injectable()
export class UserService {
  constructor(
    private storage: UserStorage,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<IUser[]> {
    // const users = await this.storage.findAll();
    // return users;
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<IUser | null> {
    const user = await this.storage.findById(id);
    if (!user) return null;
    return user;
  }

  async createUser(data: CreateUserDTO): Promise<IUser> {
    const { login, password } = data;
    const created = await this.storage.create(data);
    return created;
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ login, password }])
      .execute();
    // return this.usersRepository.create(data);
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser> {
    const updated = await this.storage.update(id, data);
    return updated;
  }

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await this.findOne(id);
    if (!user) return null;

    await this.storage.delete(id);
    return user;
  }
}
