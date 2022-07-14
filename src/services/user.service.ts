import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { JwtService } from './jwt.service';
import { isPlatformBrowser } from '@angular/common';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private jwtService: JwtService,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();
    
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  public get tokenString(): string | null {
    return localStorage.getItem('jwt_token')
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(
        `${environment.apiUrl}/users/login`,
        JSON.stringify({ email, password }),
      )
      .pipe(
        catchError(this.errorHandler.handleError),
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            'jwt_token',
            JSON.parse(JSON.stringify(user)).token
          );
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('jwt_token');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    console.log(this.jwtService.isNotExpired())
    if (localStorage.getItem('jwt_token') !== null && !
    this.jwtService.isNotExpired()) {
      return true;
    } else {
      // this.logout();
      return false;
    }
  }

  signup(user: User) {
    console.log(user);
    return this.http.post(
      `${environment.apiUrl}/users/signup`,
      JSON.stringify(user),
    )
    .pipe(
      catchError(this.errorHandler.handleError),
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.apiUrl}/users`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateUser(id: number, updateInfo: User) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, updateInfo).pipe(
      catchError(this.errorHandler.handleError),
      map((x) => {
        if (this.userValue != null && id == this.userValue.userId) {
          let user = updateInfo;
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }

  getIPAdress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  checkLoginFailed(ip: string) {
    return this.http
      .get(`${environment.apiUrl}/users/loginfailed?ip=${ip}`)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

}
