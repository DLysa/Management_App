/*import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private  baseUrl = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }

  login(username:string,password:string){
    const headers=new HttpHeaders({Authorization: 'Basic' +btoa(username+":"+password)})
    return  this.http.get(`${this.baseUrl}`,{headers,responseType:'text' as 'json'})
  }

  getUsers(){
    let username="dominik", password="123";

    const headers=new HttpHeaders({Authorization: 'Basic' +btoa(username+":"+password)})
    return this.http.get(`${this.baseUrl}getUsers`,{headers})
  }
}
*/