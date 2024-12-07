import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { PeopleListComponent } from './app/components/people-list/people-list.component';
import { PersonFormComponent } from './app/components/person-form/person-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="app-container">
      <nav>
        <a routerLink="/people">People List</a>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    nav {
      padding: 1rem;
      background: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
    }
    nav a {
      color: #333;
      text-decoration: none;
      font-weight: bold;
    }
    main {
      flex: 1;
      padding: 20px;
    }
  `]
})
export class App {}

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PersonFormComponent },
  { path: 'people/edit/:id', component: PersonFormComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));