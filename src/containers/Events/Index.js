import React, { Component } from 'react';
import Frame from '../../components/Frame';
import EventList from './EventList';


class EventListView extends Component {
  render() {
    return (
      <Frame>
        {this.props.children || <EventList />}
      </Frame>
    );
  }
}

export default EventListView;
