const initialState = {
  loaded: false,
  data: null,
  apiUrl: null,
  error: null,
};

const templateData = (state = initialState, action) => {
  switch(action.type) {
    case 'TEMPLATE_DATA_LOADING':
      return Object.assign({}, state, {
        loaded: false,
        apiUrl: action.apiUrl,
        data: initialState.data,
        error: null,
      });
    case 'TEMPLATE_DATA_LOADED':
      return Object.assign({}, state, {
        loaded: true,
        apiUrl: action.apiUrl,
        data: action.templateData,
        error: null,
      });
    case 'TEMPLATE_DATA_ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    // case 'TEMPLATE_DATA_RESET':
    //   return initialState;
  }
  return state;
};

export default templateData;
