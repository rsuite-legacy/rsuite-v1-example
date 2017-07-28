import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { on, getHeight, addClass, removeClass } from 'dom-lib';

import PageHeader from '../components/PageHeader';
import PageSidebar from '../components/PageSidebar';
import PageFooter from '../components/PageFooter';
import debounce from '../utils/debounce';

const propTypes = {
  activeItem: React.PropTypes.string,
  hideSidebar: React.PropTypes.bool,
  hideHeader: React.PropTypes.bool,
};

const contextTypes = {
  router: React.PropTypes.object.isRequired
};

const defaultProps = {
  headerProps: {}
};

class Frame extends Component {
  constructor(props) {
    super(props);
  }

  fixedFooter() {

    let footer = findDOMNode(this.refs.footer);
    //context 高度 < window 高度 - header 高度
    if (getHeight(findDOMNode(this.refs.content)) < getHeight(global) - 50) {
      addClass(footer, 'fixed');
      return;
    }
    removeClass(footer, 'fixed');
  }

  handleWindowResize = () => {
    this.fixedFooter();
  }

  componentDidMount() {
    this._onWindowResizeListener = on(window, 'resize', debounce(this.handleWindowResize, 50));
    this.fixedFooter();
  }

  componentWillUnmount() {
    if (this._onWindowResizeListener) {
      this._onWindowResizeListener.off();
    }
  }

  componentWillUpdate() {
    this.fixedFooter();
  }

  renderHeder() {
    const { hideHeader, activeItem } = this.props;
    return !hideHeader && <PageHeader
      activeItem={activeItem}
    />;
  }

  renderSidebar() {
    const { hideSidebar } = this.props;
    return hideSidebar ? null : <PageSidebar />;
  }

  render() {
    const { children, hideSidebar } = this.props;
    const styles = {
      marginLeft: hideSidebar ? 0 : 200
    };
    return (
      <div>
        {this.renderHeder()}
        <div className='page-container page-content' ref='content'>
          {this.renderSidebar()}
          <div className='page-content-wrapper' style={styles}>
            {children}
            <PageFooter ref='footer' />
          </div>
        </div>
      </div>

    );
  }
};

Frame.propTypes = propTypes;
Frame.contextTypes = contextTypes;
Frame.defaultProps = defaultProps;
export default Frame;
