import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>People List</h2>
      <a [routerLink]="['/people/new']" class="btn-add">Add Person</a>
      
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let person of people">
            <td>{{ person.firstName }}</td>
            <td>{{ person.lastName }}</td>
            <td>{{ person.email }}</td>
            <td>{{ person.age }}</td>
            <td>
              <a [routerLink]="['/people/edit', person.id]" class="btn-edit">Edit</a>
              <button (click)="deletePerson(person.id)" class="btn-delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    .btn-add { background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
    .btn-edit { background: #2196F3; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px; margin-right: 5px; }
    .btn-delete { background: #f44336; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.peopleService.getPeople().subscribe(
      people => this.people = people
    );
  }

  deletePerson(id: number) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.peopleService.deletePerson(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
}