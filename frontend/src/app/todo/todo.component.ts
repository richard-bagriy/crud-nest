import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Todo } from './todo.entity';
import { TodoModel } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  host: {
    class: "todo-app"
  },
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {
  constructor(private readonly todoService: TodoService, private readonly authService: AuthService, private readonly router:Router) {}

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

  public addTodo() {
    this.todoObj.title = this.addTaskValue;
    this.todoService.create(this.todoObj as Todo).subscribe(res => {
      this.todos = [...this.todos, res];
      this.clearValues();
    }, err => {
      console.error(err)
    })
  }



  public deleteTodo(id: string) {
    this.todoService.deleteOne(id).subscribe(res => {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.clearValues();
    }, err => {
      console.log(err);
    })
  }

  public toggleDone(todo: Todo) {
    const payload = {...todo, done: !todo.done};
    this.todoService.updateOne(payload).subscribe(res => {
      this.todos = this.todos.map(_todo => {
        if (_todo.id === todo.id) {
          return payload;
        }

        return _todo;
      })
      this.clearValues();
    }, error => {
      console.log(error);
    })
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
