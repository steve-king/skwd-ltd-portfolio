const initialState = {};

function viewport(state = initialState, action) {
  switch (action.type) {
    case 'VIEWPORT_UPDATE':
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
        // breakpoint: action.breakpoint
      });
    default:
      return state;
  }
}

export default viewport;
