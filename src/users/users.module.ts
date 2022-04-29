import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthController } from './auth.controller';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController, UsersController],
  providers: [
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class UsersModule {}
