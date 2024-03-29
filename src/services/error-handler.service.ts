import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

@Injectable({ providedIn: 'root'})
export class ErrorHandlerService {

    constructor(){}
        /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
        handleError(error: HttpErrorResponse) {
        
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // TODO: better job of transforming error for user consumption
            // console.log(`${operation} failed: ${error.message}`);
        
            // Let the app keep running by returning an empty result.
            return throwError(error);
        }
}