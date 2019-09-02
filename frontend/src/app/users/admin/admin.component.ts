import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupModalData } from 'src/app/models/popup-modal-data/popup-modal-data';
import { PopupService } from 'src/app/services/popup/popup.service';
import { DatabaseService } from 'src/app/services/database/database.service';

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
    public router: Router,
    public popupService: PopupService,
    public databaseService: DatabaseService) { }

  ngOnInit() {
    this.selectUsers();
  }

  async selectUsers() {
    try {
      this.users = await this.databaseService.selectUsers();
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }
  }

  async saveUsers() {
    try {
      await this.databaseService.saveUsers(this.users);
    } catch (error) {
      this.errorPopup(error.message);
      return;
    }

    this.infoPopup('save successful');
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
