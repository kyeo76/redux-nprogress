import * as ActionTypes from './constants';
import { beginTask, endTask } from './actions';
import isArray from './isArray';

const nprogressMetaKey = '__nprogress__';
const resultActionTypeSuffixes = ['FULFILLED', 'REJECTED'];

const isNProgressAction = (type, fulfilled, rejected) => {
  return (
    type === fulfilled || type === rejected
  );
};

const getNProgressMeta = (type, meta, configSuffixes) => {
  if (isArray(meta)) {
    return meta;
  }

  const suffixes = meta.resultActionTypeSuffixes || configSuffixes;

  return suffixes.map(suffix => `${type}_${suffix}`);
};

export default (config = {}) => {
  const suffixes = config.resultActionTypeSuffixes || resultActionTypeSuffixes;

  return ({ dispatch }) => (
    next => action => {
      const { type, nprogress, meta } = action;

      if (nprogress) {
        dispatch(beginTask());

        return next({
          ...action,
          meta: {
            ...action.meta,
            [nprogressMetaKey]: getNProgressMeta(type, nprogress, suffixes)
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
