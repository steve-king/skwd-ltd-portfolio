const initialState = {
  loaded: false,
  content: null,
  url: null,
  error: null,
};

const resource = (type) => {
  return (state = initialState, action) => {
    switch(action.type) {
      case type + '_RESOURCE_LOADING':
        return Object.assign({}, state, {
          loaded: false,
          url: action.url,
          content: initialState.data,
          error: null,
        });
      case type + '_RESOURCE_LOADED':
        return Object.assign({}, state, {
          loaded: true,
          content: action.content,
          error: null,
        });
      case type + '_RESOURCE_ERROR':
        return Object.assign({}, state, {
          error: action.error,
          loaded: false,
        });
      case type + 'RESOURCE_RESET':
        return Object.assign({}, state, {
          loaded: false,
          error: null,
        });
    }
    return state;
  }
}

export default resource;
