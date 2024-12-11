import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { errorTailorImports } from '@ngneat/error-tailor';
import { MultiSelectComponent } from '../../shared/components/multi-select/multi-select.component';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';
import { createSkillGroup, formSchema } from './schemas/form.schema';
import { CountryService } from './services/country.service';
import { FormStore } from './store/form.store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    MultiSelectComponent,
    ReactiveFormsModule,
    errorTailorImports,
    CommonModule,
  ],
  providers: [FormStore, CountryService, FormBuilder],
})
export class FormComponent implements OnInit {
  title = 'Form';
  userForm!: FormGroup;
  private formStore = inject(FormStore);
  private formBuilder = inject(FormBuilder);

  // ViewModel observable
  vm$ = this.formStore.vm$;

  ngOnInit() {
    this.initializeForm();
    this.formStore.loadCountryNames();
  }

  private initializeForm(): void {
    this.userForm = this.formBuilder.group(formSchema, {
      validators: passwordMatchValidator,
    });
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addNewSkill(): void {
    this.skills.push(createSkillGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSignUp(): void {
    if (this.userForm.valid) {
      this.handleSubmit();
    } else {
      this.logInvalidForm();
    }
  }

  private handleSubmit(): void {
    console.log('Form Submitted', this.userForm.value);
    // Handle sign-up logic here
  }

  private logInvalidForm(): void {
    console.log('Form is invalid:', this.userForm.value);
    console.log(
      'Confirm Password Error:',
      this.userForm.get('confirmPassword')?.hasError('passwordNotMatch')
    );
  }
}
