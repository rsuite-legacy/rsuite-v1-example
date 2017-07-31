import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { on, getHeight, addClass, removeClass } from 'dom-lib';

import PageHeader from '../components/PageHeader';
import PageSidebar from '../components/PageSidebar';
import PageFooter from '../components/PageFooter';
import debounce from '../utils/debounce';

const propTypes = {
  activeItem: PropTypes.string,
  hideSidebar: PropTypes.bool,
  hideHeader: PropTypes.bool,
};

const contextTypes = {
  router: PropTypes.object.isRequired
};

const defaultProps = {
  headerProps: {}
};

class Frame extends Component {

  componentDidMount() {
    this.onWindowResizeListener = on(window, 'resize', debounce(this.handleWindowResize, 50));
    this.fixedFooter();
  }

  componentWillUpdate() {
    this.fixedFooter();
  }

  componentWillUnmount() {
    if (this.onWindowResizeListener) {
      this.onWindowResizeListener.off();
    }
  }

  fixedFooter = () => {
    let footer = findDOMNode(this.footer);
    // context 高度 < window 高度 - header 高度
    if (getHeight(findDOMNode(this.content)) < getHeight(global) - 50) {
      addClass(footer, 'fixed');
      return;
    }
    removeClass(footer, 'fixed');
  }

  handleWindowResize = () => {
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
        <div
          className="page-container page-content"
          ref={(ref) => {
            this.content = ref;
          }}
        >
          {this.renderSidebar()}
          <div className="page-content-wrapper" style={styles}>
            {children}
            <PageFooter
              ref={(ref) => {
                this.footer = ref;
              }}
            />
          </div>
        </div>
      </div>

    );
  }
}

Frame.propTypes = propTypes;
Frame.contextTypes = contextTypes;
Frame.defaultProps = defaultProps;
export default Frame;
