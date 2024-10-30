import {CommonModule} from '@angular/common';
import {Component, computed, OnInit, signal } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TasksService} from '../../../_services/tasks.service';
import {TaskListDto} from '../../../_dtos/task-list-dto';
import {DialogService} from '../../../_services/dialog.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StatusService } from '../../../_services/status.service';
import { PriorityService } from '../../../_services/priority.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
    selector: 'app-tasks-lists',
    standalone: true,
    imports: [
        MatCardModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatChipsModule,
        RouterModule
    ],
    templateUrl: './tasks-lists.component.html',
    styleUrl: './tasks-lists.component.css',
})
export class TasksListsComponent implements OnInit {
    priorities = computed(() => {
        const priority = this._priorityService.priority().slice();

        if (!priority.length) return [];

        return [...priority, { priorityName: 'All', priorityId: priority.length + 1}]
    })

    status = computed(() => {
        const status = this._statusService.status().slice();

        if (!status.length) return [];

        return [...status, { statusName: 'All', statusId: status.length + 1 }];
    })

    selectedPriority = signal<string>('All');
    selectedStatus = signal<string>('All');
    filteredTaskList = computed(() => {
        const taskList = this._tasksService.taskList();

        if (!taskList.length) return [];

        return this._filterTasks(this.inputValue(), this.selectedPriority(), this.selectedStatus(), taskList);
    })
    inputValue = signal<string>('');

    constructor(
        private _tasksService: TasksService,
        private _dialogService: DialogService,
        private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _statusService: StatusService,
        private _priorityService: PriorityService
    ) { }

    ngOnInit() { }

    editTask(taskId: number) {
        this._router.navigate(['../edit-tasks/edit', taskId], {relativeTo: this._route});
    }

    async deleteTask(taskId: number) {
        const isSuccessful = await this._tasksService.deleteTask(taskId);

        if (isSuccessful) {
            await this._tasksService.loadTasks(this._authService.loggedInUser()!.userId);
            this._dialogService.message('Task deleted successfully.');
        }
        else {
            this._dialogService.message('Task deletion failed.');
        }
    }

    getFilterInput(event: Event) {
        this.inputValue.set((event.target as HTMLInputElement).value);
    }

    private _filterTasks(inputValue: string, selectedPriority: string, selectedStatus: string, taskList: TaskListDto[]) {
        return taskList.filter(task => {
            const filteredTitle = task.title
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            const filteredPriority =
                selectedPriority.toLowerCase() === 'all' ||
                task.priorityName.toLowerCase() ===
                    selectedPriority.toLowerCase();
            const filteredStatus =
                selectedStatus.toLowerCase() === 'all' ||
                task.statusName.toLowerCase() === selectedStatus.toLowerCase();

            return filteredTitle && filteredPriority && filteredStatus;
        });
    }
}
