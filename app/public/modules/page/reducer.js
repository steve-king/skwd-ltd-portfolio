const initialState = {
  loaded: false,
  content: null,
  apiUrl: null,
  error: null,
};

const page = (state = initialState, action) => {
  switch(action.type) {
    case 'CONTENT_LOADED':
      return Object.assign({}, state, {
        loaded: true,
        apiUrl: action.apiUrl,
        content: action.content,
        error: null,
      });
    case 'CONTENT_ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    case 'CONTENT_RESET':
      return initialState;
  }
  return state;
};

export default page;
