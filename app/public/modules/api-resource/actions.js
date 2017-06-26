export const loading = (resourceType, url) => ({
  type: resourceType + '_RESOURCE_LOADING',
  url,
});

export const loaded = (resourceType, content) => ({
  type: resourceType + '_RESOURCE_LOADED',
  content,
});

export const error = (resourceType, error) => ({
  type: resourceType + '_RESOURCE_ERROR',
  error
});

export const resetData = (resourceType) => ({
  type: resourceType + '_RESOURCE_RESET'
});


export const fetchData = (resourceType, url) => {
  return function(dispatch) {
    dispatch(loading(resourceType, url));
    return fetch(url)
      .then(
        response => response.json(),
        err => dispatch(error(resourceType, err))
      )
      .then(content => dispatch(loaded(resourceType, content)));
  };
};
