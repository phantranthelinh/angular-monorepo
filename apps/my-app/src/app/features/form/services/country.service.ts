import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../types/form.type';

@Injectable()
export class CountryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1/all';

  loadCountries() {
    return this.http.get<Country[]>(this.apiUrl);
  }
}
