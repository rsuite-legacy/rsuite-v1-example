import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { toggleClass } from 'dom-lib';

const propTypes = {
  open: PropTypes.bool,
  menuItems: PropTypes.array,
};

const defaultProps = {
  open: true,
  menuItems: []
};

const contextTypes = {
  router: React.PropTypes.object.isRequired
};

class SidebarMenu extends Component {

  handleMenuHeaderClick = (key) => {
    toggleClass(ReactDOM.findDOMNode(this.refs[key]), 'open');
  }

  renderItems() {
    const { menuItems } = this.props;
    const className = this.props.open ? 'open' : '';

    return menuItems.map((item, index) => {
      return (
        <li
          className={className}
          key={index}
          ref={item.localeKey + index}
        >
          <a >
            <i className={item.icon} />
            <span className="title"><FormattedMessage id={item.localeKey} /></span>
            <span className="arrow" />
          </a>
          {this.renderSubItems(item.children)}
        </li>
      );
    });
  }

  renderSubItems(subItems = []) {

    if (!subItems.length) {
      return null;
    }
    return (
      <ul className="sub-menu">
        {
          subItems.map((item, index) => {
            return (
              <li
                key={index}
                className={this.context.router.isActive(item.link) ? 'active' : null}
              >
                <Link to={item.link}><FormattedMessage id={item.localeKey} /></Link>
              </li>
            );
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <ul className="page-sidebar-menu">
        {this.renderItems()}
      </ul>
    );
  }
};

SidebarMenu.propTypes = propTypes;
SidebarMenu.defaultProps = defaultProps;
SidebarMenu.contextTypes = contextTypes;

export default SidebarMenu;
