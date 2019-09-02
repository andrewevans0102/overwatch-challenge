import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadActivity, ActivityError, ViewActivityActionTypes, UpdateActivity } from './view-activity.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class ViewActivityEffects {

  @Effect()
  loadActivity$ = this.actions$
    .pipe(
      ofType<LoadActivity>(ViewActivityActionTypes.LoadActivity),
      mergeMap(async () => {
        const response = await this.afs.collection('activity').ref.get()
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
        return new UpdateActivity({activity: response});
      }),
      catchError((errorMessage) => of(new ActivityError({error: errorMessage})))
  );

  constructor(private actions$: Actions, public afs: AngularFirestore) {}

}
