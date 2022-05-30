import { Component, OnInit } from '@angular/core';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';
import { JwtService } from '../../../services/jwt.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  posts : Post[] = []

  constructor(
    private jwtService: JwtService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts(): void{
    this.postService.getAllPosts(0)
    .subscribe(posts => {
      this.posts = posts})
  }

}
