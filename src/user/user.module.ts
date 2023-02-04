import { Module } from '@nestjs/common';
import { UserStorage } from './store/user.store';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserStorage],
})
export class UserModule {}
