import { Component } from '@angular/core';
import {Store} from "../store/store";
import {TaskService} from "../services/sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Status} from "../status";
import {LocalService} from "../local/local.service";
import {find} from "rxjs";
import {Task} from "../task";

@Component({
  selector: 'app-confirmation-delete-status',
  templateUrl: './delete-status.component.html',
  styleUrls: ['./delete-status.component.css']
})
export class DeleteStatusComponent {

  orderStatus: Status[];
  selectedStatus: Status;
  tasks: Task[];

  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>, private localStore: LocalService) {
    this.orderStatus = store.orderStatus;
  }

  deleteStatus(selectedStatus: Status):void {

    console.log(selectedStatus)

    this.taskService.deleteStatus(selectedStatus)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close()

    const findOrderStatus=this.orderStatus.find(function (item){
      return item.id==Number(selectedStatus) //number
    })

    const existingStatus=this.orderStatus.find(function (item){
      return item.name=="TO TESTS"
    })
    if (findOrderStatus!=null){
      this.orderStatus.splice(this.orderStatus.indexOf(findOrderStatus),1)
      this.localStore.saveData('lastOrder', JSON.stringify(this.orderStatus))

      this.taskService.getTasks().subscribe((data:Task[]) =>{
        this.tasks=data;

        const findTask=this.tasks.find(function (item){
          return item.status==findOrderStatus.name //number
        })

        if (findTask!=null){
          let data;
          if(existingStatus!=undefined && findTask.status=="TO_TESTS"){
            data = {
              id: findTask.id,
              title: findTask.title,
              description: findTask.description,
              status: "TO TESTS"
            };

          }else{
            data = {
              id: findTask.id,
              title: findTask.title,
              description: findTask.description,
              status: this.orderStatus[0].name
            };
          }

          this.taskService.addTask(data)
            .subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (e) => console.error(e)
            });
          //TableComponent.refresh();
          this.dialogRef.close();
        }
      })
    }

  }
  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }
}
