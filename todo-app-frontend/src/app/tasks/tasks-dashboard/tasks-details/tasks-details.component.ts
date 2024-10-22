import { CommonModule } from '@angular/common';
import {Component, Signal} from '@angular/core';
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
import { PriorityDto } from '../../../_dtos/priority-dto';
import { StatusDto } from '../../../_dtos/status-dto';
import { StatusService } from '../../../_services/status.service';
import { PriorityService } from '../../../_services/priority.service';

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

    priorities: Signal<PriorityDto[]>;
    status: Signal<StatusDto[]>;

    mode: string | null = null;
    taskId: number | null = null;
    taskDetails: TaskDto;

    constructor(private _route: ActivatedRoute, 
                private _router: Router, 
                private _taskService: TasksService,
                private _statusService: StatusService,
                private _priorityService: PriorityService
    ) {
        this.taskDetails = {
            id: 0,
            title: '',
            note: '',
            status: {statusId: 1, statusName: 'Todo'},
            priority: {priorityId: 1, priorityName: 'Normal'}
        }

        this.priorities = this._priorityService.priority.asReadonly();
        this.status = this._statusService.status.asReadonly();

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
