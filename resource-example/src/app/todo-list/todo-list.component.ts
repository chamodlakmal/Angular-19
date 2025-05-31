import { Component, inject, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, LoadingSpinnerComponent, ErrorAlertComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  newTodoTitle = '';

  todos = resource({
    loader: async () => await this.todoService.getTodos(),
  });

  addTodo() {
    if (!this.newTodoTitle.trim()) {
      return;
    }
    const tempId = Date.now();
    const newTodo = {
      id: tempId,
      title: this.newTodoTitle.trim(),
      completed: false,
      userId: 1,
    };
    this.todos.update((currentTodos) => [...(currentTodos || []), newTodo]);
    this.newTodoTitle = '';
    this.todoService
      .addTodo(newTodo)
      .pipe(
        catchError((error) => {
          this.todos.update((currentTodos) =>
            currentTodos?.filter((todo) => todo.id !== tempId)
          );
          throw error;
        })
      )
      .subscribe((savedTodo) => {
        this.todos.update((currenTodos) =>
          currenTodos?.map((todo) => (todo.id === tempId ? savedTodo : todo))
        );
      });
  }

  getErrorMessage(error: any): string {
    return error.message || 'An error occurred while fetching users.';
  }
}
