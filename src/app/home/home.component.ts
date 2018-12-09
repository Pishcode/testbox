import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(
      private auth: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.auth.user;
  }

}
