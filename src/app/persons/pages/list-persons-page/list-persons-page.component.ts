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

/**
 * @author Aaron Pérez
 * @since 29/12/2024
 */
export class ListPersonsPageComponent implements OnInit{

  public personsList: Person[] = [];

  constructor(private personService: PersonsServiceService, private toastService: ToastServiceService) {

  }

  ngOnInit(): void {
    this.getAllpersons();
  }

  /**
   * Obtiene las personas por paginación
   * @param page
   * @param items
   */
  getAllpersons(page: number = Constants.DEFAULT_PAGE, items: number = Constants.DEFAULT_ITEMS){
    this.personService.getAllPersons(page, items).subscribe(response => this.personsList = response?.response!)
  }

  /**
   * Eliminación de persona por id
   * @param id
   */
  deletePerson(id: number): void{
    this.personService.deletePersonById(id).subscribe(response => {
      this.toastService.message(Constants.LABEL_SUCCESS, "La persona se elimino con éxito", ToastType.SUCCESS);
      this.getAllpersons();
    }, (error) => {
      this.toastService.message(Constants.LABEL_ERROR, error.message, ToastType.ERROR);
    });
  }

  /**
   * Método encargado de obtener los datos para paginación
   * @param numPage
   */
  pagination(numPage: number): void{
    this.getAllpersons(numPage);
  }
}
