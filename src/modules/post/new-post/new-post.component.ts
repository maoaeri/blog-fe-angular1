import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/models/post.model';
import { JwtService } from 'src/services/jwt.service';
import { PostService } from 'src/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  form!:FormGroup;
  submitted = false;
  loading = false;
  messageError ='';

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      heading: ['', Validators.required],
      content: ['', Validators.required],
      bgurl: [''] 
    })
  }

  get f(){
    return this.form.controls;
  }

  getUserId(): number{
    let tokenInfo = this.jwtService.getTokenInfor()
    if (tokenInfo == null){
      return -1
    }
    return tokenInfo.userId
  }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid || this.getUserId() == -1) {
      console.log("Not a real user ;-;")
      return;
    }

    this.loading = true;
    let post: Post = {
      postId: 0,
      userId: this.getUserId(),
      heading: this.f.heading.value,
      content: this.f.content.value,
      backgroundUrl: this.f.bgurl.value
    }

    this.postService.createPost(post)
      .pipe()
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error: any) => {
          this.messageError = error.message;
          this.loading = false;
        },
      })
  }

}
