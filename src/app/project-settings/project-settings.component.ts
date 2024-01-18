import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {Status} from "../status";
import {TaskService} from "../services/sevices/task.service";
import {Store} from "../store/store";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";
import {LocalService} from "../local/local.service";

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.css']
})
export class ProjectSettingsComponent /*implements OnInit*/{
  order:string|null;
  order2:Status[];

  allStatus: Status[];
  orderStatus: Status[];
  statusDraged: Status;
  x:number=0;



  action: string = 'Edit';
  selectedTask: Task;
  statusType: Status[];
  constructor(private taskService: TaskService,
              protected store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<ProjectSettingsComponent>,
              private localStore: LocalService) {

    this.selectedTask = store.selectedTask;
    this.statusType = store.statusType;


  }

  ngOnInit(): void {
    this.taskService.getAllStatus().subscribe((data: Status[]) => {
       console.log("Statuses get " +data);
      this.allStatus = data;

    });
    this.order =this.localStore.getData('lastOrder');
    if (this.order != null) {
      this.order2 =JSON.parse(this.order)

    }
  }

  drop(event: CdkDragDrop<Status[]>) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.orderStatus=event.container.data;
  }


  draging(statusDraged: Status) {

  }//todo delete

  saveColumns(){
    this.localStore.saveData('lastOrder', JSON.stringify(this.orderStatus));
  }



  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }



}

