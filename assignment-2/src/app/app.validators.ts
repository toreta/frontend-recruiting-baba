import {
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

const regexes = {
  email: /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
  zipcode: /^\d$/,
};

export function emailPatternValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const email = control.value;
  const isOk = regexes.email.test(email);
  return isOk ? null : { pattern: true };
}

export function zipcodePatternValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const zipcode = control.value;
  const isOk = regexes.zipcode.test(zipcode);
  return isOk ? null : { pattern: true };
}
