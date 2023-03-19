import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema, User } from "./schemas/user.schema";
import { HashService } from './hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [UsersService, HashService],
  exports: [UsersService]
})
export class UsersModule {}
