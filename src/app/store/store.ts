import {Injectable} from "@angular/core";
import {Task} from "../task";
import {Status} from "../status";

@Injectable({
  providedIn: 'root'
})
export class Store {
  selectedTask : Task ;
  statusType : Status[];
}
