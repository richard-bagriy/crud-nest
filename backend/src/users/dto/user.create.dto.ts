import { IsNotEmpty, IsEmail } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}