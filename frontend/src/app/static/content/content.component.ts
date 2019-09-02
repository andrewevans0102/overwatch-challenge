import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { PopupService } from 'src/app/services/popup/popup.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LoadActivity } from 'src/app/activity/view-activity/view-activity.actions';
import { User } from 'src/app/models/user/user';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  scores = [];
  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    private store: Store<AppState>,
    public databaseService: DatabaseService) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.selectUser(user.uid);
      }
    });

    this.selectScores();
  }

  async selectUser(uid: string) {
    try {
      this.user = await this.databaseService.selectUser(uid);
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }
  }

  async selectScores() {
    try {
      this.scores = await this.databaseService.selectScores();
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }
  }

  createActivity() {
    this.router.navigateByUrl('/create-activity');
  }

  viewActivity() {
    this.store.dispatch(new LoadActivity());
    this.router.navigateByUrl('/view-activity');
  }

  viewHighScores() {
    this.router.navigateByUrl('/view-scores');
  }

  viewAdmin() {
    this.router.navigateByUrl('/admin');
  }

  async logout() {
    const signOut = await this.afAuth.auth.signOut()
      .catch(() => new Error('Error when signing out'));

    if ( signOut instanceof Error ) {
      this.errorPopup(signOut.message);
      return;
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  async clearScores() {
    await this.databaseService.clearScores(this.scores);

    // select users again for display
    this.selectScores();
  }

  errorPopup(message: string) {
    const popupModalData = {
      warn: message,
      info: null
    };
    return this.popupService.openDialog(popupModalData);
  }

}
