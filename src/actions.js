import * as ActionTypes from './constants';

export function beginTask() {
  return {
    type: ActionTypes.BEGIN_TASK
  };
}

export function endTask() {
  return {
    type: ActionTypes.END_TASK
  };
}
