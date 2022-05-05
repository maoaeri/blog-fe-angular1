import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page-routing.module';



@NgModule({
  declarations: [
   LoginPageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginPageRoutingModule
  ]
})
export class LoginPageModule { }
