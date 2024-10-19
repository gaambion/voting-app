import { Component } from '@angular/core';
import { NomineesComponent } from './nominees/nominees.component';

@Component({
  selector: 'app-root',
  standalone: true, // standalone component
  templateUrl: './app.component.html',
  imports: [NomineesComponent] // Import the NomineesComponent directly
})
export class AppComponent {
  title = 'voting-app-angular20';
}
