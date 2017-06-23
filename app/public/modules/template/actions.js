export const loading = (apiUrl) => ({
  type: 'TEMPLATE_DATA_LOADING',
  apiUrl,
});

export const loaded = (templateData, apiUrl) => ({
  type: 'TEMPLATE_DATA_LOADED',
  templateData,
  apiUrl,
});

export const error = (error) => ({
  type: 'TEMPLATE_DATA_ERROR',
  error
});

export const resetData = () => ({
  type: 'TEMPLATE_DATA_RESET'
});


export const fetchData = (url) => {
  return function(dispatch) {
    dispatch(loading(url));
    return fetch(url)
      .then(
        response => response.json(),
        err => dispatch(error(err))
      )
      .then(templateData => dispatch(loaded(templateData, url)));
  };
};
