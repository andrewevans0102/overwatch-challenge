import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user';
import { Activity } from 'src/app/models/activity/activity';
import { HighScore } from 'src/app/models/high-score/high-score';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public afs: AngularFirestore) { }

  /**
   * creates user in firestore database
   * @param user, user to be created
   */
  async addUser(user: User) {
    await this.afs.collection('users').doc(user.uid).set(user)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * retrieves user from firestore database
   * @param uid, uid of user to be retrieved, the auth module uses the uid field as a key for identity management
   */
  async selectUser(uid: string) {
    return await this.afs.collection('users').ref.doc(uid).get()
      .then((documentSnapshot) => {
        const user = new User();
        user.uid = documentSnapshot.data().uid,
        user.firstName = documentSnapshot.data().firstName;
        user.lastName = documentSnapshot.data().lastName;
        user.score = documentSnapshot.data().score;
        user.admin = documentSnapshot.data().admin;
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * retrieves all users from the firestore database
   */
  async selectUsers() {
    return await this.afs.collection('users').ref.get()
      .then((querySnapshot) => {
        // select users
        const users = [];
        querySnapshot.forEach((doc) => {
          const user = {
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            score: doc.data().score,
            admin: doc.data().admin,
            uid: doc.data().uid
          };
          users.push(user);
        });
        return users;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * saves an array of users to the firestore dataabse
   * @param users, array of user objects to be saved
   */
  async saveUsers(users: User[]) {
    for (const user of users) {
      await this.afs.collection('users').doc(user.uid).set(user)
        .catch((error) => {
          throw error;
        });
    }
  }

  /**
   * Deletes an activity from the firestore database
   * Also lowers the score of the user that made the deletion
   * @param activity, activity to be saved
   * @param uid, uid of user that made the delete
   */
  async deleteActivity(activity: Activity, uid: string) {
    await this.afs.collection('activity').doc(activity.id).delete()
      .catch((error) => {
        throw error;
      });

    let user = new User();
    await this.afs.collection('users').ref.doc(uid).get()
      .then(async (dS) => {
        user = {
          uid: dS.data().uid,
          firstName: dS.data().firstName,
          lastName: dS.data().lastName,
          score: dS.data().score,
          admin: dS.data().admin
        };

        user.score = user.score - activity.points;
    })
    .catch((error) => {
      throw error;
    });

    await this.afs.collection('users').doc(user.uid).set(user)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Saves activity to firestore database
   * Also increases score and updates users database for individual that is saving the activity
   * @param activity, activity to be saved
   * @param user, user that is saving the activity and whose score will be increased
   */
  async saveActivity(activity: Activity, user: User) {
    // save to the activity table for display
    activity.id = this.afs.createId();
    await this.afs.collection('activity').doc(activity.id).set(activity)
      .catch((error) => {
        throw error;
      });

    // update the score in the users table
    const savedUser = {
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      score: user.score + activity.points,
      admin: user.admin
    };
    await this.afs.collection('users').doc(user.uid).set(savedUser)
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Retrieves all activity values from the firestore database
   */
  async selectAllActivity() {
    return await this.afs.collection('activity').ref.get()
      .then((querySnapshot) => {
        const selectedActivity = [];
        querySnapshot.forEach((doc) => {
          const activity = {
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
          selectedActivity.push(activity);
        });
        selectedActivity.sort((a, b) => {
          return b.recorded - a.recorded;
        });
        return selectedActivity;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Selects all users from the firestore datbase with score values formatted and an additional place field
   * The place field is used by the content page to determine the dispaly order
   */
  async selectScores() {
    return await this.afs.collection('users').ref.get()
      .then((querySnapshot) => {
        // select users
        const scores = [];
        querySnapshot.forEach((doc) => {
          const userScore = {
            place: 0,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            score: doc.data().score
          };
          scores.push(userScore);
        });

        scores.sort((a: User, b: User) => {
          // sort descending
          if ( a.score < b.score ) {
            return 1;
          }
          if ( a.score > b.score ) {
            return -1;
          }
          return 0;
        });
        let place = 1;
        let i = 0;
        for (i = 0; i < scores.length; i++) {
          scores[i].place = place;
          place = place + 1;
        }
        return scores;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Saves the high scores to the firestore database
   * Clears the scores of all users
   * Clears all activities so they cannot be deleted after the save is complete
   * @param scores, scores that are to be cleared
   */
  async clearScores(scores: User[]) {
    // save off top three scores
    const d = new Date();
    const saveScores = {
      scoreTitle: d.toLocaleDateString() + ' ' + d.toLocaleTimeString(),
      firstPlace: scores[0],
      secondPlace: scores[1],
      thirdPlace: scores[2],
      recorded: Date.now()
    };
    const idSaved = this.afs.createId();
    await this.afs.collection('highScores').doc(idSaved).set(saveScores)
      .catch((error) => {
        throw error;
      });

    const users = await this.selectUsers()
      .catch((error) => {
        throw error;
      });

    // loop through array and make all users score 0 formally
    for (const user of users) {
      user.score = 0;
      await this.afs.collection('users').doc(user.uid).set(user)
        .catch((error) => {
          throw error;
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
      throw error;
    });

    // loop through array and clear all activity items
    for (const a of activity) {
      a.cleared = true;
      await this.afs.collection('activity').doc(a.id).set(a)
        .catch((error) => {
          throw error;
        });
    }
  }

  /**
   * Retrieves all the high scores from the firestore database
   */
  async selectHighScores() {
    return await this.afs.collection('highScores').ref.get()
      .then((querySnapshot) => {
        const scores = [];
        querySnapshot.forEach((doc) => {
          const highScore = {
            scoreTitle: doc.data().scoreTitle,
            firstPlace: doc.data().firstPlace,
            secondPlace: doc.data().secondPlace,
            thirdPlace: doc.data().thirdPlace,
            recorded: doc.data().recorded
          };
          scores.push(highScore);
        });

        scores.sort((a: HighScore, b: HighScore) => {
          return b.recorded - a.recorded;
        });
        return scores;
      })
      .catch((error) => {
        throw error;
      });
  }
}
