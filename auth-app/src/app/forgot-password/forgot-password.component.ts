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
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  FORGOT_PASSWORD_FORM_PROPS = {
    EMAIL: 'email',
  };

  isLoading = signal(false);

  forgotPasswordForm!: FormGroup;

  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);

  ngOnInit(): void {
    this.forgotPasswordForm = this.#formBuilder.group({
      [this.FORGOT_PASSWORD_FORM_PROPS.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  async forgotPassword() {
    try {
      this.isLoading.set(true);
      this.forgotPasswordForm.disable();
      await this.#authService.sendPasswordResetEmail(
        this.forgotPasswordForm.value.email,
      );
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Handle error (e.g., show a notification to the user)
    } finally {
      this.isLoading.set(false);
      this.forgotPasswordForm.enable();
    }
  }

  getError(ctrl: AbstractControl, name: string): string {
    return FormValidationError.getFormControlErrorMessage(ctrl, name);
  }
}
