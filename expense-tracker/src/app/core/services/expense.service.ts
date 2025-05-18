import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly API_URL = 'http://localhost:3000/expenses';

  private http = inject(HttpClient);

  getExpenses() {
    return this.http.get<Expense[]>(this.API_URL);
  }

  getExpenseById(id: string) {
    return this.http.get<Expense>(`${this.API_URL}/${id}`);
  }
  createExpense(expense: Omit<Expense, 'id'>) {
    return this.http.post<Expense>(this.API_URL, expense);
  }
  updateExpense(id: string, expense: Expense) {
    return this.http.put<Expense>(`${this.API_URL}/${id}`, expense);
  }

  deleteExpense(id: string) {
    return this.http.delete<Expense>(`${this.API_URL}/${id}`);
  }
}
