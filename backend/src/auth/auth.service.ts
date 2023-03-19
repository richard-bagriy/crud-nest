import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserCreateDto } from "../users/dto/user.create.dto";
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { UserLoginDto } from "../users/dto/user.login.dto";
import { LoginJwtToken } from "./interfaces/jwt.inteface";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async register(userCreateDto: UserCreateDto): Promise<RegistrationStatus> {
        try {
            const user = await this.usersService.create(userCreateDto);
            return { success: true, message: "User registrated", user };
        } catch (error) {
            return { success: false, message: error }
        }
    }

    async login(userLoginDto: UserLoginDto): Promise<LoginJwtToken> {
        const { username, email } = await this.usersService.findByLogin(userLoginDto);
        const token = this.jwtService.sign({ username, email });
        return { token };
    }
}
