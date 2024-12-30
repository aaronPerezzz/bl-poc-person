import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPersonsComponent } from './pages/layout-persons/layout-persons.component';
import { ListPersonsPageComponent } from './pages/list-persons-page/list-persons-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPersonsComponent,
    children: [
      {
        path: 'new-person',
        component: PersonPageComponent
      },
      {
        path: 'edit/:id',
        component: PersonPageComponent
      },
      {
        path: 'list',
        component: ListPersonsPageComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
