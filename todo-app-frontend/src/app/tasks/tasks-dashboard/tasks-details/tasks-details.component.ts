import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { CreateTaskDto } from '../../../_dtos/create-task-dto';
import { AuthService } from '../../../_services/auth.service';

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
    styleUrls: ['./tasks-details.component.css'],
})
export class TasksDetailsComponent implements OnInit {
    toCreate: boolean = true;
    taskForm: FormGroup;

    priorities: Signal<PriorityDto[]>;
    status: Signal<StatusDto[]>;

    mode: string | null = null;
    taskId: number | null = null;
    taskDetails: TaskDto;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _taskService: TasksService,
                private _statusService: StatusService,
                private _priorityService: PriorityService,
                private _authService: AuthService,
                private _fb: FormBuilder
    ) {
        this.taskDetails = {
            id: 0,
            title: '',
            note: '',
            status: { statusId: 1, statusName: 'Todo' },
            priority: { priorityId: 1, priorityName: 'Normal' }
        };

        this.priorities = this._priorityService.priority.asReadonly();
        this.status = this._statusService.status.asReadonly();

        this.taskForm = this._fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            note: ['', Validators.required],
            priority: [null, Validators.required],
            status: [null, Validators.required],
        });

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

                this.taskForm.patchValue({
                title: this.taskDetails.title,
                note: this.taskDetails.note,
                priority: this.taskDetails.priority.priorityName,
                status: this.taskDetails.status.statusName
            });
            }
        }
    }

    save() {
        const selectedPriority = this.priorities().find(prio => prio.priorityName === this.taskForm.value.priority);
        const selectedStatus = this.status().find(stat => stat.statusName === this.taskForm.value.status);

        if (this.taskForm.valid && selectedPriority && selectedStatus) {
            const createTask: CreateTaskDto = {
                title: this.taskForm.value.title,
                note: this.taskForm.value.note,

                priority: {
                    priorityId: selectedPriority.priorityId, 
                    priorityName: selectedPriority.priorityName
                },
                status: { 
                    statusId: selectedStatus.statusId,
                    statusName: selectedStatus.statusName
                }
            };
            console.log(createTask);
        } else {
            console.log("Form is invalid!");
        }
        console.log("Save");
    }

    update() {
        const selectedPriority = this.priorities().find(prio => prio.priorityName === this.taskForm.value.priority);
        const selectedStatus = this.status().find(stat => stat.statusName === this.taskForm.value.status);

        if (this.taskForm.valid && selectedPriority && selectedStatus) {
            const updateTask: TaskDto = {
                id: this.taskId!,
                title: this.taskForm.value.title,
                note: this.taskForm.value.note,

                priority: {
                    priorityId: selectedPriority.priorityId, 
                    priorityName: selectedPriority.priorityName
                },
                status: { 
                    statusId: selectedStatus.statusId,
                    statusName: selectedStatus.statusName
                }
            };
            console.log(updateTask);
        } else {
            console.log("Form is invalid!");
        }
        console.log("Update");
    }

    async deleteTask() {
        const taskId = this.taskId;

        if (!taskId) {
            return;
        }

        const isSuccessful = await this._taskService.deleteTask(taskId);

        if (isSuccessful) {
            await this._taskService.loadTasks(this._authService.loggedInUser()!.userId);
            this._router.navigate(['./tasks/tasks-dashboard']);
        }
    }

    private async _getTaskDetails(taskId: number) {
        this.taskDetails = await this._taskService.getTaskDetails(taskId);
    }
}
