export const loaded = (content, apiUrl) => ({
  type: 'TEMPLATE_DATA_LOADED',
  content,
  apiUrl,
});

export const error = (error) => ({
  type: 'TEMPLATE_DATA_ERROR',
  error
});

export const reset = () => ({
  type: 'TEMPLATE_DATA_RESET'
});


export const fetchData = (url) => {
  return function(dispatch) {
    return fetch(url)
      .then(
        response => response.json(),
        err => dispatch(error(err))
      )
      .then(content => dispatch(loaded(content, url)));
  };
};
