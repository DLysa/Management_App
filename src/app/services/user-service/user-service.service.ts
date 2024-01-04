import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private  baseUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}showAllUsers`);
  }

  addUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}addUser`,data);
  }
}
