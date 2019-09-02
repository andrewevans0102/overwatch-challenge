import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { selectViewActivity, AppState, selectActivityError } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/models/user/user';
import { LoadActivity } from './view-activity.actions';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {

  activity$: Observable<any[]>;
  error$: Observable<string>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.activity$ = this.store.pipe(select(selectViewActivity));
    this.error$ = this.store.pipe(select(selectActivityError));
  }

  async deleteItem(activity: any) {
    await this.afs.collection('activity').doc(activity.id).delete()
      .catch((error) => {
        this.errorPopup(error.message);
        return;
      });

    let user = new User();
    await this.afs.collection('users').ref.doc(this.afAuth.auth.currentUser.uid).get()
      .then(async (dS) => {
        user = {
          uid: dS.data().uid,
          firstName: dS.data().firstName,
          lastName: dS.data().lastName,
          score: dS.data().score,
          admin: dS.data().admin
        };

        user.score = user.score - parseInt(activity.points, 10);
    })
    .catch((error) => {
      this.errorPopup(error.message);
      return;
    });

    await this.afs.collection('users').doc(user.uid).set(user)
    .catch((error) => {
      this.errorPopup(error.message);
      return;
    });

    this.store.dispatch(new LoadActivity());
    this.infoPopup('activity was deleted successfully');
  }

  goBack() {
    this.router.navigateByUrl('/content');
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
