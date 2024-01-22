import {Component, OnInit} from '@angular/core';
import { Comment} from "../comment";
import {CommentService} from "../services/sevices/comment.service";
import {Task} from "../task";
import {Store} from "../store/store";
import {MatDialogRef} from "@angular/material/dialog";
import {TaskDetailsFormComponent} from "../task-details-form/task-details-form.component";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  private selectedTask: Task;

  newComment: Comment = {
    text: '',
    authorId: '',
    taskId:1,
    status:""
  };
  comments: Comment[];
  comments2: Comment[];
  isInputVisible: boolean = false;
  commentText: any;

  constructor(private commentService: CommentService,
              private store: Store,
              private dialogRef: MatDialogRef<TaskDetailsFormComponent>) {
    this.selectedTask = store.selectedTask;
  }

  ngOnInit():void {
    this.commentService.getAllComments().subscribe((data:Comment[]) => {
      console.log(data);
      this.comments2=data.filter(
        data=>data.taskId);
      this.comments2=[...this.comments2].reverse();

      this.comments=data;
      console.log(this.comments2)
    })
  }

  toggleInput() {
    this.isInputVisible = !this.isInputVisible;
  }

  saveComment() {
    this.newComment.text=this.commentText
    this.newComment.status=this.selectedTask.status
    this.newComment.taskId=this.selectedTask.id
    this.newComment.authorId=`${this.store.currentUser.firstName} ${this.store.currentUser.lastName}`;
    console.log(this.newComment)
    this.commentService.addComment(this.newComment)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

  clearInput() {
    this.commentText=""
  }

  close() {
    this.dialogRef.close();

  }
}
