import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundMainComponent } from './page-not-found-main/page-not-found-main.component';

const routes: Routes = [
  {
    path:'',
    component: PageNotFoundMainComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
