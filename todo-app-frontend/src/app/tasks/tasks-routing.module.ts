import { Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TasksHomeComponent } from './tasks-home/tasks-home.component';
import { TasksDashboardComponent } from './tasks-dashboard/tasks-dashboard.component';
import { TasksListsComponent } from './tasks-dashboard/tasks-lists/tasks-lists.component';
import { TasksDetailsComponent } from './tasks-dashboard/tasks-details/tasks-details.component';
import { CreateTaskComponent } from './tasks-dashboard/create-task/create-task.component';

export default [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        component: TasksHomeComponent,
      },
      {
        path: 'tasks-dashboard',
        component: TasksDashboardComponent,
      },
      {
        path: 'tasks-lists',
        component: TasksListsComponent,
      },
      {
        path: 'tasks-details',
        component: TasksDetailsComponent,
      },
      {
        path: 'create-task',
        component: CreateTaskComponent,
      },
    ],
  },
] as Routes;
