import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {Task} from "../task";
import {TaskService} from "../sevices/task.service";


@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {


  newTask: Task = {
    id : 1,
    title: '',
    description: ''
  };


  constructor(private taskService: TaskService,
              private dialogRef: MatDialogRef<AddTaskFormComponent>,) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      id: this.newTask.id,
      title: this.newTask.title,
      description: this.newTask.description
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
