import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  selectedActivity: string;
  createForm = new FormGroup({
    activity: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl(''),
    points: new FormControl('')
  });
  firstName: string;
  lastName: string;
  score: number;
  admin: boolean;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.selectUser(user.uid);
      }
    });
  }

  async selectUser(uid: string) {
    await this.afs.collection('users').ref.doc(uid).get()
      .then((documentSnapshot) => {
        this.firstName = documentSnapshot.data().firstName;
        this.lastName = documentSnapshot.data().lastName;
        this.score = documentSnapshot.data().score;
        this.admin = documentSnapshot.data().admin;
      })
      .catch((error) => {
        return this.errorPopup(error.message);
      });
  }

  async createActivity() {
    const idSaved = this.afs.createId();
    const savedActivity = {
      firstName: this.firstName,
      lastName: this.lastName,
      uid: this.afAuth.auth.currentUser.uid,
      activity: this.createForm.controls.activity.value,
      description: this.createForm.controls.description.value,
      link: this.createForm.controls.link.value,
      points: this.createForm.controls.points.value,
      id: idSaved
    };

    // save to the activity table for display
    await this.afs.collection('teamActivity').doc(idSaved).set(savedActivity)
      .catch((error) => {
        return this.errorPopup(error.message);
      });

    // update the score in the users table
    this.score = this.score + parseInt(this.createForm.controls.points.value, 10);
    const userUpdate = {
      uid: this.afAuth.auth.currentUser.uid,
      firstName: this.firstName,
      lastName: this.lastName,
      score: this.score,
      admin: this.admin
    };
    await this.afs.collection('users').doc(this.afAuth.auth.currentUser.uid).set(userUpdate)
      .catch((error) => {
        return this.errorPopup(error.message);
      });

    this.router.navigateByUrl('/content');
  }

  cancel() {
    this.router.navigateByUrl('/content');
  }

  errorPopup(message: string) {
    const popupModalData = {
      warn: message,
      info: null
    };
    return this.popupService.openDialog(popupModalData);
  }
}
