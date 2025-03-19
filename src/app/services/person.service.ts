import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Person {
  id?: number;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contact: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrlGET = 'http://localhost:8080/api/addressbook';
  private apiUrlPOST = 'http://localhost:8080/api/addressbook/addContact';
  private apiUrlPUT = 'http://localhost:8080/api/addressbook';
  private apiUrlDELETE = 'http://localhost:8080/api/addressbook';


  constructor(private http: HttpClient) {}

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrlGET}/getContact`);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrlPOST, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrlPUT}/${person.id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlDELETE}/${id}`);
  }
}
