import {Component, OnInit} from '@angular/core';
import {Task} from "../task";
import {TaskService} from "../services/sevices/task.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Store} from "../store/store";
import {Status} from "../status";
import {CommentService} from "../services/sevices/comment.service";
import {Comment} from "../comment";

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
  newComment: Comment = {
    text: '',
    authorId: '',
    taskId:1,
    status:""
  };
  currentUserFirstName: string;
  currentUserLastName: string;
  constructor(private taskService: TaskService,
              private store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,
              private commentService: CommentService) {

    this.selectedTask = store.selectedTask;
    this.orderStatus = store.orderStatus;

  }

  ngOnInit(): void {

    console.log(this.selectedTask)
    this.taskService.getTask(this.selectedTask.id).subscribe((data: Task) => {
      // console.log(data);
      this.selectedTask = data;

      let namePart:string[] = this.selectedTask.workingFullName?.split(" ") ?? [];
      this.currentUserFirstName=namePart[0]
      this.currentUserLastName=namePart[1]
      if (this.selectedTask.workingFullName!="")
      {
        this.activity="IN PROGRESS"
      }
    });


  }
  saveAutomicComment() {

    this.newComment.status=this.selectedTask.status
    this.newComment.text="Task moved to " +this.selectedTask.status
    this.newComment.taskId=this.selectedTask.id
    this.commentService.addComment(this.newComment)
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
      this.saveAutomicComment();
      this.dialogRef.close();
      }
    }
  }

  activityChange() {
    let change:String;

    if (this.activity=="WAITING") {

      this.activity = 'IN PROGRESS';
      change = `${this.store.currentUser.firstName} ${this.store.currentUser.lastName}`

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
    //TableComponent.refresh();


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


  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }



}

