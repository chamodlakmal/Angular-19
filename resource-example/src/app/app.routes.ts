import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./user-list/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: 'users/search',
    loadComponent: () =>
      import('./user-search/user-search.component').then(
        (m) => m.UserSearchComponent
      ),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todo-list/todo-list.component').then(
        (m) => m.TodoListComponent
      ),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
];
