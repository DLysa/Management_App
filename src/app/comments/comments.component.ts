import { Component } from '@angular/core';
import {Comment} from "../comment";
import {TaskService} from "../services/sevices/task.service";
import {Store} from "../store/store";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommentService} from "../services/sevices/comment.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  constructor(private commentService: CommentService,
              private store: Store,
              public dialog: MatDialog,
              private dialogRef: MatDialogRef<CommentsComponent>,) {

  }
  ngOnInit(): void {
/*
    this.commentService.getAllComments().subscribe((data:Comment) => {
      // console.log(data);
      this.selectedTask = data;
    });*/
  }
}
