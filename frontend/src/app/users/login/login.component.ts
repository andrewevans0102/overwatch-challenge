import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PopupService } from 'src/app/services/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { LoadLogin } from './login.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LoadScores } from 'src/app/static/content/scores.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    private store: Store<AppState>) { }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.controls.email.value);
    console.log(this.loginForm.controls.password.value);
    this.store.dispatch(new LoadLogin(
      {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
    ));
    this.store.dispatch(new LoadScores());
    this.router.navigateByUrl('/content');
  }

  getEmailErrorMessage() {
    return this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
        this.loginForm.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }

  errorPopup(message: string) {
    const popupModalData = {
      warn: message,
      info: null
    };
    return this.popupService.openDialog(popupModalData);
  }
}
