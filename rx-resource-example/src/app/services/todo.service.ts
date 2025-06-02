import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Todo } from '../models/todo.model';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  todos = rxResource({
    loader: () => this.http.get<Todo[]>(this.apiUrl),
  });

  todosResource = resource({
    loader: () => firstValueFrom(this.http.get<Todo[]>(this.apiUrl)),
  });

  getTodoById = (id: number) =>
    rxResource({
      loader: () => this.http.get<Todo>(`${this.apiUrl}/${id}`),
    });

  getTodoByParam(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }
}
