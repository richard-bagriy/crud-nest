import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCreateDto } from "../users/dto/user.create.dto";
import { RegistrationStatus } from './interfaces/registration-status.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async register(userDto: UserCreateDto): Promise<RegistrationStatus> {
        try {
            const user = await this.usersService.create(userDto);
            return { success: true, message: "User registrated", user };
        } catch (error) {
            return { success: false, message: error }
        }
    }
}
