import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
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

    public get userValue(): User {
        return this.userSubject.value;
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/users/login`, JSON.stringify({username, password}))
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));    
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/users/login']);       
    }

    signup(user: User) {
        return this.http.post(`${environment.apiUrl}/users/signup`, JSON.stringify(user));
    }

    getAllUsers(): Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/users`)
        .pipe(
            catchError(this.handleError<User[]>('getAllUsers', []))
        );
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`)
        .pipe(
            catchError(this.handleError<User>(`getUserById ${id}`))
        );
    }

    updateUser(id:number, updateInfo: User) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, updateInfo)
        .pipe(
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
