import { FormBuilder, Validators } from '@angular/forms';
import { numberValidator } from '../../../shared/validators/number-validator';

const formBuilder = new FormBuilder();

export const formSchema = {
  email: ['', Validators.required],
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required],
  gender: ['male'],
  selectedOptions: [[], Validators.required], //use empty array
  theme: ['dark', Validators.required],
  address: formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', Validators.required],
    country: ['Laos'],
  }),
  skills: formBuilder.array([createSkillGroup()]),
};

export function createSkillGroup() {
  return formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    level: ['', [Validators.required, numberValidator()]],
  });
}
