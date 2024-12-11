import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Option } from '../types/form.type';

interface State {
  countries: string[]; // Changed to an array for better state management
  options: Option[];
}

@Injectable()
export class FormStore extends ComponentStore<State> {
  private countryService: CountryService = inject(CountryService);

  constructor() {
    super();

    const initialState = {
      countries: [],
      options: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
      ],
    };

    this.setState(initialState);

    this.countryService
      .getCountryNames()
      .pipe(
        tap((countries) => this.setState((state) => ({ ...state, countries })))
      )
      .subscribe();
  }
  readonly countries$ = this.select((state) => state.countries);
  readonly options$ = this.select((state) => state.options);

  readonly vm$ = this.select(
    this.countries$,
    this.options$,
    (countries, options) => ({ countries, options })
  );
}
