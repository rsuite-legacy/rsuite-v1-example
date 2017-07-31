import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toggleClass } from 'dom-lib';

const propTypes = {
  over: PropTypes.bool
};

class SidebarToggler extends Component {

  handleClick = () => {
    toggleClass(document.body, 'sidebar-hide');
  }

  render() {
    const classes = classNames(
      'page-sidebar-toggler', {
        over: this.props.over
      });
    return (
      <div className={classes} onClick={this.handleClick}>
        <i className="icon" />
      </div>
    );
  }
}

SidebarToggler.propTypes = propTypes;
export default SidebarToggler;
