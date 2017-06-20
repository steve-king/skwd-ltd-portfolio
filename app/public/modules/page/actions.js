export const loaded = (content, apiUrl) => ({
  type: 'CONTENT_LOADED',
  content,
  apiUrl,
});

export const error = (error) => ({
  type: 'CONTENT_ERROR',
  error
});

export const reset = () => ({
  type: 'CONTENT_RESET'
});


export const fetchContent = (url) => {
  return function(dispatch) {
    return fetch(url)
      .then(
        response => response.json(),
        err => dispatch(error(err))
      )
      .then(content => dispatch(loaded(content, url)));
  };
};
