import { Component } from '@angular/core';
import {Store} from "../store/store";
import {TaskService} from "../services/sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Status} from "../status";

@Component({
  selector: 'app-confirmation-delete-status',
  templateUrl: './confirmation-delete-status.component.html',
  styleUrls: ['./confirmation-delete-status.component.css']
})
export class ConfirmationDeleteStatusComponent {

  statusTypes: Status[];
  selectedStatus: Status;

  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>,) {
    this.statusTypes = store.statusType;
  }


  deleteStatus(selectedStatusID: Status):void{
  this.taskService.deleteStatus(selectedStatusID)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close();

  }
  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }
}
