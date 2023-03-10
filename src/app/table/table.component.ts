import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from "../task";
import {TaskService} from "../sevices/task.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Store} from "../store/store";
import {Status} from "../status";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  tasks: Task[];
  task: Task;
  statusType: Status[];

  constructor(private taskService: TaskService, private store: Store, private dialog: MatDialog) {
  }

  ngOnInit():void {
    this.refresh()
  }

  refresh(this: any){
    this.taskService.getTasks().subscribe((data:Task[]) =>{
      console.log(data);
      this.tasks=data;
    })

    this.taskService.getAllStatus().subscribe((data:Status[]) =>{
      console.log(data);
      this.statusType=data;

      this.store.statusType = data;
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openDialog(selectedTask:Task) {
    this.store.selectedTask = selectedTask;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = 400;
    dialogConfig.minWidth = 300;

    console.log(selectedTask);

    //const dialogRef =
      this.dialog.open(TaskDetailsFormComponent, dialogConfig);

/*
    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );*/

  }

}
