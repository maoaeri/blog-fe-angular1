import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "src/models/post.model";
import { environment } from "src/environments/environment";
import { ErrorHandlerService } from "./error-handler.service";
import { catchError } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostService {
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ){}

    createPost(post: Post){
        return this.http.post(`${environment.apiUrl}/posts`, JSON.stringify(post))
        .pipe(
            catchError(this.errorHandler.handleError('createPost'))
        )
    }

    updatePost(id: number, updateInfo: Post){
        return this.http.put(`${environment.apiUrl}/posts/${id}`, JSON.stringify(updateInfo))
        .pipe(
            catchError(this.errorHandler.handleError('updatePost'))
        )
    }

    deletePost(id: number){
        return this.http.delete(`${environment.apiUrl}/posts/${id}`)
        .pipe(
            catchError(this.errorHandler.handleError('deletePost'))
        )
    }
    
    deleteAllPosts(){
        return this.http.delete(`${environment.apiUrl}/posts`)
        .pipe(
            catchError(this.errorHandler.handleError('deleteAllPosts'))
        )        
    }

    getPost(id: number){
        return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`)
        .pipe(
            catchError(this.errorHandler.handleError('getPost', null))
        )
    }
    
    getAllPost(id: number){
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`)
        .pipe(
            catchError(this.errorHandler.handleError('getAllPosts', []))
        )
    }
}