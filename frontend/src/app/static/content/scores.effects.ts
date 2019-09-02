import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Activity } from 'src/app/models/activity/activity';
import { ScoresActionTypes, LoadScores, ScoresError, UpdateScores } from './scores.actions';
import { User } from 'src/app/models/user/user';


@Injectable()
export class ScoresEffects {

  @Effect()
  loadScores$ = this.actions$
    .pipe(
      ofType<LoadScores>(ScoresActionTypes.LoadScores),
      mergeMap(async () => {
        const response = await this.afs.collection('users').ref.get()
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

            scores.sort((a,b) => {
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
        return new UpdateScores({scores: response});
      }),
      catchError((errorMessage) => of(new ScoresError({error: errorMessage})))
  );

  constructor(private actions$: Actions, public afs: AngularFirestore) {}

}
