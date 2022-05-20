import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({providedIn: 'root'})
export class JwtService{
    tokenString!: any

    constructor(
        private jwtHelper: JwtHelperService
    ){
        this.tokenString = localStorage.getItem('jwt_token')
    }

    getTokenInfor(): any {
        let a= this.jwtHelper.decodeToken(this.tokenString)
        console.log(a)
        return a
    }

    getTokenExpirationDate() {
        return this.jwtHelper.getTokenExpirationDate(this.tokenString)
    }

    isNotExpired() {
        return !this.jwtHelper.isTokenExpired(this.tokenString)
    }
}