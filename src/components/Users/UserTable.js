import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column, Cell, HeaderCell } from 'rsuite-table';
import { FormattedMessage } from 'react-intl';

import { TableResizeHoc } from '../../hoc';
import PageTitleBar from '../../components/PageTitleBar';
import TableView from '../TableView';
import { ObjectCell, LinkCell, StatusCell, DateTimeCell, SystemRoleCell, ActionCell } from '../CustomTableCells';

const propTypes = {
  data: React.PropTypes.array,
  status: React.PropTypes.string,
  onFetchRepos: React.PropTypes.func,
  //table默认高度
  tableDefaultHeight: React.PropTypes.number.isRequired,
  //框架的高度用于计算 table的高度
  frameHeight: React.PropTypes.number.isRequired,
};

const defaultProps = {
  tableDefaultHeight: 400,
  frameHeight: 140
};
// TODO:
// mixins: [TableResizeMixin],
class UserTable extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadTableData();
  }

  getTableOptions() {
    const { page = {} } = this.props;

    return ({
      searchControl: {
        keys: [
          { label: '全部', value: 'all' },
          { label: '用户名', value: 'name' },
          { label: '邮箱', value: 'email' }
        ]
      },
      status: 'ENABLE',
      orderColumn: 'createTime',
      orderType: 'desc',
      total: page.total || 0
    });
  }

  getFilterPlugins() {
    // let plugins = [
    //   {
    //     label: '系统角色',
    //     component: this.getSystemRoleFilterComponent()
    //   }
    // ];
    // const userGroup = {
    //   label: '用户组',
    //   component: this.getUserGroupFilterComponent()
    // };
    // return plugins;
    return [];
  }

  getTableViewColumns() {
    let cols = [
      {
        lable: 'ID',
        primary: true,
      },
      {
        col: {
          width: 80,
          fixed: true,
          sortable: true,
          resizable: true
        },
        label: '状态',
        cell: <StatusCell dataKey="status" />
      },
      {
        col: {
          width: 200,
          fixed: true,
          sortable: true,
          resizable: true
        },
        label: 'username',
        cell: <Cell dataKey="name" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: 'email',
        cell: <Cell dataKey="email" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: '用户组',
        cell: <ObjectCell dataKey="group.name" />
      },
      // {
      //   col: {
      //     width: 200,
      //     sortable: true,
      //     resizable: true
      //   },
      //   label: '系统角色',
      //   cell: <SystemRoleCell dataKey="systemRole.name" />
      // },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: '创建者',
        cell: <ObjectCell dataKey="creator.name" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: '创建时间',
        cell: <DateTimeCell dataKey="createTime" />
      },
    ];
    // const operationCell = {
    //   col: {
    //     width: 100,
    //     resizable: true
    //   },
    //   label: <FormattedMessage id="operation" />,
    //   cell: <ActionCell onEdit={this.handleShowEditModal} />
    // };

    // cols.push(operationCell);
    return cols;
  }

  loadTableData() {
    const { onFetchUsers } = this.props;
    onFetchUsers && onFetchUsers();
  }
  render() {
    const { data, status } = this.props;

    return (
      <div className="page-content">
        <PageTitleBar title="userList"></PageTitleBar>
        <TableView
          cacheKey='user.table'
          data={data}
          options={this.getTableOptions()}
          filterPlugins={this.getFilterPlugins()}
          columns={this.getTableViewColumns()}
          onLoadData={this.loadTableData}
          ref={ref => this.table = ref}
        />
      </div>
    );
  }
};

UserTable.propTypes = propTypes;
UserTable.defaultProps = defaultProps;

export default UserTable;
