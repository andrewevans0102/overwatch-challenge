import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ViewActivityAction, ViewActivityActionTypes } from '../activity/view-activity/view-activity.actions';
import { Activity } from '../models/activity/activity';
import { User } from '../models/user/user';
import { LoginAction, LoginActionTypes } from '../users/login/login.actions';
import { ScoresAction, ScoresActionTypes } from '../static/content/scores.actions';

export interface ViewActivityState {
  activity: Activity[] | null;
  error: string | null;
}

const initialActivityState: ViewActivityState = {
  activity: [],
  error: null
};

export interface LoginState {
  user: User | null;
  error: string | null;
}

const initialLoginState: LoginState = {
  user: null,
  error: null
};

export interface ScoresState {
  userScores: User[] | null;
  error: string | null;
}

const initialScoresState: ScoresState = {
  userScores: [],
  error: null
};

export interface AppState {
  viewActivity: ViewActivityState,
  login: LoginState,
  scores: ScoresState
}

export function viewActivityReducer(state: ViewActivityState = initialActivityState, action: ViewActivityAction): ViewActivityState {
  switch (action.type) {
    case ViewActivityActionTypes.LoadActivity:
      return {
        activity: null,
        error: null
      };

    case ViewActivityActionTypes.UpdateActivity:
      return {
        activity: action.payload.activity,
        error: null
      };

    case ViewActivityActionTypes.ActivityError:
      return {
        activity: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export function loginReducer(state: LoginState = initialLoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case LoginActionTypes.LoadLogin:
      return {
        user: null,
        error: null
      };

    case LoginActionTypes.UpdateLogin:
      return {
        user: action.payload.user,
        error: null
      };

    case LoginActionTypes.LoginError:
      return {
        user: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export function scoresReducer(state: ScoresState = initialScoresState, action: ScoresAction): ScoresState {
  switch (action.type) {
    case ScoresActionTypes.LoadScores:
      return {
        userScores: null,
        error: null
      };

    case ScoresActionTypes.UpdateScores:
      return {
        userScores: action.payload.scores,
        error: null
      };

    case ScoresActionTypes.ScoresError:
      return {
        userScores: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  viewActivity: viewActivityReducer,
  login: loginReducer,
  scores: scoresReducer
};

export const selectViewActivity = (state: AppState) => state.viewActivity.activity;
export const selectActivityError = (state: AppState) => state.viewActivity.error;

export const selectLogin = (state: AppState) => state.login.user;
export const selectLoginError = (state: AppState) => state.login.error;

export const selectScores = (state: AppState) => state.scores.userScores;
export const selectScoresError = (state: AppState) => state.scores.error;

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
