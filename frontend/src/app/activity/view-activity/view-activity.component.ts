import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { selectViewActivity, AppState, selectActivityError } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/models/user/user';
import { LoadActivity } from './view-activity.actions';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {

  activity$: Observable<any[]>;
  error$: Observable<string>;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService,
    private store: Store<AppState>,
    public databaseService: DatabaseService) { }

  ngOnInit() {
    this.activity$ = this.store.pipe(select(selectViewActivity));
    this.error$ = this.store.pipe(select(selectActivityError));
  }

  async deleteItem(activity: any) {
    try {
      await this.databaseService.deleteActivity(activity, this.afAuth.auth.currentUser.uid);
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }

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
