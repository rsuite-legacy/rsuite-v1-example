import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown
} from 'rsuite';
import { Cell } from 'rsuite-table';
import { FormattedMessage } from 'react-intl';
import PageTitleBar from '../../components/PageTitleBar';
import TableView from '../TableView';
import {
  ObjectCell,
  LinkCell,
  StatusCell,
  DateTimeCell,
  SystemRoleCell,
  ActionCell
} from '../CustomTableCells';
import chain from '../../utils/createChainedFunction';

const propTypes = {
  data: PropTypes.array,
  status: PropTypes.string,
  onFetchRepos: PropTypes.func,
  // table默认高度
  tableDefaultHeight: PropTypes.number.isRequired,
  // 框架的高度用于计算 table的高度
  frameHeight: PropTypes.number.isRequired,
  page: PropTypes.object,
  onFetchUsers: PropTypes.func.isRequired,
};

const defaultProps = {
  tableDefaultHeight: 400,
  frameHeight: 140
};

const contextTypes = {
  intl: PropTypes.object.isRequired,
};

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  getSystemRoleFilterComponent() {
    let items = [
      <Dropdown.Item key={1} eventKey="ALL" >全部</Dropdown.Item>,
      <Dropdown.Item key={2} eventKey="ROLE_USER" >用户</Dropdown.Item>,
      <Dropdown.Item key={3} eventKey="ROLE_GROUP" >管理员</Dropdown.Item>
    ];
    return (
      <Dropdown activeKey={'ALL'} select onSelect={chain(this.handleChangeSystemRole)}>
        {items}
      </Dropdown>
    );
  }

  getFilterPlugins() {
    let plugins = [
      {
        label: '系统角色',
        component: this.getSystemRoleFilterComponent()
      }
    ];
    return plugins;

  }

  getTableViewColumns = () => {
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
        label: <FormattedMessage id="status" />,
        cell: <StatusCell dataKey="status" />
      },
      {
        col: {
          width: 200,
          fixed: true,
          sortable: true,
          resizable: true
        },
        label: <FormattedMessage id="username" />,
        cell: <Cell dataKey="name" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: <FormattedMessage id="email" />,
        cell: <Cell dataKey="email" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: <FormattedMessage id="userGroup" />,
        cell: <ObjectCell dataKey="group.name" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: <FormattedMessage id="creator" />,
        cell: <ObjectCell dataKey="creator.name" />
      },
      {
        col: {
          width: 200,
          sortable: true,
          resizable: true
        },
        label: <FormattedMessage id="createDatetime" />,
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

  handleChangeSystemRole = (key) => {
    alert(`SELECT ${key}`);
  }

  loadTableData = (params) => {
    const { onFetchUsers } = this.props;
    onFetchUsers && onFetchUsers(params || this.state.params);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="page-content">
        <PageTitleBar title="userList" />
        <TableView
          cacheKey="user.table"
          data={data}
          options={this.getTableOptions()}
          filterPlugins={this.getFilterPlugins()}
          columns={this.getTableViewColumns()}
          onLoadData={this.loadTableData}
          ref={(ref) => {
            this.table = ref;
          }}
        />
      </div>
    );
  }
}

UserTable.propTypes = propTypes;
UserTable.defaultProps = defaultProps;
UserTable.contextTypes = contextTypes;

export default UserTable;
