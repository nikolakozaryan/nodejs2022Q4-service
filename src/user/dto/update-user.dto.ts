import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
