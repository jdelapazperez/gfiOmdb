import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { AuthResponse } from '../interfaces/AuthResponse';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlLogin = 'http://localhost/ApiServicice/login';
  urlRegister = 'http://localhost/ApiServicice/register';

  private userSubject: BehaviorSubject<AuthResponse>;
  public user: Observable<AuthResponse>;

  public get userData(): AuthResponse{
    return this.userSubject.value;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<AuthResponse>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  onLogin(email: string, pass: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.urlLogin, { email, pass }, httpOptions)
      .pipe(
        map((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.userSubject.next(res);
          return res;
        })
      );
  }

  onRegister(email: string, pass: string): Observable<any> {
    return this.http
    .post<any>(this.urlRegister, {email, pass},httpOptions)
    .pipe(
      map(res => {
        // this.userSubject.next(res);
        return res;
      })
    );
  }

  onLogout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
