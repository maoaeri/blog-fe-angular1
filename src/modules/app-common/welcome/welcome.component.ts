import { Component, OnInit } from '@angular/core';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';
import { JwtService } from '../../../services/jwt.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  page !: number
  posts : Post[] = []


  constructor(
    private jwtService: JwtService,
    private postService: PostService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params); // { orderby: "price" }
    //     this.page = parseInt(params.page);
    //     console.log(this.page); // price
    //   }
    // );
    this.page = 1;

    this.posts=[];
    console.log(this.posts);
    this.getAllPosts(1);
  }

  getAllPosts(page:number): void{
    this.postService.getAllPosts(page)
    .subscribe(posts => {
      this.posts.push(...posts);
    console.log(this.posts)})
  }

  onScroll() {
    // this.posts.push()
    // this.page ++;
    console.log(this.page);
      this.page ++;
      this.getAllPosts(this.page);
    console.log("scrolled");
  }

}
