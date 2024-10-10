import {Component} from '@angular/core';
import { TasksDetailsComponent } from '../tasks-details/tasks-details.component';

@Component({
    selector: 'app-create-task',
    standalone: true,
    imports: [TasksDetailsComponent],
    templateUrl: './create-task.component.html',
    styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {}
