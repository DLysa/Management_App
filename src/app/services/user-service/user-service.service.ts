import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private  baseUrl = "http://localhost:8080/secure/auth/";

  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<User[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<User[]>(`${this.baseUrl}showAllUsers`,{headers});
  }

  addUser(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}addUser`,data);
  }

  deleteUser(username: String): Observable<any> {
    console.log(`${(this.baseUrl)}deleteUser/${username}`)
    return this.http.delete(`${(this.baseUrl)}deleteUser/${username}`);
  }
}
