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

  selectedFilter: string = this.priorities[4].name;
  taskList: Signal<TaskListDto[]>;

  constructor(private tasksService: TasksService) {
    this.taskList = tasksService.taskList.asReadonly();
  }

  ngOnInit() {
  }
}
