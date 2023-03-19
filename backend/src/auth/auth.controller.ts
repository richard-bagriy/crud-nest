import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserDetails } from 'src/users/interfaces/user-details.interface';
import { UserCreateDto } from '../users/dto/user.create.dto';
import { UserLoginDto } from '../users/dto/user.login.dto';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginJwtToken } from "./interfaces/jwt.inteface";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() userCreateDto: UserCreateDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(userCreateDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        return result;
    }

    @Post('login')
    public async login(@Body() userLoginDto: UserLoginDto): Promise<LoginJwtToken> {
        return await this.authService.login(userLoginDto);
    }

}
