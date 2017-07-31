import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
};
class PageTitleBar extends Component {

  render() {
    const { title, children } = this.props;
    return (
      <div className="page-title-wrapper">
        <h4 className="page-title">{title}</h4>
        {children}
      </div>
    );
  }
}

PageTitleBar.propTypes = propTypes;

export default PageTitleBar;
