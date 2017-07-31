import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';

import { TableResizeHoc } from '../../hoc';
import PageTitleBar from '../../components/PageTitleBar';
import { LinkCell } from '../CustomTableCells';

import getTableLocale from '../getTableLocale';

const propTypes = {
  data: PropTypes.array,
  status: PropTypes.string,
  onFetchRepos: PropTypes.func,
  tableHeight: PropTypes.number.isRequired,
  // table默认高度
  tableDefaultHeight: PropTypes.number.isRequired,
};

const defaultProps = {
  tableDefaultHeight: 400,
  frameHeight: 140
};
// TODO:
// mixins: [TableResizeMixin],
class RepoTable extends Component {

  componentDidMount() {
    const { onFetchRepos } = this.props;
    onFetchRepos && onFetchRepos();
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

    const { data, status } = this.props;
    const tableLocale = getTableLocale(status, data);

    return (
      <div className="page-content">
        <PageTitleBar title="Repositories" />
        <Table
          height={this.props.tableHeight}
          data={data}
          headerHeight={40}
          rowHeight={40}
          locale={tableLocale}
        >

          <Column width={200} fixed resizable>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={120} resizable>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={260} resizable>
            <HeaderCell>Full Name</HeaderCell>
            <Cell dataKey="full_name" />
          </Column>

          <Column width={100} resizable>
            <HeaderCell>Language</HeaderCell>
            <Cell dataKey="language" />
          </Column>

          <Column width={100} resizable>
            <HeaderCell>Stargazers</HeaderCell>
            <Cell dataKey="stargazers_count" />
          </Column>

          <Column width={100} resizable>
            <HeaderCell>Forks</HeaderCell>
            <Cell dataKey="forks" />
          </Column>

          <Column width={120} resizable>
            <HeaderCell>Open Issues</HeaderCell>
            <Cell dataKey="open_issues_count" />
          </Column>


          <Column width={300} resizable>
            <HeaderCell>URL</HeaderCell>
            <LinkCell dataKey="html_url" />
          </Column>

          <Column width={300} resizable>
            <HeaderCell>Home Page</HeaderCell>
            <LinkCell dataKey="homepage" />
          </Column>


          <Column width={300} resizable>
            <HeaderCell>description</HeaderCell>
            <Cell dataKey="description" />
          </Column>
        </Table>
      </div>
    );
  }
}

RepoTable.propTypes = propTypes;
RepoTable.defaultProps = defaultProps;

export default TableResizeHoc(RepoTable);
