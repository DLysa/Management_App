import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private  baseUrl = "http://localhost:8080/";
  constructor(private http: HttpClient) { }

  login(username:string,password:string){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get("http://localhost:8081/api/",{headers,responseType: 'text' as 'json'})
  }

  getUsers() {
    let username='javatechie'
    let password='jt143'
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return  this.http.get("http://localhost:8081/api/getUsers",{headers});
  }
}

