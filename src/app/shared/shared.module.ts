import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    NotFoundPageComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
