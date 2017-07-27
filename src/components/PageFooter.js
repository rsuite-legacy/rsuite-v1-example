import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PageFooter extends Component {
  render() {
    const classes = classNames('footer', this.props.className);
    return (
      <div className={classes}>
        <span className="copyright">&copy; COPYRIGHT HYPERS 2016</span>
      </div>
    );
  }
};

export default PageFooter;
