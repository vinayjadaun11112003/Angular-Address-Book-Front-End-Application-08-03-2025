import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {PersonDetailsComponent} from "../app/person-details/person-details.component"
@Component({
  selector: 'app-root',
  // imports: [RouterOutlet,PersonDetailsComponent],
  imports: [PersonDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'person-details-app';
}


