import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";

@Component({
  selector: 'app-show-pop-up-form',
  templateUrl: './show-pop-up-form.component.html',
  styleUrls: ['./show-pop-up-form.component.css']
})
export class ShowPopUpFormComponent {

  constructor(private dialog: MatDialog) {}

  public openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Title from config'
    };

    //this.dialog.open(PopUpFormComponent, dialogConfig);

    const dialogRef = this.dialog.open(AddTaskFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );

  }
}
