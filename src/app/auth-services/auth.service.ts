
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  logout() {
    this.http.post('http://localhost:8080/rest/auth/logout', {}).subscribe(
      () => {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['']).catch(err => console.error('Navigation Error: ', err));
      },
      error => {
        console.error('Logout Error: ', error);
      }
    );
  }

}
