import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/events';
import { EventTable } from '../../components/Events';


function mapState2Props(state) {
  const currentStatus = state.store.events;
  return {
    data: currentStatus.data,
    status: currentStatus.status
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchEvents: actions.fetchEvents
  };
}

export default connect(mapState2Props, mapDispatch2Props)(EventTable);
