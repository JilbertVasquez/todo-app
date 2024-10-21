import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks-routing.module'),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'signup',
        component: SignupComponent
    }
];
