import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateTodoDto {
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    done: boolean;
}