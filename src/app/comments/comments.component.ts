import {Component, OnInit} from '@angular/core';
import { Comment } from "../comment";
import { CommentService } from "../services/sevices/comment.service";
import { Task } from "../task";
import { Store } from "../store/store";
import { MatDialogRef } from "@angular/material/dialog";
import { TaskDetailsFormComponent } from "../task-details-form/task-details-form.component";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private selectedTask: Task;
  comments: Comment[];
  isInputVisible: boolean = false;
  commentText: string;

  constructor(private commentService: CommentService,
              private store: Store) {
    this.selectedTask = store.selectedTask;
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getAllComments().subscribe((data: Comment[]) => {
      this.comments = data.filter(comment => comment.taskId === this.selectedTask.id);
      this.comments.reverse();
    });
  }

  toggleInput() {
    this.isInputVisible = !this.isInputVisible;
  }

  saveComment() {
    const newComment = {
      text: this.commentText,
      status: this.selectedTask.status,
      taskId: this.selectedTask.id,
      authorId: `${this.store.currentUser.firstName} ${this.store.currentUser.lastName}`
    };

    this.commentService.addComment(newComment).subscribe({
      next: (res) => {
        this.comments.unshift(res);
        this.clearInput();
      },
      error: (e) => console.error(e)
    });
  }

  clearInput() {
    this.commentText = "";
  }

}
