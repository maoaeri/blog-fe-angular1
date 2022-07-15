import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form !: FormGroup;
  loading = false;
  submitted = false;
  response !: string;
  messageError !:string;
  @Input() email!:string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required, Validators.minLength(6)],
      againpassword: ['', Validators.required, Validators.minLength(6)],
    });
    // const ans = localStorage.getItem("email");
    // if (ans === null) {
    //   this.email = "";
    // } else {
    //   this.email = ans;
    // }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;
    // this.loading = true;
    if (this.f.password.value !== this.f.againpassword.value){
      this.messageError = "Password not match."
      // return;
    }
    if (this.form.invalid) {
      // return;
    }
    this.userService
      .resetPassword(this.email, this.f.password.value)
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err:HttpErrorResponse) => {
          this.messageError = err.error.message;
          this.loading = false;
        }
      });
  }

}
