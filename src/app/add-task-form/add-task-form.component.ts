import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {Task} from "../task";
import {TaskService} from "../services/sevices/task.service";
import {CommentService} from "../services/sevices/comment.service";
import {Store} from "../store/store";
import {Comment} from "../comment";


@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {

  newTask: Task = {
    title: '',
    description: '',
    status: '',
    insertedUserFullName:'',
    archive:false
  };

  constructor(private taskService: TaskService,
              private dialogRef: MatDialogRef<AddTaskFormComponent>,
              private commentService: CommentService,
              private store:Store) {
  }

  ngOnInit(): void {
  }

  saveTask(): void {
    let taskWithHighestIdObject:Task;
    let taskWithHighestId

    const data = {
      id: this.newTask.id,
      title: this.newTask.title,
      description: this.newTask.description,
      status: "TO TESTS",
      insertedUserFullName:this.store.currentUser.firstName +" "+ this.store.currentUser.lastName,
      archive:false
    };//TODO IF NOT TEST THEN FIRST BYLO JUZ

    this.taskService.addTask(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });


      this.taskService.getTasks().subscribe((dataTask: Task[]) => {
        if (dataTask.length === 0) {
          console.log("No comments found.");
          return;
        }

        taskWithHighestIdObject = dataTask.reduce((prev: Task, current: Task) => {
          return (prev.id! > current.id!) ? prev : current;
        }, dataTask[0]);
        taskWithHighestId = taskWithHighestIdObject.id

        //adding automatic comment
        const dataComment = {
          status: data.status,
          text: "Task added by " + data.insertedUserFullName,
          taskId: Number(taskWithHighestId)+1
        }
        console.log(dataComment)
        this.commentService.addComment(dataComment)
          .subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (e) => console.error(e)
          });
      });

    this.dialogRef.close();//todo potrzebne?

  }
  close() {
    this.dialogRef.close();
  }

}
