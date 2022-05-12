import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { User } from "src/models/user.model";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/users/login`, JSON.stringify({email, password}),
        {headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })})
        .pipe(
            catchError(this.errorHandler.handleError<User>(`login`)),
            map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        })
        );    
    }

    // logout() {
    //     // remove user from local storage and set current user to null
    //     localStorage.removeItem('user');
    //     this.userSubject.next(null);
    //     this.router.navigate(['/users/login']);       
    // }

    signup(user: User) {
        return this.http.post(`${environment.apiUrl}/users/signup`, JSON.stringify(user));
    }

    getAllUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/users`)
        .pipe(
            catchError(this.errorHandler.handleError<User[]>('getAllUsers', []))
        );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
        .pipe(
            catchError(this.errorHandler.handleError<User>(`getUserById ${id}`))
        );
    }

    updateUser(id:number, updateInfo: User) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, updateInfo)
        .pipe(
            catchError(this.errorHandler.handleError<User>(`updateUser ${id}`)),
            map(x => {
                if (id == this.userValue.userId) {
                    let user = updateInfo;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user)
                }
                return x;
            })
        )
    }
}
