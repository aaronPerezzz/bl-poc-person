import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonsServiceService } from '../../services/persons.service.service';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../interfaces/person.interface';
import { ToastServiceService } from '../../services/toast-service.service';
import { ToastType } from '../../utils/enums/toastType';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html'
})
export class PersonPageComponent implements OnInit {

  public personForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', {validators: [Validators.required]}),
    lastName: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators:[Validators.required, Validators.email]}),
    phone: new FormControl('', {validators:[Validators.required, Validators.maxLength(10)]}),
    birthDay: new FormControl(),
    maritalStatus: new FormControl('', {validators: [Validators.required]})
  });

  /**
   *
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonsServiceService,
    private router: Router,
    private toastService: ToastServiceService
  ) {}

  get currentPerson(): Person{
    const person = this.personForm.value as Person;
    return person;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.personService.getPersonById(id))
      ).subscribe(person => {
        if (!person) return this.router.navigateByUrl('/');
        this.personForm.reset(person);
        return;
      })
  }

  onSubmit(): void{
    if(this.personForm.invalid) return;

    if(this.currentPerson.id){
      this.personService.updatePersonById(this.currentPerson)
      .subscribe(person => {
        this.toastService.message(Constants.LABEL_UPDATE,"Información actualizada con éxito", ToastType.SUCCESS);
        this.router.navigate([Constants.URL_LIST])
      }, (error) => {
        this.toastService.message(Constants.LABEL_ERROR,"Error al actualizar la información", ToastType.ERROR);
      });
      return;
    }

    this.personService.savePerson(this.currentPerson).subscribe(person => {
      this.toastService.message(Constants.LABEL_SAVE,"Información guardad con éxito", ToastType.SUCCESS);
      this.router.navigate([Constants.URL_LIST])
    }, (error) => {
      this.toastService.message(Constants.LABEL_ERROR,"Error al guardar la información", ToastType.ERROR);
    })
  }


}