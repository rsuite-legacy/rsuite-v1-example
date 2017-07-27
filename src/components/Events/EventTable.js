import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';
import { FormattedMessage } from 'react-intl';

import { TableResizeHoc } from '../../hoc';
import PageTitleBar from '../../components/PageTitleBar';

import { StatesCell, ObjectCell } from '../CustomTableCells';
import { CommitsCell } from './CustomTableCells';
import getTableLocale from '../getTableLocale';

const propTypes = {
  data: React.PropTypes.array,
  status: React.PropTypes.string,
  onFetchEvents: React.PropTypes.func,
  //table默认高度
  tableDefaultHeight: React.PropTypes.number.isRequired,
  //框架的高度用于计算 table的高度
  frameHeight: React.PropTypes.number.isRequired,
};

const defaultProps = {
  tableDefaultHeight: 400,
  frameHeight: 140
};

class EventTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onFetchEvents } = this.props;
    onFetchEvents && onFetchEvents();
  }

  handleChangePage = (dataKey) => {
    const { displayLength } = this.state;
  }

  handleChangeLength = (dataKey) => {
    this.setState({
      displayLength: dataKey
    });
  }

  render() {
    const { data = [], status } = this.props;
    const tableLocale = getTableLocale(status, data);

    return (
      <div className="page-content">
        <PageTitleBar title="Events"></PageTitleBar>
        <Table
          height={this.props.tableHeight}
          data={data}
          headerHeight={40}
          rowHeight={40}
          locale={tableLocale}
        >
          <Column width={200} fixed resizable>
            <HeaderCell>Type</HeaderCell>
            <Cell dataKey="type" />
          </Column>
          <Column width={120} resizable>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>
          <Column width={260} resizable>
            <HeaderCell>Created at</HeaderCell>
            <ObjectCell dataKey="created_at" />
          </Column>

          <Column width={200} resizable>
            <HeaderCell>Actor</HeaderCell>
            <ObjectCell dataKey="actor.login" />
          </Column>

          <Column width={300} resizable>
            <HeaderCell>Repo</HeaderCell>
            <ObjectCell dataKey="repo.name" />
          </Column>


          <Column width={300} resizable>
            <HeaderCell>Commits</HeaderCell>
            <CommitsCell />
          </Column>
        </Table>
      </div>
    );
  }
}

EventTable.propTypes = propTypes;
EventTable.defaultProps = defaultProps;

export default TableResizeHoc(EventTable);
