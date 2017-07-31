import React, { Component } from 'react';
import Frame from '../../components/Frame';
import Login from './Login';

class LoginView extends Component {
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

export default LoginView;
