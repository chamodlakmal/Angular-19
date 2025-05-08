import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../shared/logo/logo.component';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidationError } from '../shared/util/form.errors';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    LogoComponent,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  LOGIN_FORM_PROPS = {
    EMAIL: 'email',
    PASSWORD: 'password',
  };

  hide = signal(true);
  isLoading = signal(false);

  loginForm!: FormGroup;

  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);

  ngOnInit() {
    this.loginForm = this.#formBuilder.group({
      [this.LOGIN_FORM_PROPS.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.LOGIN_FORM_PROPS.PASSWORD]: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  getError(ctrl: AbstractControl, name: string): string {
    return FormValidationError.getFormControlErrorMessage(ctrl, name);
  }

  async login() {
    this.isLoading.set(true);
    this.loginForm.disable();
    await this.#authService.signInWithEmailAndPassword(this.loginForm.value);
    this.isLoading.set(false);
    this.loginForm.enable();
  }

  async loginWithGoogle() {
    try {
      this.isLoading.set(true);
      this.loginForm.disable();
      await this.#authService.signInWithGoogle();
    } catch (error) {
      console.error('Error during Google login:', error);
    } finally {
      this.isLoading.set(false);
      this.loginForm.enable();
    }
  }
}
