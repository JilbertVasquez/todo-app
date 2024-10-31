import { Routes } from "@angular/router";
import { UserListsComponent } from "./user-lists/user-lists.component";
import { UserHomeComponent } from "./user-home/user-home.component";

export default [
    {
        path: '',
        component: UserHomeComponent
    },
    {
        path: 'user-list',
        component: UserListsComponent
    }
] as Routes;
