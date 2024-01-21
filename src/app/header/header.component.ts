import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth-services/auth.service";
import {UserServiceService} from "../services/user-service/user-service.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  userInfo: any;
  roles:string = '';
  fullName:string = '';
  constructor(private authService: AuthService, private userService: UserServiceService) {}

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userInfo = data;
        this.fullName = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
        this.roles = this.userInfo.roles.map((role: { authority: any; }) => role.authority.replace('ROLE_',''))
          .join(', ');

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


