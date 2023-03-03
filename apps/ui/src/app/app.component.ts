import { Component } from '@angular/core';

@Component({
  selector: 'smart-uvr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}
