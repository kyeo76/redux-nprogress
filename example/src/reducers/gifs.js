import * as ActionTypes from 'constants/gifs';

const initialState = {
  list: [],
  loading: false
};

const handlers = {
  [`${ActionTypes.GET_RANDOM_GIF}_PENDING`]: (action, state) => {
    return {
      ...state,
      loading: true
    };
  },

  [`${ActionTypes.GET_RANDOM_GIF}_FULFILLED`]: ({ payload }, state) => {
    return {
      ...state,
      list: [ payload.data, ...state.list ],
      loading: false
    };
  },

  [`${ActionTypes.GET_RANDOM_GIF}_REJECTED`]: (action, state) => {
    return {
      ...state,
      loading: false
    };
  },

  [ActionTypes.RESET]: () => initialState
};

export default function reducer(state = initialState, action) {
  if (!handlers[action.type]) {
    return state;
  }

  return handlers[action.type](action, state);
}
