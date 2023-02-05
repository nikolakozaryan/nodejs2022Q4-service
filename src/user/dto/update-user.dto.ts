import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  oldPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
