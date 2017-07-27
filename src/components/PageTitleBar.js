import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node
  ])
};
class PageTitleBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, children } = this.props;
    return (
      <div className="page-title-wrapper">
        <h4 className="page-title">{title}</h4>
        {children}
      </div>
    );
  }
};

PageTitleBar.propTypes = propTypes;

export default PageTitleBar;
