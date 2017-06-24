export const loading = (dataType, apiUrl) => ({
  type: dataType + '_DATA_LOADING',
  apiUrl,
});

export const loaded = (dataType, content) => ({
  type: dataType + '_DATA_LOADED',
  content,
});

export const error = (dataType, error) => ({
  type: dataType + '_DATA_ERROR',
  error
});

export const resetData = (dataType) => ({
  type: dataType + '_DATA_RESET'
});


export const fetchData = (dataType, url) => {
  return function(dispatch) {
    dispatch(loading(dataType, url));
    return fetch(url)
      .then(
        response => response.json(),
        err => dispatch(error(dataType, err))
      )
      .then(content => dispatch(loaded(dataType, content)));
  };
};
