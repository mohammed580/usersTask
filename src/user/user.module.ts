import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
   controllers: [UserController],
  providers: [UsersService]
  ,exports:[UsersService]
})
export class UserModule {}
