import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { loginCanActivateGuard } from './guards/login-can-activate.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [loginCanActivateGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
