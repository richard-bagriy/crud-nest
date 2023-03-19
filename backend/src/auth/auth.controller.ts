import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto } from '../users/dto/user.create.dto';
import { UserLoginDto } from '../users/dto/user.login.dto';
import { AuthService } from './auth.service';
import { GetCurrentUserDecorator } from './decorators/current.user.decorator';
import { GetCurrentUserIdDecorator } from './decorators/user-id.decorator';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { Tokens } from './interfaces/tokens.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    public async register(@Body() userCreateDto: UserCreateDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(userCreateDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        return result;
    }

    @Post('login')
    public async login(@Body() userLoginDto: UserLoginDto): Promise<Tokens> {
        return await this.authService.login(userLoginDto);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post('logout')
    public async logout(@GetCurrentUserIdDecorator() id: string): Promise<boolean> {
        this.authService.logout(id);
        return true;
    }

    @UseGuards(AuthGuard("jwt-refresh"))
    @Post('refresh')
    public async refresh(
        @GetCurrentUserIdDecorator() id: string,
        @GetCurrentUserDecorator('refreshToken') token: string
    ): Promise<Tokens> {
        return this.authService.refreshTokens(id, token);
    }

}
