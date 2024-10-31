import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-lists',
    standalone: true,
    imports: [],
    templateUrl: './user-lists.component.html',
    styleUrl: './user-lists.component.css'
})
export class UserListsComponent implements OnInit {
    ngOnInit() {
        console.log('heellow');
    }
}
