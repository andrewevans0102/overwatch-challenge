import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadActivity, ActivityError, ViewActivityActionTypes, UpdateActivity } from './view-activity.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database/database.service';


@Injectable()
export class ViewActivityEffects {

  @Effect()
  loadActivity$ = this.actions$
    .pipe(
      ofType<LoadActivity>(ViewActivityActionTypes.LoadActivity),
      mergeMap(async () => {
        try {
          const response = await this.databaseService.selectAllActivity();
          return new UpdateActivity({activity: response});
        } catch (error) {
          throw error;
        }
      }),
      catchError((errorMessage) => of(new ActivityError({error: errorMessage})))
  );

  constructor(private actions$: Actions, public databaseService: DatabaseService) {}

}
