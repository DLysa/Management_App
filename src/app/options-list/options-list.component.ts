import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddStatusFormComponent} from "../add-status-form/add-status-form.component";
import {DeleteStatusComponent} from "../delete-status/delete-status.component";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {ConfirmationResetStatusComponent} from "../confirmation-default-status/confirmation-reset-status.component";
import {ProjectSettingsComponent} from "../project-settings/project-settings.component";

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent {

  constructor(private dialog: MatDialog
  ) {
  }

  addStatus(){
    this.dialog.open(AddStatusFormComponent);
  }

  deleteStatus() {
    this.dialog.open(DeleteStatusComponent);
  }

  resetStatus() {
    this.dialog.open(ConfirmationResetStatusComponent);
  }
  projectSettings() {
    this.dialog.open(ProjectSettingsComponent);
  }
}
