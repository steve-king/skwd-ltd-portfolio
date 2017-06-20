import React from 'react';
import classNames from 'classnames';

class Slideshow extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0
    }
    this.interval = 4000;
  }

  componentDidMount() { this.startTimer() }
  componentWillUnmount() { clearInterval(this.timer) }
  startTimer() {
    const max = this.props.content.length - 1;
    var activeIndex = this.state.activeIndex;

    this.timer = setInterval(() => {
      this.setState({
        activeIndex: activeIndex === max ? 0 : activeIndex ++
      });
    }, this.interval);
  }

  render() {
    const { content } = this.props;
    const { activeIndex } = this.state;
    const className = 'slideshow__image';
    const activeClassName = className + ' slideshow__image--active';
    return(
      <div className="slideshow">
        {content.map((image, i) => (
          <div
            key={i}
            style={{ backgroundImage: `url(${image.url})`}}
            className={i === activeIndex ? activeClassName : className}
          />
        ))}
      </div>
    );
  }
}

export default Slideshow;
