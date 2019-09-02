import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  hidePassword = true;
  createForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  popupModalData: PopupModalData;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    public databaseService: DatabaseService) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.createForm.controls.email.hasError('required') ? 'You must enter a value' :
        this.createForm.controls.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  async createUser() {
    // create user with authentication service
    // on success this will also sign in this user to the current session
    await this.afAuth.auth.createUserWithEmailAndPassword(
      this.createForm.controls.email.value,
      this.createForm.controls.password.value)
        .catch((error => {
          this.errorPopup(error.message);
          return;
        }));

      // save the user and the names to the users table for reference
      // since the user is already signed in its ok to us the currentUser uid value here
    const user: User = {
      uid: this.afAuth.auth.currentUser.uid,
      firstName: this.createForm.controls.firstName.value,
      lastName: this.createForm.controls.lastName.value,
      score: 0,
      admin: false
    };
    try {
      await this.databaseService.addUser(user);
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }

    this.infoPopup('You\'ve been successfully registered!  You\'ll be logged in now');
    this.router.navigateByUrl('/content');
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

  infoPopup(message: string) {
    const popupModalData: PopupModalData = {
      warn: null,
      info: message
    };
    return this.popupService.openDialog(popupModalData);
  }

}
