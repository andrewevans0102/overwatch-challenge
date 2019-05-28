import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

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
