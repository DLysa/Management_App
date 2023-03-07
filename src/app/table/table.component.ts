import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from "../task";
import {TaskService} from "../sevices/task.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

 done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  done1 = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  tasks: Task[];

  task: Task;

  constructor(private taskService: TaskService,private dialog: MatDialog) {
  }
  taskTitles:string[];
  //clickedTask: Task | undefined;

  ngOnInit():void {
    this.refresh()
  }

  refresh(this: any){
    this.taskService.getTasks().subscribe((data:Task[]) =>{
      console.log(data);
      this.tasks=data;
      //this.taskTitles = this.tasks.map((a: { title: string }) => a.title);

    //  console.log(this.taskTitles);
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

/*
  static refresh(this: any){
    this.taskService.getTasks().subscribe((data:Task[]) =>{
      console.log(data);
      this.tasks=data;
      this.taskTitles = this.tasks.map((a: { title: any; }) => a.title);
      console.log(this.taskTitles);
    })
  }
*/

  openDialog(taskFromOpening:Task) {
    //let taskArg: Task = task;
    this.task=taskFromOpening;


    // this.clickedTask= this.tasks.find(i => i.title === taskTitle);
    const dialogConfig = new MatDialogConfig();
   // console.log(this.taskTitles)
    //console.log(taskTitle)
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = 400;

    dialogConfig.minWidth = 300;


    console.log(this.task);
    console.log(taskFromOpening);


    const dialogRef = this.dialog.open(TaskDetailsFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );

  }

}
