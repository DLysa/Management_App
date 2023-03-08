import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Task } from "../task";

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

  getTask(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}showTask/${id}`);
  }

}
