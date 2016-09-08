import * as ActionTypes from './constants';

const initialState = {
  tasks: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.BEGIN_TASK:
      return {
        tasks: state.tasks + 1
      };

    case ActionTypes.END_TASK:
      return {
        tasks: state.tasks - 1
      };

    default:
      return state;
  }
}
