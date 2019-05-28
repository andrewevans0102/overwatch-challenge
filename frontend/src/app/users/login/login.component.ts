import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  @Output() cancelButton = new EventEmitter<boolean>();
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  async login() {
    await this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.controls.email.value,
      this.loginForm.controls.password.value)
      .catch((error) => {
        return alert(error);
      });

    this.router.navigateByUrl('/content');
  }

  getEmailErrorMessage() {
    return this.loginForm.controls.email.hasError('required') ? 'You must enter a value' :
        this.loginForm.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  cancel() {
    this.cancelButton.emit(true);
    this.router.navigateByUrl('/home');
  }

}
