import { Action } from '@ngrx/store';
import { Activity } from 'src/app/models/activity/activity';

export enum ViewActivityActionTypes {
  LoadActivity = '[ViewActivity] Load Activity',
  UpdateActivity = '[ViewActivity] Update Activity',
  ActivityError = '[ViewActivity] Activity Error'
}

export class ViewActivityAction implements Action {
  type: string;
  payload: {
    activity: Activity[],
    error: string
  };
}

export class LoadActivity implements Action {
  readonly type = ViewActivityActionTypes.LoadActivity;
}

export class UpdateActivity implements Action {
  readonly type = ViewActivityActionTypes.UpdateActivity;

  constructor(readonly payload: {activity: Activity[]}) {

  }
}

export class ActivityError implements Action {
  readonly type = ViewActivityActionTypes.ActivityError;

  constructor(readonly payload: {error: string}) {

  }
}

export type ViewActivityActions = LoadActivity | UpdateActivity | ActivityError;
