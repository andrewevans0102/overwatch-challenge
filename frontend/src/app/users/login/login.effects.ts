import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginActionTypes, LoadLogin, LoginError, UpdateLogin } from './login.actions';
import { of, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user/user';
import { LoadScores, ScoresActionTypes, ScoresError } from 'src/app/static/content/scores.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Injectable()
export class LoginEffects {

  @Effect()
  loadLogin$ = this.actions$
    .pipe(
      ofType<LoadLogin>(LoginActionTypes.LoadLogin),
      mergeMap(async (action: LoadLogin) => {
        console.log(action.payload);
        const signIn = await this.afAuth.auth.signInWithEmailAndPassword(action.payload.email,
          action.payload.password)
          .catch((error) => {
            throw error;
          });
        console.log(signIn);

        const user = new User();
        await this.afs.collection('users').ref.doc(signIn.user.uid).get()
          .then((documentSnapshot) => {
            user.uid = signIn.user.uid,
            user.firstName = documentSnapshot.data().firstName;
            user.lastName = documentSnapshot.data().lastName;
            user.score = documentSnapshot.data().score;
            user.admin = documentSnapshot.data().admin;
          })
          .catch((error) => {
            throw error;
          });
        this.store.dispatch(new LoadScores());
        return new UpdateLogin({user});
      }),
      catchError((errorMessage) => of(new LoginError({error: errorMessage})))
  );

  constructor(
    private actions$: Actions,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private store: Store<AppState>
    ) {}

}
