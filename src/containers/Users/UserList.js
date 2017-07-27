import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/users';
import { UserTable } from '../../components/Users';


function mapState2Props(state) {
  return {
    data: state.store.users.data,
    page: state.store.users.page,
    status: state.store.users.status
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchUsers: actions.fetchUsers
  };
}

export default connect(mapState2Props, mapDispatch2Props)(UserTable);
