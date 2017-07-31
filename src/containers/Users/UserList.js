import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/users';
import { UserTable } from '../../components/Users';


function mapState2Props(state) {
  const currentStatus = state.store.users;
  return {
    data: currentStatus.data,
    page: currentStatus.page,
    status: currentStatus.status
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchUsers: actions.fetchUsers
  };
}

export default connect(mapState2Props, mapDispatch2Props)(UserTable);
