import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserService } from "src/services/user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(
        private userService: UserService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.userService.userValue;
        const tokenString = this.userService.tokenString
        const isLoggedIn = user && tokenString;
        const isApiUrl = req.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenString}`
                }
            });
        }

        return next.handle(req);
    }

}