import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth-services/auth.service";
import {UserServiceService} from "../services/user-service/user-service.service";
import {Store} from "../store/store";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  userInfo: any;
  roles:string = '';
  fullName:string = '';
  constructor(private authService: AuthService, private userService: UserServiceService, private store:Store) {}

  ngOnInit() {
   this.loadUser()
  }

  loadUser(){
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.store.currentUser =data
        this.fullName = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
        this.roles = this.userInfo.roles.map((role: { authority: any; }) => role.authority.replace('ROLE_',''))
          .join(', ');
        console.log("XD")
        console.log(this.roles)

      },
      error => {
        console.error('Error fetching user info', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }

}


