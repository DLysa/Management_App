import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Task } from "../../task";
import {Status} from "../../status";
import {User} from "../../user";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private  baseUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}showAllTasks`);
  }

  addTask(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}addTask`,data);
  }

  updateTask(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}updateTask`,data);
  }

  getTask(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}showTask/${id}`);
  }


  archiveTask(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}archiveTask`,data);
  }

  unArchiveTask(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}unArchiveTask`,data);
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(`${(this.baseUrl)}deleteTask/${id}`);
  }



  getAllStatus(): Observable<Status[]>{
    return this.http.get<Status[]>(`${this.baseUrl}showAllStatus`);
  }

  addStatus(data: Status): Observable<any>{
    return this.http.post(`${this.baseUrl}addStatus`,data);
  }

  resetStatus(data: Status): Observable<any>{
    return this.http.post(`${this.baseUrl}resetStatus`,data);
  }

  deleteStatus(id: any): Observable<any> {
    return this.http.delete(`${(this.baseUrl)}deleteStatus/${id}`);
  }

//todo wszdzie w service zaamiast any dac jakis typ np Status?


}
