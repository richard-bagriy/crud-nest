import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { AccessTokenStrategy } from '../auth/strategies/acess-token.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema }
    ])
  ],
  providers: [
    TodoService, 
    { provide: APP_GUARD, useClass: AuthGuard('jwt') }
  ],
  controllers: [TodoController]
})
export class TodoModule {}
