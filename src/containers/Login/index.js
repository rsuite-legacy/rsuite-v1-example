import React, { Component } from 'react';
import Frame from '../../components/Frame';
import Login from './Login';

class LabelGroups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Frame
        hideSidebar
      >
        {this.props.children || <Login />}
      </Frame>
    );
  }
}

export default LabelGroups;