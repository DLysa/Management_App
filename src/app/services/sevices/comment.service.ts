import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "../../task";
import {Status} from "../../status";
import {User} from "../../user";
import {Comment} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private  baseUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}showAllComments`);
  }

  addComment(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}addComment`,data);
  }
}
