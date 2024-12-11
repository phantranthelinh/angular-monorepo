import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { exhaustMap, map, tap } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country, Option } from '../types/form.type';

interface State {
  countries: string[];
  options: Option[];
  loading: boolean;
}
// Initial state of the store
const initialState: State = {
  loading: false,
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

  // Method to update loading state
  private setLoading(loading: boolean): void {
    this.setState((state) => ({
      ...state,
      loading,
    }));
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
      loading: state.loading,
    };
  }

  readonly vm$ = this.select((state) => state).pipe(map(this.getStateSnapshot));

  readonly getCountryNames = this.effect<void>((trigger$) =>
    trigger$.pipe(
      exhaustMap(() =>
        this.countryService.loadCountries().pipe(
          tap(() => this.setLoading(true)),
          map((country) =>
            country.map((country: Country) => country.name.common)
          ),
          tapResponse({
            next: (data) => {
              this.setCountries(data);
              this.setLoading(false);
            },
            error: (error: HttpErrorResponse) => console.log(error),
          })
        )
      )
    )
  );
}
