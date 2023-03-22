import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';
import { TodoEntity } from './interfaces/todo.entity';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

    
    public async getAll(userId: string): Promise<TodoEntity[]> {
        const todos = await this.todoModel.find({ userId });
        return todos.map(this._sanitizeTodo);
    }

    public async getTodoById(id: string): Promise<TodoEntity> {
        const todo = await this.todoModel.findById(id);
        
        if (!todo) {
            throw new HttpException("Todo doesn't exists", HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        return this._sanitizeTodo(todo);
    }

    public async deleteTodo(id: string): Promise<boolean> {
        try {
            await this.todoModel.findByIdAndDelete(id);
            return true;
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST, { cause: new Error() });
        }
    }

    public async createTodo(createTodoDto: CreateTodoDto, userId: string): Promise<TodoEntity> {
        const todo = new this.todoModel({
            ...createTodoDto,
            createdAt: new Date(),
            userId,
        });
        await todo.save();
        return this._sanitizeTodo(todo);
    }

    private _sanitizeTodo(todoDocument: TodoDocument): TodoEntity {
        const { userId, id, updatedAt, done, createdAt, title  } = todoDocument;
        return { userId, id, updatedAt, done, createdAt, title };
    }

    public async updateTodo({ done, title }: UpdateTodoDto, id: string): Promise<TodoEntity> {
        const todo = await this.todoModel.findByIdAndUpdate(id, {
            $set: { title, done, updatedAt: new Date() },
        }, {returnOriginal: false});

        if (!todo) {
            throw new HttpException("Todo doesn't exists", HttpStatus.BAD_REQUEST, { cause: new Error() });
        }

        return this._sanitizeTodo(todo);
    }
}
