import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonsServiceService } from '../../services/persons.service.service';
import { switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../interfaces/person.interface';
import { ToastServiceService } from '../../services/toast-service.service';
import { ToastType } from '../../utils/enums/toastType';
import { Constants } from '../../utils/constants';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html'
})

/**
 * @author Aaron Pérez
 * @since 29/12/2024
 */
export class PersonPageComponent implements OnInit {

  private fb: FormBuilder = new FormBuilder();

  public personForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    birthDay: [new Date(), [Validators.required]],
    maritalStatus: ['', [Validators.required]]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonsServiceService,
    private router: Router,
    private toastService: ToastServiceService
  ) { }

  /**
   * Obtiene una instacia de la persona
   */
  get currentPerson(): Person {
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

  /**
   * En caso de tener id el registro se actualiza información
   * en caso contrario se agrega nuevo registro
   * @returns
   */
  onSubmit(): void {
    if (this.personForm.invalid) return;

    if (this.currentPerson.id) {
      this.personService.updatePersonById(this.currentPerson)
        .subscribe(person => {
          this.toastService.message(Constants.LABEL_UPDATE, "Información actualizada con éxito", ToastType.SUCCESS);
          this.router.navigate([Constants.URL_LIST])
        }, (error) => {
          this.toastService.message(Constants.LABEL_ERROR, "Error al actualizar la información", ToastType.ERROR);
        });
      return;
    }

    this.personService.savePerson(this.currentPerson).subscribe(person => {
      this.toastService.message(Constants.LABEL_SAVE, "Información guardad con éxito", ToastType.SUCCESS);
      this.router.navigate([Constants.URL_LIST])
    }, (error) => {
      this.toastService.message(Constants.LABEL_ERROR, "Error al guardar la información", ToastType.ERROR);
    })
  }

  /**
   * Valida si un campo es correcto
   * @param field
   * @returns
   */
  isValidField(field: string): boolean | null {
    return this.personForm.controls[field].errors && this.personForm.controls[field].touched
  }

}
