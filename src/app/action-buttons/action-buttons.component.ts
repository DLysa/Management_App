import {AfterViewInit, Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";
import {Store} from "../store/store";


@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit, AfterViewInit {
  roles: string;

  constructor(private dialog: MatDialog,
              private store:Store) {
  }

  public openDialogTask() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    this.dialog.open(AddTaskFormComponent, dialogConfig);



  }



  ngAfterViewInit(): void {
    this.waitForCurrentUser();
  }

  private waitForCurrentUser() {

    if (this.store.currentUser){
      let convert:any=this.store.currentUser.roles[0];
      this.roles=convert.authority.split('ROLE_')[1];
    }else {
      setTimeout(() => this.waitForCurrentUser(), 100);
    }
  }
  ngOnInit(): void {
    this.waitForCurrentUser()
  }
}
