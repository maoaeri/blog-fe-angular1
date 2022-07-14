import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  messageError:string | undefined;
  IP = "a";
  isTooMuchAttempts = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) // private alertService: AlertService
  {}

  ngOnInit() {
    this.getIPAdress();
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  getIPAdress() {
    this.userService.getIPAdress()
    .subscribe(
      (res:any)=>{
    this.IP = res.ip;
  });
  }

  onSubmit() {
    console.log(this.IP);
    this.submitted = true;
    // // reset alerts on submit
    // // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err: HttpErrorResponse) => {
          // this.alertService.error(error);
          this.messageError = err.error.message;
          this.loading = false;
          this.userService
            .checkLoginFailed(this.IP)
            .subscribe({
              next: () => {},
              error: (err: HttpErrorResponse) => {
                if (err.status == 400){
                  console.log("hihi")
                }
              }
            })
        },
      });
  }
}
