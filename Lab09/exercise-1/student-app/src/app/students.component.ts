import { Component } from '@angular/core';

@Component({
  selector: 'students',
  standalone: false,
  template: `
    <section>
      <h1>{{ getTitle() }}</h1>
      <p>Current Date: {{ getCurrentDate() }}</p>
    </section>
  `,
})
export class StudentsComponent {
  title = 'Students Component';

  getTitle(): string {
    return this.title;
  }

  getCurrentDate(): string {
    return new Date().toLocaleString();
  }
}
