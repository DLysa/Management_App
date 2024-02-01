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
import {User} from "../user";
import {UserServiceService} from "../services/user-service/user-service.service";

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
  roles:string;
  assignableUsers:User[];
  private users: User[]=[];
  constructor(private taskService: TaskService,
              private userService: UserServiceService,
              private store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>,
              private commentService: CommentService) {

    this.selectedTask = store.selectedTask;


  }

  ngOnInit(): void {
    this.statusesForRoles();
    this.loadTasks();
    this.getAssignableUsers();
  }

  loadTasks(){
    this.taskService.getTask(this.selectedTask.id).subscribe((data: Task) => {
      // console.log(data);
      this.selectedTask = data;
      this.originalStatus = data.status
      console.log(this.selectedTask)
      this.updateCurrentUserNames();
    });
  }
  statusesForRoles(){
    this.orderStatus=this.store.orderStatus;
    let convert:any=this.store.currentUser.roles[0];
    this.roles=convert.authority.split('ROLE_')[1];
    if (this.roles=="PROGRAMMER "){
      this.orderStatus=this.orderStatus.slice(0,2)
    }

 }

  updateCurrentUserNames(){
    let namePart:string[] = this.selectedTask.workingFullName?.split(" ") ?? [];
    console.log(namePart)
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
      this.updateTask(this.selectedTask.workingFullName);
      if (this.originalStatus != this.selectedTask.status) {
        this.saveAutomaticComment();
      }
    }
  }

  activityChange() {

    let change:String;
    if (this.roles!="GUEST "){
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
  }


  updateTask(workingFullName?:String): void {
    const data = {
      id: this.selectedTask.id,
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      status: this.selectedTask.status,
      workingFullName: workingFullName || this.selectedTask.workingFullName,
      insertedUserFullName:this.selectedTask.insertedUserFullName,
      archive:this.selectedTask.archive
    };

    this.taskService.updateTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

 archiveTask(): void {
    const data = {
      id: this.selectedTask.id,
      title: this.selectedTask.title,
      description: this.selectedTask.description,
      status: this.selectedTask.status,
      workingFullName:this.selectedTask.workingFullName,
      insertedUserFullName: this.selectedTask.insertedUserFullName,
      archive: this.selectedTask.archive
    };

    this.taskService.archiveTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }




  getAssignableUsers():void{
  let convert:any;
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;

      console.log(this.users[0].roles[0].role)

      this.assignableUsers = this.users.filter(user =>
        user.roles[0].role === 'TESTER ' || user.roles[0].role === 'PROGRAMMER '
      );
  })
  }

  onUserSelect(event: any): void {
    let selectedName
    if (event.value!=undefined){
   selectedName = event.value.replace(/([A-Z])/g, ' $1').trim();
    }else{
      selectedName = ""
    }
   this.updateTask(selectedName)
    this.automaticCommentManagerAssign()
    }

    automaticCommentManagerAssign(){

      const data={
        status:this.selectedTask.status,
        text: this.selectedTask.workingFullName+ " was assigned by "+ this.store.currentUser.firstName+" "+ this.store.currentUser.lastName + " (MANAGER)",
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

  close() {
    //przekazywanie zmian dla lepszego odswiezania?
    this.dialogRef.close();
  }



}

