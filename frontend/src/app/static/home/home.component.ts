import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public router: Router) {

   }

  createUser() {
    this.router.navigateByUrl('/create-user');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  content() {
    this.router.navigateByUrl('/content');
  }

}
