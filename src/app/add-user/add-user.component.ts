import {Component, OnInit} from '@angular/core';
import {Store} from "../store/store";
import {User} from "../user";
import {UserServiceService} from "../services/user-service/user-service.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Role} from "../role";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  protected allUsers: User[];

  newUser: User={
    username:"",
    password:"",
    roles:[{role:""}],
    firstName:"",
    lastName:"",
    email:""
  }
  protected allRoles: Role[];

  constructor(private store:Store,
              private userService:UserServiceService,
              private dialogRef: MatDialogRef<AddUserComponent>) {


  }
  ngOnInit(): void {
    this.allUsers=this.store.allUsers
    this.allRoles=this.store.allRoles
  }
  addUser() {


    const data= {
      username: this.newUser.username,
      password: this.newUser.password,
      roles: this.newUser.roles,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      email: this.newUser.email
    }
      this.userService.addUser(data).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    console.log(data)

    this.dialogRef.close();


  }

  close() {
    this.dialogRef.close();
  }


}
