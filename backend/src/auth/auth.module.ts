import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/acess-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      session: false,
      property: "user"
    }),
    JwtModule.register({})
  ],
  providers: [AuthService, ConfigService, AccessTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
