import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../services/sevices/task.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Store} from "../store/store";
import {Status} from "../status";

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.css']
})
export class TaskDetailsFormComponent implements OnInit {

  action: string = 'Edit';
  activity: string = 'WAITING';
  selectedTask: Task;
  orderStatus: Status[];
  constructor(private taskService: TaskService,
              private store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,) {

    this.selectedTask = store.selectedTask;
    this.orderStatus = store.orderStatus;

  }

  ngOnInit(): void {

    console.log(this.selectedTask)
    this.taskService.getTask(this.selectedTask.id).subscribe((data: Task) => {
      // console.log(data);
      this.selectedTask = data;
    });
  }

  editClick() {

    if (this.action == 'Edit') {
      this.action = 'Save';
    } else {
      this.action = 'Edit';
      this.saveTask();
    }
  }

  activityChange() {

    if (this.activity == 'WAITING') {
      this.activity = 'IN PROGRESS';
    } else {
      this.activity = 'WAITING';
    }
  }

  saveTask(): void {
    const data = {
      id: this.selectedTask.id,
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      status: this.selectedTask.status
    };

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


  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }



}

