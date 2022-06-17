import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { LoginPageComponent } from './login-page.component';

const routes: Routes = [
    {
        path:'',
        component: LoginPageComponent
    },
    {
      path:'forgetpassword',
      component: ForgetPasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule { }
