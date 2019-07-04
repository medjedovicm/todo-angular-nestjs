import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  controllerUrl: string = "http://localhost/to-do-app-compect/php/todo-controller/";

  constructor(
    private http: HttpClient
  ) {
    
  }

  public saveTodos(todos: TodoModel[]): Observable<any> {
    return this.http.post(this.controllerUrl + 'save-todos.php', todos);
  }

  public getTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(this.controllerUrl + 'get-todos.php');
  }
}
