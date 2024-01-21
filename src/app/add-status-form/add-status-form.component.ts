import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

import {Status} from "../status";
import {TaskService} from "../services/sevices/task.service";
import {Store} from "../store/store";
import {LocalService} from "../local/local.service";

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
              private dialogRef: MatDialogRef<AddStatusFormComponent>,
              private localStore: LocalService,
              private store: Store) { }


  saveStatus(): void {
    const data = {
      id: this.newStatus.id,    //todo here maybe can be mistake
      name: this.newStatus.name
    };

    this.taskService.addStatus(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

    this.store.orderStatus.push(data)
    this.localStore.saveData('lastOrder',JSON.stringify(this.store.orderStatus))

    this.dialogRef.close();

  }
  close() {
    this.dialogRef.close();
  }

}
