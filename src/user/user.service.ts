import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserStorage } from './store/user.store';

@Injectable()
export class UserService {
  constructor(private storage: UserStorage) {}

  async findAll(): Promise<IUser[]> {
    const users = await this.storage.findAll();
    return users;
  }

  async findOne(id: string): Promise<IUser | null> {
    const user = await this.storage.findById(id);
    if (!user) return null;
    return user;
  }

  async createUser(data: CreateUserDTO): Promise<IUser> {
    const created = await this.storage.create(data);
    return created;
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
