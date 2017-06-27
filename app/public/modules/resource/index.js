import React from 'react';
import PropTypes from 'prop-types';

const withResource = (WrappedComponent) => {
  return class extends React.Component {
    
    static propTypes = {
      resourceUrl: PropTypes.string.isRequired
    }
    
    state = {
      loaded: false,
      requested: false,
      error: false,
      content: null,
    }

    componentDidMount = () => {
      this.mounted = true;
      setTimeout(() => this.getData(this.props.resourceUrl), 2000);
    }

    componentWillUnmount = () => {
      this.mounted = false;
    }
  
    getData = (url) => {
      // if (!this.state.requested) {
        // this.setState({ requested: true });
        console.log('fetchData', url);
        fetch(url).then(
          response => response.json(),
          error => this.setState({ error })
        ).then(data => 
          this.mounted && this.setState({ content: data, loaded: true })
        );
      // }
      
    }

    render = () => 
      <WrappedComponent {...this.state}/>
  }
}

export default withResource;