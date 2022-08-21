import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  messageError:string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  )
  {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
      fullname: ['', Validators.required],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // // reset alerts on submit
    // // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    var date = new Date(this.f.birthday.value); 

    let data: User = {
      userId: null,
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      fullname: this.f.fullname.value,
      // birthday: this.f.birthday.value,
      birthday: date.toISOString(),
      address: this.f.address.value,
    };

    this.loading = true;
    this.userService
      .signup(data)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error: any) => {
          this.messageError = error.message;
          this.loading = false;
        },
      });
  }
}
