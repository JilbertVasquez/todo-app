import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TasksService } from '../../../_services/tasks.service';
import { TaskListDto } from '../../../_dtos/task-list-dto';
import { DialogService } from '../../../_services/dialog.service';

@Component({
  selector: 'app-tasks-lists',
  standalone: true,
  imports: [  MatCardModule, 
              CommonModule, 
              MatIconModule, 
              MatButtonModule, 
              MatFormFieldModule, 
              MatOptionModule, 
              MatSelectModule, 
              ReactiveFormsModule, 
              FormsModule,
              MatInputModule,
              MatChipsModule
            ],
  templateUrl: './tasks-lists.component.html',
  styleUrl: './tasks-lists.component.css',
})
export class TasksListsComponent implements OnInit {
  priorities = [
    { name: 'All' },
    { name: 'Critical' },
    { name: 'High' },
    { name: 'Major' },
    { name: 'Normal' },
    { name: 'Minor' }
  ];

  status = [
    { name: 'All' },
    { name: 'Todo' },
    { name: 'In Progress' },
    { name: 'Complete' },
  ];

  selectedPriority: string = 'All';
  selectedStatus: string = 'All';
  taskList: Signal<TaskListDto[]>;
  filteredTaskList: TaskListDto[] = [];
  inputValue: string = '';

  constructor(private _tasksService: TasksService, private _dialog: DialogService) {
    this.taskList = _tasksService.taskList.asReadonly();
  }

  ngOnInit() {
    this.filteredTaskList = this.taskList();
  }

  createTask() {
    this._dialog.taskDialog();
  }

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
      const filteredTitle = task.title.toLowerCase().includes(this.inputValue.toLowerCase());
      const filteredPriority = this.selectedPriority.toLowerCase() === 'all' || task.priorityType.toLowerCase() === this.selectedPriority.toLowerCase();
      const filteredStatus = this.selectedStatus.toLowerCase() === 'all' || task.status.toLowerCase() === this.selectedStatus.toLowerCase();

      return filteredTitle && filteredPriority && filteredStatus;
    });
  }
}
