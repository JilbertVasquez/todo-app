import { Routes } from "@angular/router";
import { UserListsComponent } from "./user-lists/user-lists.component";
import { UserHomeComponent } from "./user-home/user-home.component";
import { loadUserListResolver } from "../_resolvers/user-lists-resolver";

export default [
    {
        path: '',
        component: UserHomeComponent
    },
    {
        path: 'user-list',
        component: UserListsComponent,
        resolve:
        {
            userListResolver: loadUserListResolver
        }
    }
] as Routes;
