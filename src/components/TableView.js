import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getItem, setItem } from '../utils/storage';

import {
  Table,
  Column,
  Cell,
  HeaderCell
} from 'rsuite-table';
import {
  ButtonToolbar,
  Dropdown,
  Button,
  FormControl
} from 'rsuite';
import { FormattedMessage } from 'react-intl';
import ButtonGroupStatusRadio from './ButtonGroupStatusRadio';
import { Link } from 'react-router';
import TablePagination from './CustomTablePagination';
import { OrderCell } from './CustomTableCells';
import SearchInput from './SearchInput';
import { TableViewHoc } from '../hoc';

import { getLocale } from './TableLocale';
import { getItemByUid } from '../utils/storage';
import debounce from '../utils/debounce';
import chain from '../utils/createChainedFunction';

const propTypes = {
  data: PropTypes.array,
  // isDataReady: PropTypes.string,
  onLoadData: PropTypes.func.isRequired,
  headerHeight: PropTypes.number,
  rowHeight: PropTypes.number,
  options: PropTypes.object,
  columns: PropTypes.array.isRequired,
  filterPlugins: PropTypes.array,
  cacheKey: PropTypes.string,
  hidePagination: PropTypes.bool
};

const defaultProps = {
  headerHeight: 40,
  rowHeight: 40,
  tableHeight: 774,
  data: [],
  options: {},
  cacheKey: 'table'
};


