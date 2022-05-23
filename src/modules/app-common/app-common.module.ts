import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from '../../components/header/header.component';

@NgModule({
  declarations: [WelcomeComponent, HeaderComponent],
  imports: [CommonModule],
})
export class AppCommonModule {}
