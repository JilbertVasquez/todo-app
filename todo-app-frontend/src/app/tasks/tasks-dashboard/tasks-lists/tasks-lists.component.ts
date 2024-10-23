import {CommonModule} from '@angular/common';
import {Component, computed, OnInit, Signal} from '@angular/core';
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

    selectedPriority: string = 'All';
    selectedStatus: string = 'All';
    taskList: Signal<TaskListDto[]>;
    filteredTaskList: TaskListDto[] = [];
    inputValue: string = '';

    constructor(
        private _tasksService: TasksService,
        private _dialog: DialogService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _statusService: StatusService,
        private _priorityService: PriorityService
    ) {
        this.taskList = _tasksService.taskList.asReadonly();
    }

    ngOnInit() { }

    editTask(taskId: number) {
        this._router.navigate(['../edit-tasks/edit', taskId], {relativeTo: this._route});
    }

    // createTask() {
    //     this._router.navigate(['/tasks/create-task']);
    // }

    getFilterInput(event: Event) {
        this.inputValue = (event.target as HTMLInputElement).value;

        this._filterTasks();
    }

    onPriorityChange() {
        this._filterTasks();
    }

    onStatusChange() {
        this._filterTasks();
    }

    private _filterTasks() {
        this.filteredTaskList = this.taskList().filter(task => {
            const filteredTitle = task.title
                .toLowerCase()
                .includes(this.inputValue.toLowerCase());
            const filteredPriority =
                this.selectedPriority.toLowerCase() === 'all' ||
                task.priorityName.toLowerCase() ===
                    this.selectedPriority.toLowerCase();
            const filteredStatus =
                this.selectedStatus.toLowerCase() === 'all' ||
                task.statusName.toLowerCase() === this.selectedStatus.toLowerCase();

            return filteredTitle && filteredPriority && filteredStatus;
        });
    }
}
