import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user/user';

export enum ScoresActionTypes {
  LoadScores = '[Content] Load Scores',
  UpdateScores = '[Content] Update Scores',
  ScoresError = '[Content] Scores Error'
}

export class ScoresAction implements Action {
  type: string;
  payload: {
    scores: User[],
    error: string
  };
}

export class LoadScores implements Action {
  readonly type = ScoresActionTypes.LoadScores;
}

export class UpdateScores implements Action {
  readonly type = ScoresActionTypes.UpdateScores;

  constructor(readonly payload: {scores: User[]}) {

  }
}

export class ScoresError implements Action {
  readonly type = ScoresActionTypes.ScoresError;

  constructor(readonly payload: {error: string}) {

  }
}

export type ViewActivityActions = LoadScores | UpdateScores | ScoresError;
