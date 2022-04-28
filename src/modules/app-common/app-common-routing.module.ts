import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { AppCommonModule } from './app-common.module';

// Component
import { WelcomeComponent } from './welcome/welcome.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
];

@NgModule({
    imports: [AppCommonModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AppCommonRoutingModule {}