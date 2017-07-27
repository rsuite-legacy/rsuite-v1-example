import React, { Component } from 'react';
import { Link } from 'react-router';
import Frame from '../../components/Frame';
import UsersList from './UserList';

class LabelGroups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Frame>
        {this.props.children || <UsersList />}
      </Frame>
    );
  }
}

export default LabelGroups;
