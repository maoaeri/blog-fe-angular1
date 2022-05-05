import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "src/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    
    constructor(
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/users/login`, {username, password})
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));    
    }
}
