import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { Store, select } from '@ngrx/store';
import { LoadActivity } from 'src/app/activity/view-activity/view-activity.actions';
import { AppState, selectLoginError, selectLogin, selectScoresError } from 'src/app/reducers';
import { Subject, Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { takeUntil, catchError } from 'rxjs/operators';
import { LoadScores } from './scores.actions';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  scores = [];
  user$ = new Observable<User>();
  loginError$ = new Observable<string>();
  scoresError$ = new Observable<string>();
  unsubscribe = new Subject();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectLogin));
    this.loginError$ = this.store.pipe(select(selectLoginError));

    this.store.pipe(
      takeUntil(this.unsubscribe),
      catchError((error) => {
        throw error;
      }))
      .subscribe(state => this.scores = state.scores.userScores);
    this.scoresError$ = this.store.pipe(select(selectScoresError));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
      return this.errorPopup(signOut.message);
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  async clearScores() {
    // save off top three scores
    const d = new Date();
    const saveScores = {
      scoreTitle: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
      firstPlace: this.scores[0],
      secondPlace: this.scores[1],
      thirdPlace: this.scores[2]
    };
    const idSaved = this.afs.createId();
    await this.afs.collection('highScores').doc(idSaved).set(saveScores)
    .catch((error) => {
      return this.errorPopup(error.message);
    });

    // create array of users to be updated with score of 0 here
    const users = [];
    await this.afs.collection('users').ref.get()
      .then((querySnapshot) => {
        // select users
        querySnapshot.forEach((doc) => {
          const userItem = {
            uid: doc.id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            score: 0,
            admin: doc.data().admin
          };
          users.push(userItem);
        });
      })
    .catch((error) => {
      return this.errorPopup(error.message);
    });
    // loop through array and make all users score 0 formally
    for (const user of users) {
      await this.afs.collection('users').doc(user.uid).set(user)
      .catch((error) => {
        return this.errorPopup(error.message);
      });
    }

    // clear all activities in the database
    const activity = [];
    await this.afs.collection('activity').ref.get()
      .then((querySnapshot) => {
        // select users
        querySnapshot.forEach((doc) => {
          const activityItem = {
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            uid: doc.data().uid,
            activity: doc.data().activity,
            description: doc.data().description,
            link: doc.data().link,
            points: doc.data().points,
            id: doc.data().id,
            cleared: doc.data().cleared,
            recorded: doc.data().recorded
          };
          activity.push(activityItem);
        });
      })
    .catch((error) => {
      return this.errorPopup(error.message);
    });
    // loop through array and clear all activity items
    for (const a of activity) {
      a.cleared = true;
      await this.afs.collection('activity').doc(a.id).set(a)
      .catch((error) => {
        this.errorPopup(error.message);
        return;
      });
    }

    this.store.dispatch(new LoadScores());
  }

  errorPopup(message: string) {
    const popupModalData = {
      warn: message,
      info: null
    };
    return this.popupService.openDialog(popupModalData);
  }

}
