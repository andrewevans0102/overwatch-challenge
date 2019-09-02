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

export interface ViewActivityState {
  activity: Activity[] | null;
  error: string | null;
}

const initialActivityState: ViewActivityState = {
  activity: [],
  error: null
};

export interface AppState {
  viewActivity: ViewActivityState
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

export const reducers: ActionReducerMap<AppState> = {
  viewActivity: viewActivityReducer
};

export const selectViewActivity = (state: AppState) => state.viewActivity.activity;

export const selectActivityError = (state: AppState) => state.viewActivity.error;

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
