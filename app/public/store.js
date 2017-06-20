import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from 'reducers';

// State logger
const logger = createLogger({
  collapsed: true,
  // Exclude:
  // predicate: (getState, action) =>
  //   action.type !== 'ACTION_NAME'
});


const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    logger
  ),
);

export default store;
