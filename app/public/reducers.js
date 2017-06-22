import { combineReducers } from 'redux';

import templateData from 'modules/template/reducer';
import viewport from 'modules/viewport/reducer';

const reducers = combineReducers({
  templateData,
  viewport,
});

export default reducers;
