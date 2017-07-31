import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string
};

class PageFooter extends Component {
  render() {
    const classes = classNames('footer', this.props.className);
    return (
      <div className={classes}>
        <span className="copyright">&copy; COPYRIGHT HYPERS 2016</span>
      </div>
    );
  }
}

PageFooter.propTypes = propTypes;

export default PageFooter;
