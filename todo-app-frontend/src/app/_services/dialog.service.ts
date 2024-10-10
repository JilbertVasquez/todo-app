import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { TasksDetailsComponent } from "../tasks/tasks-dashboard/tasks-details/tasks-details.component";

@Injectable({
    providedIn: "root"
})

export class DialogService {

    constructor(private _dialog: MatDialog) { }

    // taskDialog():MatDialogRef<TasksDetailsComponent> {
    //     const taskDetailsConfig = new MatDialogConfig();
    //     taskDetailsConfig.height = '90%';
    //     taskDetailsConfig.width = '80%';
    //     return this._dialog.open(TasksDetailsComponent, {...taskDetailsConfig})
    // }
}
