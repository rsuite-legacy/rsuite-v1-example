import React, { Component } from 'react';
import { Link } from 'react-router';
import Frame from '../../components/Frame';
import EventList from './EventList';

const MODULE_NAME = 'label';
class LabelGroups extends Component{

  render() {

    const children = this.props.children || (
      <EventList />
    );

    return (

      <Frame activeItem={MODULE_NAME} headerProps={this.props.headerProps}>
        {children}
      </Frame>

    );
  }
}

export default LabelGroups;
