import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import('../modules/app-common/app-common-routing.module').then(
        m => m.AppCommonRoutingModule
    ),
  },
  {
    path: 'home',
    loadChildren: () =>
    import('../modules/home/home-routing.module').then(
        m => m.HomeRoutingModule
    ),
  },
  {
    path: 'login',
    loadChildren: () =>
    import('../modules/login-page/login-page-routing.module').then(
        m => m.LoginPageRoutingModule
    ),
  },
  {
    path: '**',
    loadChildren: () =>
    import('../modules/page-not-found/page-not-found-routing.module').then(
        m => m.PageNotFoundRoutingModule
    ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
