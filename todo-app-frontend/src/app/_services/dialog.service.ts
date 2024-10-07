import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { TasksDetailsComponent } from "../tasks/tasks-dashboard/tasks-details/tasks-details.component";

@Injectable({
    providedIn: "root"
})

export class DialogService {
    
    constructor(private _dialog: MatDialog) { }

    taskDialog() {
        this._dialog.open(TasksDetailsComponent)
    }
}