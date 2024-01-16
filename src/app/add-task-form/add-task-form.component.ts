import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {Task} from "../task";
import {TaskService} from "../services/sevices/task.service";


@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {

  newTask: Task = {
    title: '',
    description: '',
    status:''
  };

  constructor(private taskService: TaskService,
              private dialogRef: MatDialogRef<AddTaskFormComponent>,) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      id: this.newTask.id,
      title: this.newTask.title,
      description: this.newTask.description,
      status:"TO TESTS"
    };

    this.taskService.addTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
         error: (e) => console.error(e)
      });



    //TableComponent.refresh();
    this.dialogRef.close();//todo potrzebne?

  }
  close() {
    this.dialogRef.close();
  }

}
