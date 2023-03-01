import {Component, OnInit} from '@angular/core';
import { Task } from "../task";
import {TaskService} from "../sevices/task.service";

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent  implements OnInit {

  newTask: Task = {
    title: '',
    description: ''
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
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
  }

  addNewTask(): void {
    this.newTask = {
      title: 't',
      description: 'd',
    };
  }




}
