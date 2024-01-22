import {Injectable} from "@angular/core";
import {Task} from "../task";
import {Status} from "../status";
import {User} from "../user";
import {Role} from "../role";

@Injectable({
  providedIn: 'root'
})
export class Store {
  selectedTask : Task ;
  statusType : Status[];
  orderStatus : Status[];
  allUsers:User[];
  allRoles:Role[]=[{role_id:"1", role:"ADMIN"},{role_id:"2", role:"TESTER"},{role_id:"3", role:"PROGRAMMER"},{role_id:"4", role:"MANAGER"},{role_id:"5", role:"GUEST"}]
  currentUser:User;
}
