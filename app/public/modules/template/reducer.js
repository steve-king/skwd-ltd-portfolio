const initialState = {
  loaded: false,
  content: null,
  apiUrl: null,
  error: null,
};

// const templateData = (state = initialState, action) => {
//   switch(action.type) {
//     case 'DATA_LOADING':
//       return Object.assign({}, state, {
//         loaded: false,
//         apiUrl: action.apiUrl,
//         content: initialState.data,
//         error: null,
//       });
//     case 'DATA_LOADED':
//       return Object.assign({}, state, {
//         loaded: true,
//         apiUrl: action.apiUrl,
//         content: action.content,
//         error: null,
//       });
//     case 'DATA_ERROR':
//       return Object.assign({}, state, {
//         error: action.error,
//       });
//     // case 'DATA_RESET':
//     //   return initialState;
//   }
//   return state;
// };

const dataReducer = (dataType) => {
  return (state = initialState, action) => {
    switch(action.type) {
    case dataType + '_DATA_LOADING':
      return Object.assign({}, state, {
        loaded: false,
        apiUrl: action.apiUrl,
        content: initialState.data,
        error: null,
      });
    case dataType + '_DATA_LOADED':
      return Object.assign({}, state, {
        loaded: true,
        content: action.content,
        error: null,
      });
    case dataType + '_DATA_ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    // case dataType + 'DATA_RESET':
    //   return initialState;
  }
  return state;
  }
}

export default dataReducer;
