import {Role} from "./role";

export class User {
  user_id?: string;
  username:string;
  password:string;
  roles:Role[];
  firstName: string;
  lastName: string;
  email:string;
}
