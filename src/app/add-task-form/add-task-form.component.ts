import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {Task} from "../task";
import {TaskService} from "../sevices/task.service";


@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent implements OnInit {


  newTask: Task = {
    id : 1,
    title: '',
    description: ''
  };

  /*
  form: FormGroup;
  title: string ;
  description: string;
*//*
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopUpFormComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data:any) {

    this.description = data.description;
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      title: [this.title,[]],
      description: [this.description, []],

    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
*/

  constructor(private taskService: TaskService,
              private dialogRef: MatDialogRef<AddTaskFormComponent>,) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    const data = {
      id: this.newTask.id,
      title: this.newTask.title,
      description: this.newTask.description
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
  close() {
    this.dialogRef.close();
  }

}
