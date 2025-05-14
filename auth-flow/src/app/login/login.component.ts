import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        EmailId: this.loginForm.value.email,
        Password: this.loginForm.value.password,
      };
      this.authService.login(loginRequest);
    }
  }
}
