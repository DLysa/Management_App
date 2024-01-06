import {Component, OnInit} from '@angular/core';
import { Comment} from "../comment";
import {CommentService} from "../services/sevices/comment.service";
import {Task} from "../task";
import {Store} from "../store/store";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  private selectedTask: Task;

  newComment: Comment = {
    id : 1,
    text: '',
    authorId: 'Aktualnie zalogowany',
    taskId:1,
    status:""
  };
  comments: Comment[];
  comments2: Comment[];
  isInputVisible: boolean = false;
  commentText: any;

  constructor(private commentService: CommentService,
              private store: Store) {
    this.selectedTask = store.selectedTask;
  }

  ngOnInit():void {
    this.commentService.getAllComments().subscribe((data:Comment[]) => {
      console.log(data);
      this.comments2=data.filter(
        data=>data.taskId);

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
}
