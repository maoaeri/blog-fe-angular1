import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/models/post.model';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  posts: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const q = this.route.snapshot.queryParams["q"];
    if (q!== undefined) {
      this.getAllPosts(q);
      console.log(this.posts);
    }
        
  }

  getAllPosts(q: string){
    this.postService.searchPosts(q)
      .subscribe({
        next: posts => {
          this.posts = posts;
          console.log(this.posts);
      },
        error: (err: Error) => {
          console.log(err.message)
        }
      })
    console.log(this.posts);
  }
  

}
