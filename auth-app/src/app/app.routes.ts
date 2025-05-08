import { Routes } from '@angular/router';
import { loginCanActivateGuard } from './guards/login-can-activate.guard';
import { homeCanActivateGuard } from './guards/home-can-activate.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [loginCanActivateGuard],
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
    canActivate: [loginCanActivateGuard],
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [homeCanActivateGuard],
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
    canActivate: [loginCanActivateGuard],
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
