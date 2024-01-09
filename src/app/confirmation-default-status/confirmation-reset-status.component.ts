import { Component } from '@angular/core';
import {Store} from "../store/store";
import {TaskService} from "../services/sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Status} from "../status";
import {LocalService} from "../local/local.service";


@Component({
  selector: 'app-confirmation-reset-status',
  templateUrl: './confirmation-reset-status.component.html',
  styleUrls: ['./confirmation-reset-status.component.css']
})
export class ConfirmationResetStatusComponent {

  statusTypes: Status[];
  defaultStatusType: Status[]= [{ id:1, name:"TO FIX"} ,{ id:2, name:"TO TESTS"},{ id:3, name:"UNIT TESTS"},{ id:4, name:"MANUAL TESTS"},{ id:5, name:"AUTOMATION TESTS"},{ id:6, name:"FUNCTIONAL TESTS"},{ id:7, name:"READY TO DEPLOY"}];
  selectedStatus: Status;
  orders:Status[]=[]


  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>,
               private localStore: LocalService) {
    this.statusTypes = store.statusType;
  }


  defaultStatus():void {

    for (let i = 0; i < this.defaultStatusType.length; i++) {

      this.taskService.addStatus(this.defaultStatusType[i])
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (e) => console.error(e)
        });
      this.dialogRef.close();
    }

    this.taskService.getAllStatus().subscribe((data:Status[]) =>{

      for (let i = this.defaultStatusType.length; i < data.length; i++) {
        this.defaultStatusType.push(data[i])
      }
      this.localStore.saveData('lastOrder', JSON.stringify(this.defaultStatusType));
    })

  }
  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }
}
