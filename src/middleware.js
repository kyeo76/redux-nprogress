import * as ActionTypes from './constants';
import { beginTask, endTask } from './actions';
import isArray from './isArray';

const nprogressMetaKey = '__nprogress__';

const resultActionTypeSuffixes = ['FULFILLED', 'REJECTED'];

const isNProgressResultAction = (type, fulfilled, rejected) => {
  return (
    type === fulfilled || type === rejected
  );
};

const getNProgressMeta = (type, nprogress, configSuffixes) => {
  if (isArray(nprogress)) {
    return nprogress;
  }

  const suffixes = nprogress.resultActionTypeSuffixes || configSuffixes;

  return suffixes.map(suffix => `${type}_${suffix}`);
};

const isNProgressMetaAction = ({ type, meta }) => {
  return (
    meta &&
    meta[nprogressMetaKey] &&
    isNProgressResultAction(type, ...meta[nprogressMetaKey])
  );
};

const isNProgressAction = ({ nprogress, ...rest }) => {
  return nprogress || isNProgressMetaAction(rest);
};

export default (config = {}) => {
  const suffixes = config.resultActionTypeSuffixes || resultActionTypeSuffixes;

  return ({ dispatch }) => (
    next => action => {
      const { type, meta } = action;

      if (!isNProgressAction(action)) {
        return next(action);
      }

      if (action.nprogress) {
        const { nprogress, ...actionProps } = action;

        dispatch(beginTask());

        return next({
          ...actionProps,
          meta: {
            ...meta,
            [nprogressMetaKey]: getNProgressMeta(type, nprogress, suffixes)
          }
        });
      }

      if (isNProgressMetaAction(action)) {
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
    }
  );
};
