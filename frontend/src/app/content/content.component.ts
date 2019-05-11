import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  activityDisplay = [];
  firstName: string;
  lastName: string;
  scores = [];
  admin: boolean;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.selectUser(user.uid);
      }
    });

    this.selectScores();
  }

  // TODO move this to a service class
  async selectUser(uid: string) {
    await this.afs.collection('users').ref.doc(uid).get()
      .then((documentSnapshot) => {
        this.firstName = documentSnapshot.data().firstName;
        this.lastName = documentSnapshot.data().lastName;
        this.admin = documentSnapshot.data().admin;
      })
      .catch((error) => {
        return alert(error);
      });
  }

  createActivity() {
    this.router.navigateByUrl('/create-activity');
  }

  viewActivity() {
    console.log(this.admin);
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
      alert(signOut);
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  async selectScores() {
    this.scores = [];
    await this.afs.collection('users').ref.get()
      .then((querySnapshot) => {
        // select users
        querySnapshot.forEach((doc) => {
          const userScore = {
            place: 0,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            score: doc.data().score
          };
          this.scores.push(userScore);
        });

        this.scores.sort(this.compare);
        let place = 1;
        let i = 0;
        for (i = 0; i < this.scores.length; i++) {
          this.scores[i].place = place;
          place = place + 1;
        }
      })
      .catch((error) => {
        return alert(error);
      });
  }

  // wrote custom compare operator to sort score values
  compare( a, b ) {
    // if ( a.score < b.score ) {
    //   return -1;
    // }
    // if ( a.score > b.score ) {
    //   return 1;
    // }
    // sort descending
    if ( a.score < b.score ) {
      return 1;
    }
    if ( a.score > b.score ) {
      return -1;
    }
    return 0;
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
    await this.afs.collection<any>('highScores').doc(idSaved).set(saveScores)
    .catch((error) => {
      return alert(error);
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
      return alert(error);
    });

    // loop through array and make all users score 0 formally
    for (         const user of users) {
      await this.afs.collection<any>('users').doc(user.uid).set(user)
      .catch((error) => {
        return alert(error);
      });
    }

    // select users again for display
    this.selectScores();
  }

}
