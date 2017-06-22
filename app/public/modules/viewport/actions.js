/* global window, document */
import debounce from 'lodash/debounce';

export function updateViewport(width, height, /*breakpoint*/) {
  return {
    type: 'VIEWPORT_UPDATE',
    width,
    height,
    // breakpoint
  };
}

export function resizeListener() {
  return (dispatch) => {
    window.addEventListener('resize', debounce(() => dispatch(onResize()), 500));
  }
}

/**
 * Called on a debounce'd window resize event in Root.js
 * - CSS breakpoint detection not in use
 */
export function onResize() {
  return (dispatch) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // const body = document.querySelector('html');
    // const breakpoint = window.getComputedStyle(body, ':before').getPropertyValue('content').replace(/["]+/g, '');
    // console.log(width, height, breakpoint);

    dispatch(updateViewport(width, height));
  };
}
