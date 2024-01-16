import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../services/user-service/user-service.service";
import {User} from "../user";
import {ConfirmationResetStatusComponent} from "../confirmation-default-status/confirmation-reset-status.component";
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "../add-user/add-user.component";
import {Store} from "../store/store";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users: User[] = [];



  constructor(private userService: UserServiceService,
             private dialog: MatDialog,
              private store:Store){

  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      this.store.allUsers=data;
    })
  }


  add() {
    this.dialog.open(AddUserComponent);
  }

  edit() {
    this.dialog.open(EditUserComponent);
  }

  delete() {
    this.dialog.open(DeleteUserComponent);

  }
}
