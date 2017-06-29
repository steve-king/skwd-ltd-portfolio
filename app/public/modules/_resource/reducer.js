const initialState = {
  loaded: false,
  content: null,
  url: null,
  error: null,
};

const resource = (resourceType) => {
  return (state = initialState, action) => {
    switch(action.type) {
      case resourceType + '_RESOURCE_LOADING':
        return Object.assign({}, state, {
          loaded: false,
          url: action.url,
          content: initialState.content,
          error: null,
        });
      case resourceType + '_RESOURCE_LOADED':
        return Object.assign({}, state, {
          loaded: true,
          content: action.content,
          error: null,
        });
      case resourceType + '_RESOURCE_ERROR':
        return Object.assign({}, state, {
          error: action.error,
          loaded: false,
        });
      case resourceType + '_RESOURCE_RESET':
        return Object.assign({}, state, {
          loaded: initialState.loaded,
          url: initialState.url,
          error: initialState.error,
        });
    }
    return state;
  }
}

export default resource;
