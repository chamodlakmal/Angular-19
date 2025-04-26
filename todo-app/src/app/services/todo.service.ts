import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private firestore = inject(Firestore);
  private todoCollection = collection(this.firestore, 'todos');

  getTodos(): Observable<Todo[]> {
    return collectionData(this.todoCollection, { idField: 'id' }) as Observable<Todo[]>;
  }

  async addTodo(task: string): Promise<void> {
    try {
      await addDoc(this.todoCollection, { task })
    } catch (error) {
      console.error('Error adding todo: ', error);
      throw new Error('Error adding todo');
    }
    return
  }

  async deleteTodo(id: string): Promise<void> {
    try {
      const todoDoc = doc(this.firestore, 'todos', id);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.error('Error deleting todo: ', error);
      throw new Error('Error deleting todo');
    }
  }

  async updateTodo(id: string, task: string): Promise<void> {
    try {
      const todoDoc = doc(this.firestore, 'todos', id);
      await updateDoc(todoDoc, { task })
    } catch (error) {
      console.error('Error updating todo: ', error);
      throw new Error('Error updating todo');
    }

  }

}
