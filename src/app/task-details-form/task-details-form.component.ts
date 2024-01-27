import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../services/sevices/task.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Store} from "../store/store";
import {Status} from "../status";
import {CommentService} from "../services/sevices/comment.service";
import {Comment} from "../comment";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.css']
})
export class TaskDetailsFormComponent implements OnInit {

  action: string = 'Edit';
  activity: string = 'WAITING';
  selectedTask: Task;
  orderStatus: Status[];
  currentUserFirstName: string;
  currentUserLastName: string;
  originalStatus: string;
  constructor(private taskService: TaskService,
              private store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,
              private commentService: CommentService) {

    this.selectedTask = store.selectedTask;


  }

  ngOnInit(): void {
    this.statusesForRoles();
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getTask(this.selectedTask.id).subscribe((data: Task) => {
      // console.log(data);
      this.selectedTask = data;
      this.originalStatus = data.status

      this.updateCurrentUserNames();
    });
  }
  statusesForRoles(){
    this.orderStatus=this.store.orderStatus;
    let convert:any=this.store.currentUser.roles[0];
    let roles=convert.authority.split('ROLE_')[1];
    console.log(roles)
    if (roles=="PROGRAMMER "){
      this.orderStatus=this.orderStatus.slice(0,2)
    }

 }
  updateCurrentUserNames(){
    let namePart:string[] = this.selectedTask.workingFullName?.split(" ") ?? [];
    this.currentUserFirstName=namePart[0]
    this.currentUserLastName=namePart[1]
    if (this.selectedTask.workingFullName!=null && this.selectedTask.workingFullName != '')
    {
      this.activity="IN PROGRESS BY"
    }
  }
  saveAutomaticComment() {
  const data={
    status:this.selectedTask.status,
    text:"Task moved to " +this.selectedTask.status,
    taskId:this.selectedTask.id
  }

    this.commentService.addComment(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

  }
  editClick() {

    if (this.action == 'Edit') {
      this.action = 'Save';
    } else {
      this.action = 'Edit';
      {
      this.updateTask();
      if(this.originalStatus!=this.selectedTask.status){
        this.saveAutomaticComment();
      }

      }
    }
  }

  activityChange() {
    let change:String;

    if (this.activity=="WAITING") {
      this.activity = 'IN PROGRESS BY';
      change = `${this.store.currentUser.firstName} ${this.store.currentUser.lastName}`
      this.currentUserFirstName=this.store.currentUser.firstName
      this.currentUserLastName=this.store.currentUser.lastName
    } else {
      this.activity = 'WAITING';
      change=""
      this.currentUserFirstName=""
      this.currentUserLastName=""
    }
    this.updateTask(change);
  }


  updateTask(workingFullname?:String): void {
    const data = {
      id: this.selectedTask.id,
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      status: this.selectedTask.status,
      workingFullName:workingFullname
    };

    this.taskService.updateTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
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


  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }



}

