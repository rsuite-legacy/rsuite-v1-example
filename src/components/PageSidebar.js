import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarMenu from './SidebarMenu';
import SidebarToggler from './SidebarToggler';

const contextTypes = {
  menuItems: PropTypes.array
};

class PageSidebar extends Component {
  render() {
    return (
      <div className="page-sidebar-wrapper">
        <div className="page-sidebar">
          <SidebarMenu
            menuItems={this.context.menuItems}
          />
          <SidebarToggler />
        </div>
      </div>
    );
  }
}

PageSidebar.contextTypes = contextTypes;
export default PageSidebar;
