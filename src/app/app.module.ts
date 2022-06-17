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
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
