import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { WelcomeComponent } from './root/welcome/welcome.component';
import { authGuard } from '../Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];
