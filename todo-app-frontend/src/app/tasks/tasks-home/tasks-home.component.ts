import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tasks-home.component.html',
  styleUrl: './tasks-home.component.css',
})
export class TasksHomeComponent {}
