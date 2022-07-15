import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTokenComponent } from './check-token/check-token.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { LoginPageComponent } from './login-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
        path:'',
        component: LoginPageComponent
    },
    {
      path:'forgetpassword',
      component: ForgetPasswordComponent
    },
    {
      path:'resetpassword',
      component: ResetPasswordComponent
    },
    {
      path:'checktoken',
      component: CheckTokenComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule { }
