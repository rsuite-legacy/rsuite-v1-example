
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/auth';
import Login from '../../components/Login';


function mapState2Props(state) {
  const currentStatus = state.stroe.login;
  return {
    status: currentStatus.status
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onLogin: actions.login
  };
}

export default connect(mapState2Props, mapDispatch2Props)(Login);
