import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { PopupService } from 'src/app/services/popup.service';
import { selectViewActivity, AppState, selectActivityError, selectLoginError } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UpdateLogin } from 'src/app/users/login/login.actions';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit, OnDestroy {

  selectedActivity: string;
  createForm = new FormGroup({
    activity: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl(''),
    points: new FormControl('')
  });
  user = new User();
  error$ = new Observable<string>();
  unsubscribe = new Subject();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(
      takeUntil(this.unsubscribe),
      catchError((error) => {
        throw error;
      }))
      .subscribe(state => this.user = state.login.user);

    this.error$ = this.store.pipe(select(selectLoginError));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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

    const idSaved = this.afs.createId();
    console.log(this.user);
    const savedActivity = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      uid: this.user.uid,
      activity: this.createForm.controls.activity.value,
      description: this.createForm.controls.description.value,
      link: this.createForm.controls.link.value,
      points: aPoints,
      id: idSaved,
      cleared: false,
      recorded: Date.now()
    };

    // save to the activity table for display
    await this.afs.collection('activity').doc(idSaved).set(savedActivity)
      .catch((error) => {
        return this.errorPopup(error.message);
      });

    // update the score in the users table
    const userUpdate = {
      admin: this.user.admin,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      score: this.user.score + aPoints,
      uid: this.user.uid
    };
    await this.afs.collection('users').doc(this.user.uid).set(userUpdate)
      .catch((error) => {
        this.errorPopup(error.message);
        return;
      });
    this.store.dispatch(new UpdateLogin({user: userUpdate}));
    this.infoPopup('activity was created successfully');
    this.router.navigateByUrl('/content');
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
