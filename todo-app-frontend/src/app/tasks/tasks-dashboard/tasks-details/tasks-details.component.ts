import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../_services/tasks.service';
import { TaskDto } from '../../../_dtos/task-dto';

@Component({
    selector: 'app-tasks-details',
    standalone: true,
    imports: [MatCardModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule,
        FormsModule],
    templateUrl: './tasks-details.component.html',
    styleUrl: './tasks-details.component.css',
})
export class TasksDetailsComponent {
    toCreate: boolean = true;

    priorities = priorities;
    status = status;

    mode: string | null = null;
    taskId: number | null = null;
    taskDetails: TaskDto;

    constructor(private _route: ActivatedRoute, private _router: Router, private _taskService: TasksService) {
        this.taskDetails = {
            id: 0,
            title: '',
            note: '',
            status: 'Todo',
            priorityType: 'Normal'
        }
    }

    async ngOnInit() {
        this.mode = this._route.snapshot.paramMap.get('mode');

        if (this.mode === 'edit') {
            const taskId = this._route.snapshot.paramMap.get('id');
            this.toCreate = false;

            if (!taskId) {
                this._router.navigate(['tasks']);
            }
            else {
                this.taskId = +taskId;
                await this._getTaskDetails(this.taskId);
            }
        }
    }


    private async _getTaskDetails(taskId: number) {
        this.taskDetails = await this._taskService.getTaskDetails(taskId);
    }


}

export const priorities = [
    'Critical',
    'High',
    'Major',
    'Normal',
    'Minor',
] as const;

export const status = [
    'Todo',
    'In Progress',
    'Complete',
] as const;

export type PrioritiesType = typeof priorities[number];
export type StatusType = typeof status[number];
