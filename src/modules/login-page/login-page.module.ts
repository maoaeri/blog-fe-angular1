import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReCaptcha2Component } from 'ngx-captcha';
import { RecaptchaModule } from 'ng-recaptcha';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckTokenComponent } from './check-token/check-token.component';



@NgModule({
  declarations: [
   LoginPageComponent,
   ForgetPasswordComponent,
   ResetPasswordComponent,
   CheckTokenComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginPageRoutingModule,
    RecaptchaModule
  ]
})
export class LoginPageModule { }
