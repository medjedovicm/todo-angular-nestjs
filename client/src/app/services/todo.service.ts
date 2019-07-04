import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import { app_config } from 'src/app_config';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) {
    
  }

  public saveTodos(todos: TodoModel[]): Observable<any> {
    return this.http.post(app_config.api_url + 'tasks/save', todos);
  }

  public getTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(app_config.api_url + 'tasks');
  }
}
