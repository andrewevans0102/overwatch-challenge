import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { PopupService } from 'src/app/services/popup/popup.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/models/user/user';
import { Activity } from 'src/app/models/activity/activity';

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
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    public databaseService: DatabaseService) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.selectUser(user.uid);
      }
    });
  }

  async selectUser(uid: string) {
    try {
      this.user = await this.databaseService.selectUser(uid);
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }
  }

  async createActivity() {
    // this could potentially become an enum later
    let aPoints = 0;
    switch (this.createForm.controls.activity.value) {
      case 'Read Article':
        aPoints = 10;
        break;
      case 'Wrote Blog Post':
        aPoints = 50;
        break;
      case 'Listened to Podcast':
        aPoints = 10;
        break;
      case 'Watched Video':
        aPoints = 10;
        break;
      case 'Attended Lecture':
        aPoints = 20;
        break;
      case 'Built Hello World App':
        aPoints = 50;
        break;
      case 'Resolved Production Issue':
        aPoints = 50;
        break;
      case 'Attended Meetup':
        aPoints = 20;
        break;
      default:
        aPoints = 0;
    }

    const activity: Activity = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      uid: this.afAuth.auth.currentUser.uid,
      activity: this.createForm.controls.activity.value,
      description: this.createForm.controls.description.value,
      link: this.createForm.controls.link.value,
      points: aPoints,
      id: '',
      cleared: false,
      recorded: Date.now()
    };

    try {
      await this.databaseService.saveActivity(activity, this.user);
      this.infoPopup('activity was created successfully!');
      this.router.navigateByUrl('/content');
    } catch (error) {
      throw error;
    }
  }

  cancel() {
    this.router.navigateByUrl('/content');
  }

  infoPopup(message: string) {
    const popupModalData: PopupModalData = {
      warn: null,
      info: message
    };
    return this.popupService.openDialog(popupModalData);
  }

  errorPopup(message: string) {
    const popupModalData = {
      warn: message,
      info: null
    };
    return this.popupService.openDialog(popupModalData);
  }
}
