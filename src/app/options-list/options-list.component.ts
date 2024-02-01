import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AddStatusFormComponent} from "../add-status-form/add-status-form.component";
import {DeleteStatusComponent} from "../delete-status/delete-status.component";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {ConfirmationResetStatusComponent} from "../confirmation-default-status/confirmation-reset-status.component";
import {ProjectSettingsComponent} from "../project-settings/project-settings.component";
import {ArchivedTasksComponent} from "../archived-tasks/archived-tasks.component";
import {Store} from "../store/store";

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.css']
})
export class OptionsListComponent {
roles:string
  constructor(private dialog: MatDialog,
              private store:Store
  ) {
  }
  isUserManagerOrTester(): boolean {
    let convert:any=this.store.currentUser.roles[0];
    this.roles=convert.authority.split('ROLE_')[1];
    return this.store.currentUser && (this.roles === 'MANAGER ' || this.roles === 'TESTER ');
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

  archivedTasks() {
    this.dialog.open(ArchivedTasksComponent);
  }
}
