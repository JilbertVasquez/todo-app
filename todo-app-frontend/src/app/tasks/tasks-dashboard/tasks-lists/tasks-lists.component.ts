import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tasks-lists',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './tasks-lists.component.html',
  styleUrl: './tasks-lists.component.css',
})
export class TasksListsComponent {}
