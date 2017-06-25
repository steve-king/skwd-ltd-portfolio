export const loading = (type, url) => ({
  type: type + '_RESOURCE_LOADING',
  url,
});

export const loaded = (type, content) => ({
  type: type + '_RESOURCE_LOADED',
  content,
});

export const error = (type, error) => ({
  type: type + '_RESOURCE_ERROR',
  error
});

export const resetData = (type) => ({
  type: type + '_RESOURCE_RESET'
});


export const fetchData = (type, url) => {
  return function(dispatch) {
    dispatch(loading(type, url));
    return fetch(url)
      .then(
        response => response.json(),
        err => dispatch(error(type, err))
      )
      .then(content => dispatch(loaded(type, content)));
  };
};
