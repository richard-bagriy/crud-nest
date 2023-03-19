import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/user.create.dto';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() userCreateDto: UserCreateDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(userCreateDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

}
