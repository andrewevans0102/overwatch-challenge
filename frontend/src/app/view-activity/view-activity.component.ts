import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {

  teamActivity: Observable<any[]>;
  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.selectActivity();
  }

  selectActivity() {
    this.teamActivity = this.afs.collection('teamActivity').valueChanges();
  }

  // async is not necessary here, but using it to control event loop
  async deleteItem(activity: any) {
    await this.afs.collection('teamActivity').doc(activity.id).delete()
      .catch((error) => { alert(error); });

    alert('activity was deleted successfully');
  }

  goBack() {
    this.router.navigateByUrl('/content');
  }

}
