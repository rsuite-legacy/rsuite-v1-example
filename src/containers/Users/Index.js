import React, { Component } from 'react';
import Frame from '../../components/Frame';
import UsersList from './UserList';

class UsersListView extends Component {

  render() {
    return (
      <Frame>
        {this.props.children || <UsersList />}
      </Frame>
    );
  }
}

export default UsersListView;
