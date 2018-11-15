import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  navOpened = true;
  isLoggedIn: boolean;
  title = 'Pishcode';
}
