import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Gradient from 'modules/gradient';
import Button from 'modules/button';
import Hexagons from 'modules/hexagons';

class About extends React.Component {

  state = {
    dataLoaded: false,
  }

  componentDidMount() {
    this.props.getData()
    .then(() => this.setState({ dataLoaded: true }));
  }

  render() {
    const { data } = this.props;
    const { dataLoaded } = this.state;
    return (
      <div className={classNames('template template--about', !dataLoaded ? 'loading' : '')}>
        <Hexagons ready={dataLoaded} />
        <main className="template__main">
          <div className="grid-container">
            {dataLoaded &&
              <div className="content">
                <div>
                  <h1 className="title">{data.title}</h1>
                  {data.body}
                </div>
              </div>
            }
          </div>
          <nav className="nav">
            <Link to="/projects" className="nav__btn nav__btn--projects">
              <Button text="Projects" chevron direction="right" />
            </Link>
          </nav>
        </main>
      </div>
    );
  }
};

export default About;
