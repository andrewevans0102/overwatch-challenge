import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [];
  adminForm = new FormGroup({
    admin: new FormControl('')
  });

  constructor(
    public afs: AngularFirestore,
    public router: Router,
    public popupService: PopupService) { }

  ngOnInit() {
    this.selectUsers();
  }

  async selectUsers() {
    this.users = [];
    await this.afs.collection('users').ref.get()
      .then((querySnapshot) => {
        // select users
        querySnapshot.forEach((doc) => {
          const user = {
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            score: doc.data().score,
            admin: doc.data().admin,
            uid: doc.data().uid
          };
          this.users.push(user);
        });
      })
      .catch((error) => {
        return this.errorPopup(error.message);
      });
  }

  async saveUsers() {
    for (const user of this.users) {
      console.log(user);
      await this.afs.collection('users').doc(user.uid).set(user)
      .catch((error) => {
        return this.errorPopup(error.message);
      });
    }
  }

  changeAdmin(user) {
    user.admin = !user.admin;
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
