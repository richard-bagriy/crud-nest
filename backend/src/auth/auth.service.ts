import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { UserCreateDto } from "../users/dto/user.create.dto";
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { UserLoginDto } from "../users/dto/user.login.dto";
import { Tokens } from "./interfaces/tokens.interface";
import { JwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async register(userCreateDto: UserCreateDto): Promise<RegistrationStatus> {
        try {
            const user = await this.usersService.create(userCreateDto);
            const tokens = await this._createTokens(user.id, user.email);
            await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);
            return { success: true, message: "User registrated", user };
        } catch (error) {
            return { success: false, message: error }
        }
    }

    async login(userLoginDto: UserLoginDto): Promise<Tokens> {
        const { id, email } = await this.usersService.findByLogin(userLoginDto);
        const tokens = await this._createTokens(id, email);
        this.usersService.updateRefreshToken(id, tokens.refresh_token);
        return tokens;
    }

    async refreshTokens(id: string, email: string): Promise<Tokens> {
        const user = await this.usersService.findById(id);
        const tokens = await this._createTokens(user.id, user.email);
        this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

        return tokens;
    }

    private async _createTokens(id: string, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: id, 
            email
        };

        const [access, refresh] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>("JWT_SECRET"),
                expiresIn: this.configService.get<string>("JWT_ACCESS_TOKEN_EXPIRES_IN")
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get<string>("JWT_SECRET"),
                expiresIn: this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRES_IN")
            }),
        ]);

        return {
            access_token: access,
            refresh_token: refresh
        }
    }

    public async logout(id: string): Promise<boolean> {
        const user = await this.usersService.findById(id);
        this.usersService.updateRefreshToken(user.id, "");

        return true;
    }
}
