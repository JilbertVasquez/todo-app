import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';
import { loadStatusResolver } from './_resolvers/status-resolver';
import { loadPriorityResolver } from './_resolvers/priority-resolver';
import { loadTasksResolver } from './_resolvers/tasks-resolver';
import { UserDetailsResolver } from './_resolvers/user-details-resolver';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'tasks',
        loadChildren: () => import('./tasks/tasks-routing.module'),
        canActivate: [AuthGuard],
        resolve: {
            userDetails: UserDetailsResolver,
            loadStatus: loadStatusResolver,
            loadPriority: loadPriorityResolver
        }
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'admin',
        loadChildren: () => import ('./admin/admin-routing.module'),
        canActivate: [AuthGuard],
        resolve: {
            userDetails: UserDetailsResolver,
        }
    }
];
