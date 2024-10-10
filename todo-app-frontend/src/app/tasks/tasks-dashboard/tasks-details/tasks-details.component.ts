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
    title: string = '';
    note: string = '';
    selectedPriority: PrioritiesType  = 'Normal';
    selectedStatus: StatusType = 'Todo' ;

    priorities = priorities;
    status = status;

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
