import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value !== null &&
      value !== '' &&
      !isNaN(value) &&
      !isNaN(parseFloat(value))
      ? null
      : { notANumber: true };
  };
}
