import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user/user.service';
import { UserController } from './user/user.controller';
@Module({
  imports: [UserModule, AuthModule,
    MongooseModule.forRoot('mongodb://localhost/USERS', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
