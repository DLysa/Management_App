import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {Status} from "../status";
import {TaskService} from "../services/sevices/task.service";

@Component({
  selector: 'app-add-status-form',
  templateUrl: './add-status-form.component.html',
  styleUrls: ['./add-status-form.component.css']
})
export class AddStatusFormComponent {

  newStatus: Status = {
    id : 1,
    name: ''
  };

  constructor(private taskService: TaskService,
              private dialogRef: MatDialogRef<AddStatusFormComponent>,) { }

  ngOnInit(): void {
  }

  saveStatus(): void {
    const data = {
      id: this.newStatus.id,
      name: this.newStatus.name
    };

    this.taskService.addStatus(data)
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
