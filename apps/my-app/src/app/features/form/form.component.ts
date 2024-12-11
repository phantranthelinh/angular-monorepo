import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { errorTailorImports } from '@ngneat/error-tailor';
import { Observable } from 'rxjs';
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
  formStore = inject(FormStore);
  formBuilder: FormBuilder = inject(FormBuilder);
  userForm!: FormGroup;
  private vm$: any;
  ngOnInit() {
    this.formStore.vm$.subscribe((vm) => {
      this.vm$ = vm;
    });
    this.userForm = this.formBuilder.group(formSchema, {
      validators: passwordMatchValidator,
    });
  }
  get countries(){
    return this.vm$.countries;
  }
  get options() {
    return this.vm$.options;
  }
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addNewSkill() {
    const skills = this.userForm.get('skills') as FormArray;
    skills.push(createSkillGroup());
  }
  removeSkill(index: number) {
    const skills = this.userForm.get('skills') as FormArray;
    skills.removeAt(index);
  }
  onSignUp() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      // Handle sign-up logic here
    } else {
      console.log(this.userForm.value);
      console.log(
        this.userForm.get('confirmPassword')?.hasError('passwordNotMatch')
      );
      // console.error('Form is invalid');
    }
  }
}
