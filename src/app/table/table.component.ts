import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Task } from "../task";
import {TaskService} from "../services/sevices/task.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {Store} from "../store/store";
import {Status} from "../status";
import {classNames} from "@angular/cdk/schematics";
import {LocalService} from "../local/local.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  tasks: Task[];
  task: Task;
  taskDraged: Task;
  statusType: Status[];
  i: number;
  x:number=0;
  order:string|null;
  order2:Status[];
  constructor(private taskService: TaskService, protected store: Store, private dialog: MatDialog, private localStore: LocalService) {

  }

  ngOnInit():void {
    this.refresh()

   this.order =this.localStore.getData('lastOrder');
    console.log("last order localstore")
    console.log(this.order)
    if (this.order != null) {
      this.order2 =JSON.parse(this.order)
     this.store.orderStatus=this.order2

    }
    console.log("init table storage oder")
    console.log(this.store.orderStatus)
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


  changeStatus(statusAfter:string): void {
    const data = {
      id: this.taskDraged.id,
      title: this.taskDraged.title,
      description: this.taskDraged.description,
      status: statusAfter
    };

    this.taskService.addTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.ngOnInit()

  }

  drop(event: CdkDragDrop<Task[]>) {
  let  statusToChange : Status | undefined;
  let droppedIdOfTable : number;
  let contenerId;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      //console.log(event.container)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      contenerId = event.container.id
      console.log("CONTENER ID :" + contenerId);
      droppedIdOfTable = Number(contenerId.substring(event.container.id.length - 1))-this.x
      console.log( "cutted number: "+droppedIdOfTable);
      statusToChange = this.statusType.find(i => i.id === droppedIdOfTable+1);//todo do deleta
      console.log(statusToChange);
     this.changeStatus(statusToChange!.name);
      droppedIdOfTable += 3;
      this.x+=3
      console.log(this.statusType.length)

    }
  }

  openDialog(selectedTask:Task) {
    this.store.selectedTask = selectedTask;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = 400;
    dialogConfig.minWidth = 300;

    console.log("Selected task: " + selectedTask);

    this.dialog.open(TaskDetailsFormComponent, dialogConfig);

  }

  draging(taskDraged: Task) {
    this.taskDraged = taskDraged;

  }
}
