import { Component } from '@angular/core';
import {Store} from "../store/store";
import {TaskService} from "../services/sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Status} from "../status";


@Component({
  selector: 'app-confirmation-reset-status',
  templateUrl: './confirmation-reset-status.component.html',
  styleUrls: ['./confirmation-reset-status.component.css']
})
export class ConfirmationResetStatusComponent {

  statusTypes: Status[];
  defaultStatusType: Status[]= [{ id:1, name:"TO FIX"} ,{ id:2, name:"TO TESTS"},{ id:3, name:"UNIT TESTS"},{ id:4, name:"MANUAL TESTS"},{ id:5, name:"AUTOMATION TESTS"},{ id:6, name:"FUNCTIONAL TESTS"},{ id:7, name:"READY TO DEPLOY"},{ id:8, name:"READY TO DEPLOY"}];
  selectedStatus: Status;
  orders:Status[]=[]

  defaultOrderForDefaultStatus:number[]=[0,1,2,3,4,5,6];


  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>,) {
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

    const order = (dane: Status[], order: number[]) => {

      order.forEach(index=>{
        if(index>=0 && index < dane.length) {
          this.orders.push(dane[index])
        }
      })
      console.log(this.orders)
    }

    order(this.defaultStatusType,this.defaultOrderForDefaultStatus)
/*
   wyswietlDaneWKolejnosci(dane: Status[],kolejnosc: number[]):void {
      kolejnosc.forEach(index => {
        if (index >= 0 && index < dane.length) {
          console.log(dane[index]);
        }
      });
*/


/*
      let z=wyswietlDaneWKolejnosci([{ id:1, name:"TO FIX"} ,{ id:2, name:"TO TESTS"},{ id:3, name:"UNIT TESTS"},{ id:4, name:"MANUAL TESTS"},{ id:5, name:"AUTOMATION TESTS"},{ id:6, name:"FUNCTIONAL TESTS"},{ id:7, name:"READY TO DEPLOY"}], [1,2,3,4,5,6,7])
      console.log(z)*/
/*
    //this.store.orderStatus = {
    for (let j = 0; j < this.defaultStatusType.length; j++) {
      if (this.defaultStatusType >0 && this.defaultStatusType[j].id < this.defaultStatusType[j + 1].id) {

      }

    }*/
  }
  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }
}
