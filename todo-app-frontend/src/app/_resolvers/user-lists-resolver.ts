import { inject } from "@angular/core";
import { UserProfile } from "../_dtos/user-profile-dto";
import { UserService } from "../_services/user.service";
import { ResolveFn } from "@angular/router";
import { UserForListDto } from "../_dtos/user-for-list-dto";


export const loadUserListResolver: ResolveFn<UserForListDto[]> = async () => {
    const userService = inject(UserService);

    if (userService.userList().length) return userService.userList();

    await userService.loadUserList();
    return userService.userList();
}
