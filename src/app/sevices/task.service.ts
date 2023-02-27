import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Task } from "../task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
private  baseUrl = "http://localhost:8080/api/showAllTasks";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }
}
