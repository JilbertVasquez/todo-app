import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TasksListsComponent } from './tasks-lists/tasks-lists.component';

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, CommonModule, TasksListsComponent],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.css',
})
export class TasksDashboardComponent {
}