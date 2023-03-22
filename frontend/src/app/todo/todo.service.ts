import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { Todo } from "./todo.entity";

const HttpOptions = {
    headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
    })
}

@Injectable({ providedIn: "root" })

export class TodoService{
    private url: string = "/api/todo"

    constructor(private readonly http: HttpClient) {}

    public create(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>(this.url, todo, HttpOptions).pipe(catchError(this.handleError))
    }

    public findAll(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url, HttpOptions).pipe(catchError(this.handleError))
    }

    public deleteOne(id: string): Observable<{}> {
        return this.http.delete(`${this.url}/${id}`, HttpOptions).pipe(catchError(this.handleError));
    }

    public updateOne(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.url}/${todo?.id}`, todo);
    }

    private handleError() {
        return throwError(`Something went wrong`);
    }
 }