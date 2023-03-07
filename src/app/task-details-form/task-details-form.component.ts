import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {TableComponent} from "../table/table.component";

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.css']
})
export class TaskDetailsFormComponent implements OnInit {

  action: string = 'Edit';

  /*task: Task = {
    id : 1,
    title: '',
    description: ''
  };*/

  task: Task;
  editable: any;


  constructor(private taskService: TaskService,
              private table:TableComponent,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,) { }

  ngOnInit(): void {
    //this.refresh();

   // console.log(this.task)
    console.log(this.task);
    console.log(this.table.task)
   this.task = this.table.task
    console.log(this.task)
    this.taskService.getTask(this.task.id).subscribe((data: Task) => {
      // console.log(data);
      this.task = data;

    });
  }
/*
  refresh() {
    console.log(this.task)
    task: Task = this.table.task
    this.taskService.getTask(this.task.id).subscribe((data: Task) => {
     // console.log(data);
      this.task = data;
      //console.log(this.task);

      //console.log(this.clickedTask)
    });
  }*/


  editClick() {

    if (this.action == 'Edit') {
      this.action = 'Save';

    } else {
      this.action = 'Edit';
      this.saveTask();

    }
  }


  saveTask(): void {
    const data = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description
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
  close() {
    this.dialogRef.close();
  }

}
