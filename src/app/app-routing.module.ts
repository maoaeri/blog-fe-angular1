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
    path: 'login',
    loadChildren: () =>
    import('../modules/login-page/login-page-routing.module').then(
        m => m.LoginPageRoutingModule
    ),
  },
  {
    path: 'signup',
    loadChildren: () =>
    import('../modules/signup/signup-routing.module').then(
        m => m.SignupRoutingModule
    ),
  },
  {
    path:'aboutus',
    loadChildren: () =>
    import('../modules/aboutus/aboutus-routing.module').then(
      m => m.AboutusRoutingModule
    ),
  },
  {
    path: 'search',
    loadChildren: () =>
    import('../modules/search/search-routing.module').then(
        m => m.SearchRoutingModule
    ),
  },
  {
    path: 'post',
    loadChildren: () =>
    import('../modules/post/post-routing.module').then(
        m => m.PostRoutingModule
    ),
  },
  {
    path: '**',
    loadChildren: () =>
    import('../modules/page-not-found/page-not-found-routing.module').then(
        m => m.PageNotFoundRoutingModule
    ),
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
