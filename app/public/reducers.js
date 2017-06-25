import { combineReducers } from 'redux';

import resource from 'modules/api-resource/reducer';
import viewport from 'modules/viewport/reducer';

const reducers = combineReducers({
  page: resource('page'),
  project: resource('project'),
  viewport,
});

export default reducers;
