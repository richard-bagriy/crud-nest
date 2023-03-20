import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    done: boolean;
}