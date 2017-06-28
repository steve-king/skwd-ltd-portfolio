import React from 'react';
import PropTypes from 'prop-types';
import isEmptyObject from 'is-empty-object';

const animationDelay = 1200;

const withResource = (WrappedComponent) => {
  return class extends React.Component {
    
    static propTypes = {
      resourceUrl: PropTypes.string.isRequired
    }
    
    state = {
      loaded: false,
      requested: false,
      error: false,
      content: {},
    }

    componentDidMount = () => {
      this.mounted = true;
      setTimeout(() => this.getData(this.props.resourceUrl), animationDelay);
    }

    componentWillUnmount = () => {
      this.mounted = false;
    }

    componentDidUpdate = () => {
      // Update loaded prop on next render 
      // (allows 'unloaded' items to render before CSS transition starts)
      
      if (!isEmptyObject(this.state.content) && !this.state.loaded) {
        console.log('update loaded');
        setTimeout(() => this.setState({ loaded: true }));
      }
    }
  
    getData = (url) => {
      console.log('fetchData', url);
      fetch(url).then(
        response => response.json(),
        error => this.setState({ error })
      ).then(data => 
        this.mounted && 
          this.setState({ content: data, loaded: true })
      );     
    }

    render = () => 
      <WrappedComponent {...this.state}/>
  }
}

export default withResource;