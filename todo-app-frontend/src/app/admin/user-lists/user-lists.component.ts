import { AfterViewInit, Component, OnDestroy, OnInit, viewChild, ViewChild } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { DialogService } from '../../_services/dialog.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserForListDto } from '../../_dtos/user-for-list-dto';
import { UserService } from '../../_services/user.service';
@Component({
    selector: 'app-user-lists',
    standalone: true,
    imports: [MatSortModule, MatPaginatorModule, MatTableModule],
    templateUrl: './user-lists.component.html',
    styleUrl: './user-lists.component.css'
})
export class UserListsComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTable) tabl!: MatTable<UserForListDto[]>;
    dataSource = new MatTableDataSource<UserForListDto>;

    data: UserForListDto[] = [];
    displayedColumns = ["userId", "userName", "email"];

    constructor(private _authService: AuthService, private _dialogService: DialogService, private _userService: UserService) {
        this._getUserListData();
        console.log(this.data);
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    ngAfterViewInit() {
        if (this.sort && this.paginator) {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }
    }

    private _getUserListData() {
        const userList = this._userService.userList();
        this.data = userList;
        this.dataSource.data = this.data;
    }
}
