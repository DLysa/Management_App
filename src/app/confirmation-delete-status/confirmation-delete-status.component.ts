import { Component } from '@angular/core';
import {Store} from "../store/store";
import {TaskService} from "../services/sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Status} from "../status";
import {LocalService} from "../local/local.service";

@Component({
  selector: 'app-confirmation-delete-status',
  templateUrl: './confirmation-delete-status.component.html',
  styleUrls: ['./confirmation-delete-status.component.css']
})
export class





ConfirmationDeleteStatusComponent {

  statusTypes: Status[];
  selectedStatus: Status;

  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>, private localStore: LocalService) {
    this.statusTypes = store.orderStatus;
    console.log("construktor")
    console.log(this.statusTypes)
  }


  deleteStatus(selectedStatusID: Status):void{

    let selectedStatusIDNumber:number

  this.taskService.deleteStatus(selectedStatusID)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close()


    console.log("XDDDDDDDDD " + selectedStatusID)
    console.log("statustype przed deletem")
    console.log(this.statusTypes)
    if(selectedStatusID!=null){
      selectedStatusIDNumber=Number(selectedStatusID);
      console.log("selected id number")
      console.log(selectedStatusIDNumber)
    this.store.orderStatus.splice(selectedStatusIDNumber,1)

      this.localStore.saveData('lastOrder',JSON.stringify(this.store.orderStatus))
      }
  //TODO wraz z dodaniem id usunac ifas
  }
  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }
}
