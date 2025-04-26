import { Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { set } from '@angular/fire/database';

@Component({
  selector: 'app-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {

  private todoService = inject(TodoService)
  private fb = inject(FormBuilder)

  todos = signal<Todo[]>([])
  selectedTodo = signal<Todo | null>(null)
  successMessage = signal<string | null>(null)
  errorMessage = signal<string | null>(null)

  constructor() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos.set(todos)
      },
      error: (error) => {
        this.errorMessage.set(error.message)
        this.clearMessagesAfeterTimeout()
      }
    }
    )
  }

  todoForm = this.fb.group({
    task: ['', [Validators.required, Validators.minLength(3)]]
  })


  onSubmit() {
    const value = this.todoForm.value

    if (this.todoForm.invalid || value.task?.length! < 3) {
      return
    }
    if (this.selectedTodo()) {
      this.todoService.updateTodo(this.selectedTodo()!.id!, value.task!).then(() => {
        this.successMessage.set('Todo updated successfully')
        this.selectedTodo.set(null)
        this.todoForm.reset()
        this.clearMessagesAfeterTimeout()
      }).catch((error) => {
        this.errorMessage.set(error.message)
        this.clearMessagesAfeterTimeout()
      })
    } else {
      this.todoService.addTodo(value.task!).then(() => {
        this.successMessage.set('Todo added successfully')
        this.todoForm.reset()
        this.clearMessagesAfeterTimeout()
      }).catch((error) => {
        this.errorMessage.set(error.message)
        this.clearMessagesAfeterTimeout()
      }
      )
    }


  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).then(() => {
        this.successMessage.set('Todo deleted successfully')
        this.clearMessagesAfeterTimeout()
      }).catch((error) => {
        this.errorMessage.set(error.message)
        this.clearMessagesAfeterTimeout()
      }
      )
    }

  }

  onEdit(todo: Todo) {
    this.selectedTodo.set(todo)
    this.todoForm.setValue({ task: todo.task })
  }

  cancelEdit() {
    this.selectedTodo.set(null)
    this.todoForm.reset()
  }

  clearMessagesAfeterTimeout() {
    setTimeout(() => {
      this.successMessage.set(null)
      this.errorMessage.set(null)
    }, 3000)
  }
}
