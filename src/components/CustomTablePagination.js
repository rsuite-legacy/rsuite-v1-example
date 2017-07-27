import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TablePagination } from 'rsuite-table';
import { FormattedNumber } from 'react-intl';
import { setItemByUid } from '../utils/storage';


function formatLengthMenu(lengthMenu) {
  return (
    <div className="table-length">
      <span> 每页 </span>
      {lengthMenu}
      <span> 条 </span>
    </div>
  );
}

function formatInfo(total, activePage) {
  return (
    <span> 共 {' '}

      <i className="table-num">
        <FormattedNumber value={total} />
      </i> {' '}条数据
        </span>
  );
}

const propTypes = {
  displayLength: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeLength: PropTypes.func
};

const contextTypes = {
  user: React.PropTypes.object,
  page: React.PropTypes.number
};

class CustomTablePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeLength = (dataKey) => {
    const { onChangeLength } = this.props;
    onChangeLength && onChangeLength(dataKey);
    setItemByUid('table.length', dataKey);
  }

  render() {
    return (
      <TablePagination
        {...this.props}
        onChangeLength={this.handleChangeLength}
        formatLengthMenu={formatLengthMenu}
        formatInfo={formatInfo}
        activePage={this.props.page}
        ref={r => this.wrapped = r}
      />
    );
  }
}

CustomTablePagination.propTypes = propTypes;
CustomTablePagination.contextTypes = contextTypes;

export default CustomTablePagination;
