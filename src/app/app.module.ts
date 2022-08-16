import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppCommonModule } from '../modules/app-common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from '../modules/login-page/login-page.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupModule } from '../modules/signup/signup.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { httpInterceptorProviders } from 'src/interceptors';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SearchModule } from 'src/modules/search/search.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { PostModule } from 'src/modules/post/post.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppCommonModule,
    LoginPageModule,
    SignupModule,
    SearchModule,
    PostModule,
    InfiniteScrollModule,
    RecaptchaModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
