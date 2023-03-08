import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../sevices/task.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Store} from "../store/store";

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.css']
})
export class TaskDetailsFormComponent implements OnInit {

  action: string = 'Edit';
  selectedTask: Task;

  constructor(private taskService: TaskService,
              private store: Store,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,) {

    this.selectedTask = store.selectedTask;
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

  saveTask(): void {
    const data = {
      id: this.selectedTask.id,
      title: this.selectedTask.title,
      description: this.selectedTask.description
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
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }

}
