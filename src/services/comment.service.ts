import { Injectable } from '@angular/core';
import { ErrorHandlerService } from "./error-handler.service";
import { Comment } from '../models/comment.model';
import { catchError } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class CommentService {
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService
    ){}

    createComment(comment: Comment){
        return this.http.post(`${environment.apiUrl}/posts/${comment.postId}/comments`, JSON.stringify(comment))
        .pipe(
            catchError(this.errorHandler.handleError('createComment'))
        )
    }

    updateComment(updateInfo: Comment){
        return this.http.put(`${environment.apiUrl}/posts/${updateInfo.postId}/comments/${updateInfo.commentId}`, JSON.stringify(updateInfo))
        .pipe(
            catchError(this.errorHandler.handleError('updateComment'))
        )
    }

    deleteComment(postid: number, commentid: number){
        return this.http.delete(`${environment.apiUrl}/posts/${postid}/comments/${commentid}`)
        .pipe(
            catchError(this.errorHandler.handleError('deleteComment'))
        )
    }

    // getPost(id: number){
    //     return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`)
    //     .pipe(
    //         catchError(this.errorHandler.handleError('getPost', null))
    //     )
    // }
    
    getAllCommentsOfPost(postid: number){
        return this.http.get<Comment[]>(`${environment.apiUrl}/posts/${postid}/comments`)
        .pipe(
            catchError(this.errorHandler.handleError('getAllCommentsOfPost', []))
        )
    }
}