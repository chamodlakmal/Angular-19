import {
  Component,
  effect,
  inject,
  ResourceStatus,
  signal,
} from '@angular/core';
import { TodoService } from '../services/todo.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rx-resource',
  imports: [],
  templateUrl: './rx-resource.component.html',
  styleUrl: './rx-resource.component.css',
})
export class RxResourceComponent {
  private todoService = inject(TodoService);

  todoId = signal(1);
  //
  //  todos = this.todoService.todos;
  //
  //  eff = effect(() => {
  //    console.log('Status: ', ResourceStatus[this.todos.status()]);
  //    console.log('Value: ', this.todos.value());
  //  });
  //
  //  todosResource = this.todoService.todosResource;
  //  todosResourceEff = effect(() => {
  //    console.log(
  //      'Resource Status: ',
  //      ResourceStatus[this.todosResource.status()]
  //    );
  //    console.log('Resource Value: ', this.todosResource.value());
  //  });

  //todo = this.todoService.getTodoById(1);
  //todoEff = effect(() => {
  //  console.log('Todo Status: ', ResourceStatus[this.todo.status()]);
  //  console.log('Todo Value: ', this.todo.value());
  //});

  //updateValue() {
  //  this.todo.update((todo) => {
  //    if (todo) {
  //      return { ...todo, title: todo.title + ' - updated' };
  //    } else {
  //      return undefined;
  //    }
  //  });
  //}

  todo = rxResource({
    request: () => this.todoId(),
    loader: ({ request: todoId }) => this.todoService.getTodoByParam(todoId),
  });

  todoEff = effect(() => {
    console.log('Todo Status: ', ResourceStatus[this.todo.status()]);
    console.log('Todo Value: ', this.todo.value());
  });

  updateTodoId() {
    const randomTodoId = Math.floor(Math.random() * 200) + 1;
    this.todoId.set(randomTodoId);
  }
}
