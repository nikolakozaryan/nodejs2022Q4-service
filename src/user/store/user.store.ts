import { CreateUserDTO } from '../dto/create-user.dto';
import { IUserStorage } from '../interfaces/user-storage.interface';
import { IUser } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserStorage implements IUserStorage {
  private users: IUser[];
  constructor() {
    this.users = [];
  }

  findAll() {
    return this.users;
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }

  create(data: CreateUserDTO) {
    const id = uuidv4();
    const newUser: IUser = {
      ...data,
      id,
      version: 1,
      createdAt: Date.now(),
      updatedAt: null,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, data: UpdateUserDTO) {
    const user = this.users.find((user) => user.id === id);

    const updatedUser: IUser = {
      ...user,
      password: data.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );

    return updatedUser;
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
