import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
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
    setTimeout(() => {
      this.loading = false;
      this.response = "We have sent a notification mail to your address. Please check your email!";
    }, 1000)
    this.submitted = true;
  }




}
