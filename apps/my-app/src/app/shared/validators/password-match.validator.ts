import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

function arePasswordsValid(
  password: string | null,
  confirmPassword: string | null
): boolean {
  return !!password && !!confirmPassword;
}

function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password') as FormControl;
  const confirmPassword = control.get('confirmPassword') as FormControl;

  if (!arePasswordsValid(password.value, confirmPassword.value)) {
    return null;
  }

  const isPasswordsMatch = doPasswordsMatch(
    password.value,
    confirmPassword.value
  );
  confirmPassword.setErrors(
    isPasswordsMatch ? null : { passwordNotMatch: true }
  );
  return null;
}
