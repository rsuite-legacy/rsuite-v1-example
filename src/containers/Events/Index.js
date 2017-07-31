import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Frame from '../../components/Frame';
import EventList from './EventList';

const MODULE_NAME = 'label';
const propTypes = {
  headerProps: PropTypes.object
};

class EventListView extends Component {
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

EventListView.propTypes = propTypes;

export default EventListView;
