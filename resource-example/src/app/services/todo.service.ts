import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.model';
import {
  catchError,
  delay,
  firstValueFrom,
  Observable,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(`${this.baseUrl}?_limit=10`));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo).pipe(
      delay(1000), //Simulate network delay for demo purporses
      catchError((error) => {
        return throwError(
          () => new Error('Failed to add todo. Please try again later.')
        );
      })
    );
  }
}
