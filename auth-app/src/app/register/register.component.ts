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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  REGISTER_FORM_PROPS = {
    EMAIL: 'email',
    USER_NAME: 'username',
    PASSWORD: 'password',
  };

  hide = signal(true);
  isLoading = signal(false);

  registerForm!: FormGroup;

  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);

  ngOnInit() {
    this.registerForm = this.#formBuilder.group({
      [this.REGISTER_FORM_PROPS.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.REGISTER_FORM_PROPS.USER_NAME]: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      [this.REGISTER_FORM_PROPS.PASSWORD]: new FormControl('', [
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

  async register() {
    try {
      this.isLoading.set(true);
      this.registerForm.disable();
      await this.#authService.createUserWithEmailAndPassword(
        this.registerForm.value,
      );
    } catch (error) {
    } finally {
      this.isLoading.set(false);
      this.registerForm.enable();
    }
  }
}
