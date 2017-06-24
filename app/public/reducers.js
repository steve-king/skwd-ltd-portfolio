import { combineReducers } from 'redux';

import dataReducer from 'modules/template/reducer';
import viewport from 'modules/viewport/reducer';

const reducers = combineReducers({
  pageData: dataReducer('page'),
  projectData: dataReducer('project'),
  viewport,
});

export default reducers;
