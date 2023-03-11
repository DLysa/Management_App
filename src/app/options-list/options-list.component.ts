import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddStatusFormComponent} from "../add-status-form/add-status-form.component";
import {AreUSureComponent} from "../are-u-sure/are-u-sure.component";
import {ConfirmationDeleteStatusComponent} from "../confirmation-delete-status/confirmation-delete-status.component";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent {

  constructor(private dialog: MatDialog
              ) {
  }

  public openDialogStatus() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddStatusFormComponent, dialogConfig);
  }

  areUSure() {
    this.dialog.open(ConfirmationDeleteStatusComponent);
  }
}
