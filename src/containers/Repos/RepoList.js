import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/repos';
import { RepoTable } from '../../components/Repos';


function mapState2Props(state) {
  const currentStatus = state.stroe.repos;
  return {
    data: currentStatus.data,
    status: currentStatus.status
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchRepos: actions.fetchRepos
  };
}

export default connect(mapState2Props, mapDispatch2Props)(RepoTable);
