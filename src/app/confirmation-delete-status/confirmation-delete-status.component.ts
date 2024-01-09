import { Component } from '@angular/core';
import {Store} from "../store/store";
import {TaskService} from "../services/sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Status} from "../status";
import {LocalService} from "../local/local.service";
import {find} from "rxjs";

@Component({
  selector: 'app-confirmation-delete-status',
  templateUrl: './confirmation-delete-status.component.html',
  styleUrls: ['./confirmation-delete-status.component.css']
})
export class ConfirmationDeleteStatusComponent {

  orderStatus: Status[];
  selectedStatus: Status;

  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>, private localStore: LocalService) {
    this.orderStatus = store.orderStatus;
  }


  deleteStatus(selectedStatus: Status):void {

    this.taskService.deleteStatus(selectedStatus)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close()

    const findState=this.orderStatus.find(function (item){
      return item.id==Number(selectedStatus) //number
    })

    if (findState!=null){
      console.log(this.orderStatus.indexOf(findState))
    this.orderStatus.splice(this.orderStatus.indexOf(findState),1)
    this.localStore.saveData('lastOrder', JSON.stringify(this.orderStatus))
}




  }
  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }
}
