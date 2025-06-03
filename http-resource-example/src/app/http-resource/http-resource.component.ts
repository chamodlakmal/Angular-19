import { JsonPipe } from '@angular/common';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { Component, computed, effect, ResourceStatus } from '@angular/core';

@Component({
  selector: 'app-http-resource',
  imports: [JsonPipe],
  templateUrl: './http-resource.component.html',
  styleUrl: './http-resource.component.css',
})
export class HttpResourceComponent {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  todosResource = httpResource<Todo[]>(this.apiUrl);

  todos = computed(() => this.todosResource.value() ?? ([] as Todo[]));
  error = computed(() => this.todosResource.error() as HttpErrorResponse);

  //isLoading = computed(() => this.todosResource.isLoading());
  isLoading = this.todosResource.isLoading;

  eff = effect(() => {
    console.log('Todos Status: ', ResourceStatus[this.todosResource.status()]);
  });
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
