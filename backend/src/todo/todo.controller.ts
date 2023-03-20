import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GetCurrentUserIdDecorator } from '../auth/decorators/user-id.decorator';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { TodoEntity } from './interfaces/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    public async getAll(@GetCurrentUserIdDecorator() id: string): Promise<TodoEntity[]> {
        return await this.todoService.getAll(id);
    }

    @Get(":id")
    public async getTodo(@Param('id') id: string): Promise<TodoEntity> {
        return await this.todoService.getTodoById(id);
    }

    @Post()
    public async createTodo(@Body() createTodoDto: CreateTodoDto, @GetCurrentUserIdDecorator() userId: string): Promise<TodoEntity> {
        return await this.todoService.createTodo(createTodoDto, userId);
    }

    @Put(":id")
    public async updateTodo(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return await this.todoService.updateTodo(updateTodoDto, id);
    }

    @Delete(':id')
    public async deleteTodo(@Param("id") id: string): Promise<boolean> {
        return await this.todoService.deleteTodo(id);
    }

}
