import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.entity';
import { TodoModel } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  constructor(private readonly todoService: TodoService) {}

  todoObj: TodoModel = new TodoModel();
  todos : Todo[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';

  ngOnInit(): void {
    this.getAllTodos();
  }

  private clearValues() {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.todoObj = new TodoModel();
  }

  public getAllTodos() {
    this.todoService.findAll().subscribe(res => {
      this.todos = res;
    }, err => {
      console.log(err);
    });
  }

  public addTask() {
    this.todoObj.title = this.addTaskValue;
    this.todoService.create(this.todoObj as Todo).subscribe(res => {
      this.todos = [...this.todos, res];
      this.clearValues();
    }, err => {
      console.error(err)
    })
  }

  public editTask() {
    this.todoObj.title = this.editTaskValue;
    this.todoService.updateOne(this.todoObj as Todo).subscribe((res: Todo) => {
      this.todos = this.todos.map(todo => {
        if (todo.id === res.id) {
          return {
            ...res,
          }
        }

        return todo;
      })
      this.clearValues();
    }, error => {
      console.log(error)
    });
  }

  public deleteTask(id: string) {
    this.todoService.deleteOne(id).subscribe(res => {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.clearValues();
    }, err => {
      console.log(err);
    })
  }

  call(etask : TodoModel) {
    this.todoObj = etask;
    this.editTaskValue = etask.title;
  }
}
