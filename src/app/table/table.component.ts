import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from "../task";
import {TaskService} from "../sevices/task.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  implements OnInit{

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

 done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  done1 = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  tasks: Task[];
  constructor(private taskService: TaskService) {
  }
  taskTitles:string[];

  ngOnInit():void {
    this.taskService.getTasks().subscribe((data:Task[]) =>{
      console.log(data);
      this.tasks=data;
      this.taskTitles = this.tasks.map(a => a.title);
      console.log(this.taskTitles);
    })
  }


  drop(event: CdkDragDrop<string[]>) {
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
}
