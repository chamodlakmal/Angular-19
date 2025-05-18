import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/expense/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./features/expense/expense-list/expense-list.component').then(
        (m) => m.ExpenseListComponent
      ),
  },
  {
    path: 'expenses/new',
    loadComponent: () =>
      import('./features/expense/expense-form/expense-form.component').then(
        (m) => m.ExpenseFormComponent
      ),
  },
  {
    path: 'expenses/:id/edit',
    loadComponent: () =>
      import('./features/expense/expense-form/expense-form.component').then(
        (m) => m.ExpenseFormComponent
      ),
  },
];
