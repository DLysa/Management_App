import {Component, OnInit} from '@angular/core';
import {TaskService} from "../sevices/task.service";
import {Store} from "../store/store";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../task";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";

@Component({
  selector: 'app-are-u-sure',
  templateUrl: './are-u-sure.component.html',
  styleUrls: ['./are-u-sure.component.css']
})
export class AreUSureComponent {
  selectedTask: Task;


  constructor( private store: Store,private taskService: TaskService,  private dialogRef: MatDialogRef<TaskDetailsFormComponent>,){
    this.selectedTask = store.selectedTask;
  }


  deleteTask():void{
    const data = this.selectedTask.id;


    this.taskService.deleteTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close();
  }


}
