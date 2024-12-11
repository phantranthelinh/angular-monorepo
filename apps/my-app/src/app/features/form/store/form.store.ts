import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { map, skip, tap } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country, Option } from '../types/form.type';

interface State {
  countries: string[];
  options: Option[];
}
// Initial state of the store
const initialState: State = {
  countries: [],
  options: [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ],
};

@Injectable()
export class FormStore extends ComponentStore<State> {
  private countryService = inject(CountryService);

  constructor() {
    super(initialState);
  }

  loadCountryNames(): void {
    this.countryService
      .loadCountries()
      .pipe(
        map((country) =>
          country.map((country: Country) => country.name.common)
        ),
        tap((countries) => this.setCountries(countries))
      )
      .subscribe();
  }

  private setCountries(countries: string[]): void {
    this.setState((state) => ({
      ...state,
      countries,
    }));
  }

  private getStateSnapshot(state: State) {
    return {
      countries: state.countries,
      options: state.options,
    };
  }

  readonly vm$ = this.select((state) => state).pipe(
    map(this.getStateSnapshot),
    skip(1) // Skip the initial state emission
  );
}
