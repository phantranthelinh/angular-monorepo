import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable()
export class CountryService {
  private country$ = new BehaviorSubject<any[]>([]);
  private http = inject(HttpClient);
  private apiUrl = 'https://restcountries.com/v3.1/all';
  loadCountries() {
    this.http
      .get(this.apiUrl)
      .pipe(tap((countryList: any) => this.country$.next(countryList)))
      .subscribe();
  }

  getCountryNames() {
    this.loadCountries()
    return this.country$.pipe(
      map((data) => data.map((country: any) => country.name.common))
    );
  }
}
