import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user/user';

export enum LoginActionTypes {
  LoadLogin = '[Login] Load Login',
  UpdateLogin = '[Login] Update Login',
  LoginError = '[Login] Login Error'
}

export class LoginAction implements Action {
  type: string;
  payload: {
    user: User,
    error: string
  };
}

export class LoadLogin implements Action {
  readonly type = LoginActionTypes.LoadLogin;

  constructor(readonly payload: {email: string, password: string}) {

  }
}

export class UpdateLogin implements Action {
  readonly type = LoginActionTypes.UpdateLogin;

  constructor(readonly payload: {user: User}) {

  }
}

export class LoginError implements Action {
  readonly type = LoginActionTypes.LoginError;

  constructor(readonly payload: {error: string}) {

  }
}

export type LoginActions = LoadLogin | UpdateLogin | LoginError;
