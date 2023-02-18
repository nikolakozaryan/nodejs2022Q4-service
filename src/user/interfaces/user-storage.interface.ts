import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { IUser } from './user.interface';

export interface IUserStorage {
  findById: (id: string) => IUser | null;
  findAll: () => IUser[];
  create: (data: CreateUserDTO) => IUser;
  update: (id: string, data: UpdateUserDTO) => IUser;
  delete: (id: string) => void;
}
