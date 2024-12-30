import { Component, OnInit } from '@angular/core';
import { Person } from '../../interfaces/person.interface';
import { PersonsServiceService } from '../../services/persons.service.service';
import { ToastServiceService } from '../../services/toast-service.service';
import { ToastType } from '../../utils/enums/toastType';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-list-persons-page',
  templateUrl: './list-persons-page.component.html'
})
export class ListPersonsPageComponent implements OnInit{

  public personsList: Person[] = [];

  constructor(private personService: PersonsServiceService, private toastService: ToastServiceService) {

  }

  ngOnInit(): void {
    this.getAllpersons();
  }

  getAllpersons(){
    this.personService.getAllPersons(1, 10).subscribe(response => this.personsList = response?.response!)
  }

  deletePerson(id: number){
    this.personService.deletePersonById(id).subscribe(response => {
      this.toastService.message(Constants.LABEL_SUCCESS, "La persona se elimino con éxito", ToastType.SUCCESS);
      this.getAllpersons();
    }, (error) => {
      this.toastService.message(Constants.LABEL_ERROR, error.message, ToastType.ERROR);
    });
  }
}
