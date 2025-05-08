import { AbstractControl } from '@angular/forms';

export class FormValidationError {
  static getFormControlErrorMessage(
    ctrl: AbstractControl,
    name: string,
  ): string {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    if (ctrl.hasError('required')) {
      return `${capitalizedName} is required`;
    } else if (ctrl.hasError('email')) {
      return `${capitalizedName} is not a valid email`;
    } else if (ctrl.hasError('minlength')) {
      return `${capitalizedName} must be at least ${ctrl.errors?.['minlength'].requiredLength} characters long`;
    } else if (ctrl.hasError('maxlength')) {
      return `${capitalizedName} must be at most ${ctrl.errors?.['maxlength'].requiredLength} characters long`;
    } else {
      return `${capitalizedName} has error`;
    }
  }
}
