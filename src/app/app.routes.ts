import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/home/home.component';
import { WelcomeComponent } from './pages/WelcomePage/welcome/welcome.component';

export const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent
    },
    {
        path: "home",
        component: HomeComponent
    }
];
