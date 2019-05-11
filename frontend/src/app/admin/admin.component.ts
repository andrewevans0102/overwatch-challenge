import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) { }

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
        return alert(error);
      });
  }

  async saveUsers() {
    for (const user of this.users) {
      await this.afs.collection<any>('users').doc(user.uid).set(user)
      .catch((error) => {
        return alert(error);
      });
    }
  }

  changeAdmin(user) {
    user.admin = !user.admin;
  }

  cancel() {
    this.router.navigateByUrl('/content');
  }

}
