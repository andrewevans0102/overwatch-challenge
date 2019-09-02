import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {

  teamActivity: Observable<any[]>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public popupService: PopupService) { }

  ngOnInit() {
    this.selectActivity();
  }

  selectActivity() {
    this.teamActivity = this.afs.collection('activity').valueChanges();
  }

  async deleteItem(activity: any) {
    await this.afs.collection('activity').doc(activity.id).delete()
      .catch((error) => {
        this.errorPopup(error.message);
        return;
      });

    await this.afs.collection('users').ref.doc(this.afAuth.auth.currentUser.uid).get()
      .then(async (dS) => {
        const user = {
          uid: dS.data().uid,
          firstName: dS.data().firstName,
          lastName: dS.data().lastName,
          score: dS.data().score,
          admin: dS.data().admin
        };

        user.score = user.score - parseInt(activity.points, 10);

        await this.afs.collection('users').doc(user.uid).set(user)
          .catch((error) => {
            this.errorPopup(error.message);
            return;
          });
    })
    .catch((error) => {
      this.errorPopup(error.message);
      return;
    });

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
