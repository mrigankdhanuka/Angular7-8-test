import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // Using mock data for demonstration
  private mockPeople: Person[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 30 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', age: 25 },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', age: 35 }
  ];

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    // Return mock data
    return of(this.mockPeople);
  }

  getPerson(id: number): Observable<Person> {
    const person = this.mockPeople.find(p => p.id === id);
    return of(person!);
  }

  createPerson(person: Person): Observable<Person> {
    // Generate new ID
    const newId = Math.max(...this.mockPeople.map(p => p.id)) + 1;
    const newPerson = { ...person, id: newId };
    this.mockPeople.push(newPerson);
    return of(newPerson);
  }

  updatePerson(person: Person): Observable<Person> {
    const index = this.mockPeople.findIndex(p => p.id === person.id);
    if (index !== -1) {
      this.mockPeople[index] = person;
    }
    return of(person);
  }

  deletePerson(id: number): Observable<void> {
    const index = this.mockPeople.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPeople.splice(index, 1);
    }
    return of(void 0);
  }
}