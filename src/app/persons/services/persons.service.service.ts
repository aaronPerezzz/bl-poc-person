import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Person, ResponseListPerson, ResponsePerson } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})

/**
 * @author Aaron Pérez
 * @since 29/12/2024
 */
export class PersonsServiceService {

  private readonly apiURL: string = "https://localhost:7181/api/persons";

  constructor( private http: HttpClient) { }

  /**
   * Obtiene los registros de backend
   * @param totalPaginas
   * @param totalRegistros
   * @returns
   */
  getAllPersons(totalPaginas: number, totalRegistros: number): Observable<ResponseListPerson | null>{
    return this.http.get<ResponseListPerson>(`${this.apiURL}?Pagina=${totalPaginas}&CantidadRegistros=${totalRegistros}`)
      .pipe(
        catchError(error => of(null))
      )
  }

  /**
   * Busca registro por id
   * @param id
   * @returns
   */
  getPersonById(id: number): Observable<Person | null>{
    return this.http.get<ResponsePerson>(`${this.apiURL}/${id}`)
    .pipe(
      map(person => person.response),
      catchError(error => of(null))
    );
  }

  /**
   * Eliminación de registro por id
   * @param id
   * @returns
   */
  deletePersonById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(error => of(null))
    );
  }

  /**
   * Actualiza información de un registro
   * @param updatePerson
   * @returns
   */
  updatePersonById( updatePerson: Person): Observable<void | null>{
    return this.http.put<void>(`${this.apiURL}/${updatePerson.id}`, updatePerson)
    .pipe(
      catchError(error => of(null))
    );
  }

  /**
   * Crea un nuevo registro
   * @param newPerson
   * @returns
   */
  savePerson(newPerson: Person): Observable<ResponsePerson>{
    return this.http.post<ResponsePerson>(`${this.apiURL}`, newPerson)
  }
}
