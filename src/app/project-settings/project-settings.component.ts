import { Component } from '@angular/core';
import {Task} from "../task";
import {Status} from "../status";
import {TaskService} from "../services/sevices/task.service";
import {Store} from "../store/store";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AreUSureComponent} from "../are-u-sure/are-u-sure.component";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent {
  projectSettings(){
console.log("projsettings")
  }
  allStatus: Status[];
  orderStatus: Status[];
  statusDraged: Status;
  x:number=0;


  action: string = 'Edit';
  selectedTask: Task;
  statusType: Status[];
  constructor(private taskService: TaskService,
              private store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ProjectSettingsComponent>,) {

    this.selectedTask = store.selectedTask;
    this.statusType = store.statusType;

  }

  ngOnInit(): void {

    this.taskService.getAllStatus().subscribe((data: Status[]) => {
       console.log("Statuses get " +data);
      this.allStatus = data;
    });

  }

  drop(event: CdkDragDrop<Status[]>) {
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
      statusToChange = this.statusType.find(i => i.id === droppedIdOfTable+1);
      console.log(statusToChange);
      this.changeStatus(statusToChange!.name);
      droppedIdOfTable += 3;
      this.x+=3
      console.log(this.statusType.length)

    }
  }


  changeStatus(statusAfter:string): void {
    const data = {
      id: this.statusDraged.id,
      title: this.statusDraged.name
    };
    }


  openDialog() {


    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = 400;
    dialogConfig.minWidth = 300;



    this.dialog.open(ProjectSettingsComponent, dialogConfig);

  }
  draging(statusDraged: Status) {
    this.statusDraged = statusDraged;
  }



  saveColumns(){

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

  areUSure() {
    this.dialog.open(AreUSureComponent);
    this.dialogRef.close();
  }

  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }



}

