import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form !: FormGroup;
  loading = false;
  submitted = false;
  response !: string;
  messageError!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(){
    this.loading = true;

    this.userService
      .forgotPassword(this.f.email.value)
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          setTimeout(() => {
            this.loading = false;
            this.response = "We have sent a notification mail to your address. Please check your email!";
          }, 1000)
          setTimeout(() => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
            this.router.navigateByUrl(returnUrl);
          }, 5000)
        },
        error: (err: HttpErrorResponse) => {
          // this.alertService.error(error);
          this.messageError = err.error.message;
          this.loading = false;
        } 
      })
    this.submitted = true;
  }

}
