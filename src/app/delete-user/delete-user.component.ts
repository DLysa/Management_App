import { Component } from '@angular/core';
import {Store} from "../store/store";
import {UserServiceService} from "../services/user-service/user-service.service";
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "../user";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent /*imlement on init? //todo */ {
  usernameToDelete: String;
  protected allUsers: User[];


  constructor(private store:Store,
              private userService:UserServiceService,
              private dialogRef: MatDialogRef<DeleteUserComponent>) {


  }
  ngOnInit(): void {
    this.allUsers=this.store.allUsers

  }

  close() {
    this.dialogRef.close();
  }

  deleteUser(usernameToDelete: String) {
    console.log(usernameToDelete)

    this.userService.deleteUser(usernameToDelete)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.dialogRef.close()

  }
}
