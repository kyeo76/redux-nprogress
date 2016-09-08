import 'whatwg-fetch';
import * as ActionTypes from 'constants/gifs';

export function getRandomGif() {
  return {
    type: ActionTypes.GET_RANDOM_GIF,
    nprogress: [
      ActionTypes.GET_RANDOM_GIF_FULFILLED,
      ActionTypes.GET_RANDOM_GIF_REJECTED
    ],
    payload: fetch('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').then(res => res.json())
  }
}

export function loadMultipleGifs(n = 1) {
  return (dispatch) => {
    const promises = [...new Array(n)].map(() => dispatch(getRandomGif()));

    return dispatch({
      type: ActionTypes.LOAD_MULTIPLE_GIFS,
      nprogress: [
        ActionTypes.LOAD_MULTIPLE_GIFS_FULFILLED,
        ActionTypes.LOAD_MULTIPLE_GIFS_REJECTED
      ],
      payload: Promise.all(promises)
    });
  };
}

export function reset() {
  return {
    type: ActionTypes.RESET
  };
}
