import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function greaterThanZero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value !== null && value <= 0) {
      return { negativeNumber: true };
    }
    return null;
  };
}
