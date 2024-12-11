import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          passwordNotMatch: 'Confirm password does not match with password',
          required: 'This field is required',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: () => `Address isn't valid`,
        },
      },
      controlErrorsOn:{
        blur: true
      }
    }),
  ],
};