class TableView extends Component {
  constructor(props) {
    const { options } = props;
    super(props);
    const keys = _.get(options, 'searchControl.keys');
    const filterColumn = this._getDefaultKey(keys);
    this.state = {
      cacheKey: props.cacheKey,
      params: {
        orderColumn: _.get(options, 'orderColumn'),
        orderType: _.get(options, 'orderType'),
        filterColumn,
        page: 1,
        pagesize: parseInt(getItemByUid('table.length')) || 30,
        status: _.get(options, 'statusFilter.defaultStatus'),
      }
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { data, isDataReady } = this.props;
    return !_.eq(nextProps, this.props);

  }
  _getDefaultKey(keys) {
    if (!keys) {
      return;
    }
    let idx = _.findIndex(keys, 'default');
    if (!~idx) {
      idx = 0;
    }
    return keys[idx].value;
  }

  getParams() {
    const clearParams = _(this.state.params).omitBy(_.isUndefined).value();
    return clearParams;
  }

  setParams(nextParams, cb) {
    this.setState({
      params: Object.assign({}, this.state.params, nextParams)
    }, cb);
  }

  loadTableData(params) {
    const clearParams = _(params).omitBy(_.isUndefined).value();
    this.props.onLoadData(clearParams);
    setItem(`${this.state.cacheKey}.params`, JSON.stringify(clearParams));
  }

  reload(params) {
    this.setState({
      params: { ...this.state.params, page: 1 }
    }, this.update);
  }

  update() {
    const { params } = this.state;
    this.loadTableData(params);
  }

  renderMoreFilter() {
    const { filterPlugins } = this.props;

    if (!filterPlugins) {
      return null;
    }

    return filterPlugins.map(i =>
      <div key={i.label}>
        <label className="lbl">{i.label}</label>
        <span style={{ display: 'inline-block', minWidth: 120, float: 'left' }}>
          {i.component}
        </span>
      </div>
    );
  }

  renderSearchControl() {
    const {
            options: {
                searchControl
            }
        } = this.props;
    const { params } = this.state;

    if (!searchControl) {
      return null;
    }
    // else
    return (
      <div className="pull-right">
        <Dropdown
          activeKey={params.filterColumn}
          onSelect={chain(
            this.props.handleChangeFilterColumn,
            searchControl.onSelect
          )}
          select
        >
          {
            searchControl.keys.map(key =>
              <Dropdown.Item
                key={key.value}
                eventKey={key.value}
              >
                {key.label}
              </Dropdown.Item>
            )
          }
        </Dropdown>
        <SearchInput
          word={params.word}
          onChange={debounce(chain(
            this.props.handleSearch,
            searchControl.onSearch
          ), 200)}
        />
      </div>
    );
  }

  renderStatusFilter() {
    const {
            options: {
                statusFilter
            }
        } = this.props;

    if (!statusFilter) {
      return null;
    }
    // else
    return (
      <div>
        <label className="lbl"><FormattedMessage id="status" /></label>
        <ButtonGroupStatusRadio
          status={_.get(this.state, 'params.status')}
          onClick={chain(
            this.props.handleChangeStatus,
            statusFilter.onClick
          )}
        />
      </div>
    );
  }

  renderAddButton() {

    const { addButton } = this.props.options;

    if (!addButton) {
      return null;
    }
    // else
    return (
      <div>
        <Button
          shape="primary"
          type="button"
          componentClass={addButton.to && Link}
          to={addButton.to}
          onClick={addButton.onClick}
          disabled={addButton.disableWhen && addButton.disableWhen()}
        >
          {addButton.text ? addButton.text : <FormattedMessage id="create" />}

        </Button>
      </div>
    );
  }

  renderToolbar() {

    const items = [
      this.renderAddButton(),
      this.renderStatusFilter(),
      this.renderMoreFilter(),
      this.renderSearchControl()
    ];

    const elements = items.filter((item) => item !== null);
    return elements.length ? (
      <div className="table-toolbar">
        <ButtonToolbar>
          {
            React.Children.map(elements, (item, index) => {
              return React.cloneElement(item, { key: index });
            })
          }
        </ButtonToolbar>
      </div>
    ) : null;
  }

  renderPagination() {
    const { options } = this.props;
    const { params } = this.state;
    return (
      <TablePagination
        displayLength={params.pagesize}
        total={options.total}
        page={params.page}
        onChangePage={chain(
          this.handleChangePage,
          options.onChangePageNumber
        )}
        onChangeLength={chain(
          this.props.handleChangeLength,
          options.onChangePagesize
        )}
      />
    );
  }

  renderColumns() {
    const { columns } = this.props;
    const { params } = this.state;

    return columns.map(column => {
      // return primary column
      if (column.primary) {
        return (
          <Column
            key='primary'
            width={60}
            align="center"
            fixed
          >
            <HeaderCell></HeaderCell>
            <OrderCell
              page={params.page || 0}
              pagesize={params.pagesize || 0}
            />
          </Column>
        );
      }

      // else
      return (
        <Column key={column.label} {...column.col}>
          <HeaderCell>{column.label}</HeaderCell>
          {column.cell}
        </Column>
      );
    });
  }

  render() {
    const {
      data,
      tableHeight = 774,
      headerHeight,
      rowHeight,
      isDataReady,
      options,
      columns,
      className,
      hidePagination,
      ...props
    } = this.props;

    const { params } = this.state;
    const footerHeight = 56;


    let status;

    if (isDataReady === null || isDataReady === undefined) {
      status = 'DEFAULT';
    } else if (isDataReady === 'REQUEST' || isDataReady === false) {
      status = 'REQUEST';
    } else if (isDataReady === 'SUCCESS' || isDataReady === true) {
      status = 'SUCCESS';
    }

    return (
      <div className={className}>
        {this.renderToolbar()}
        <Table
          {...props}
          height={tableHeight - footerHeight}
          data={data}
          headerHeight={headerHeight}
          rowHeight={rowHeight}
          locale={getLocale(status, data)}
          sortColumn={params.orderColumn}
          sortType={params.orderType}
          onSortColumn={this.props.handleSortColumn}
        >
          {this.renderColumns()}
        </Table>
        {!hidePagination && this.renderPagination()}
      </div>
    );
  }

  handleSortColumn(orderColumn, orderType) {
    const nextParams = {
      ...this.state.params,
      orderColumn,
      orderType,
      page: 1
    };
    this.loadTableData(nextParams);
    this.setState({ params: nextParams });
  }
}

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
