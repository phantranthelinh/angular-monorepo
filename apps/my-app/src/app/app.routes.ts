import { Route } from '@angular/router';
import { FormComponent } from './features/form/form.component';
import { ListComponent } from './features/list/list.component';
import { HomeComponent } from './features/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
];
