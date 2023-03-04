import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.css']
})
export class TaskDetailsFormComponent implements OnInit {

  action: string = 'Edit';


  task: Task = {
    id : 1,
    title: '',
    description: ''
  };

  constructor(private taskService: TaskService,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,) { }

  ngOnInit(): void {
    this.taskService.getTask(this.task.id).subscribe((data:Task) =>{
      console.log(data);
      this.task=data;
      console.log(this.task);

    })
  }



  editClick() {
    if(this.action == 'Edit') {
      this.action = 'Save';

    } else {
      this.action = 'Edit';

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
