import React, { Component } from 'react';
import { Link } from 'react-router';
import Frame from '../../components/Frame';
import RepoList from './RepoList';

class LabelGroups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Frame>
        {this.props.children || <RepoList />}
      </Frame>
    );
  }
}

export default LabelGroups;
