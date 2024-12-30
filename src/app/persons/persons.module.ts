import { NgModule } from '@angular/core';
import { PersonsRoutingModule } from './persons-routing.module';
import { LayoutPersonsComponent } from './pages/layout-persons/layout-persons.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { ListPersonsPageComponent } from './pages/list-persons-page/list-persons-page.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPersonsComponent,
    PersonPageComponent,
    ListPersonsPageComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PersonsModule { }
