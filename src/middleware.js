import * as ActionTypes from './constants';
import { beginTask, endTask } from './actions';

const nprogressMetaKey = '__nprogress__';

const isNProgressAction = (type, fulfilled, rejected) => {
  return (
    type === fulfilled || type === rejected
  );
};

export default () => {
  return ({ dispatch }) => (
    next => action => {
      const { type, nprogress, meta } = action;

      if (nprogress) {
        dispatch(beginTask());

        return next({
          ...action,
          meta: {
            ...action.meta,
            [nprogressMetaKey]: nprogress
          }
        });
      }

      if (meta && meta[nprogressMetaKey]) {
        const [ FULFILLED, REJECTED ] = meta[nprogressMetaKey];

        if (isNProgressAction(type, FULFILLED, REJECTED)) {
          const {
            meta: { __nprogress__, ...metaProps },
            ...actionProps
          } = action;

          const hasMeta = Object.keys(metaProps).length > 0;

          dispatch(endTask());

          return next({
            ...actionProps,
            ...(hasMeta ? { meta: metaProps } : {})
          });
        }

        return next(action);
      }

      return next(action);
    }
  );
};
