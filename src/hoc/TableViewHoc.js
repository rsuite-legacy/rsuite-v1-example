import React, { Component } from 'react';
import { on, getHeight } from 'dom-lib';
import debounce from '../utils/debounce';

const FRAME_HEIGHT = 136;  //上下 50 + 上下 18 padding

function TableViewHoc(WrapComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      console.log(props);
      this.state = {
      };
    }

    componentWillMount() {
      this.setState({
        tableHeight: this.calculateTableHeight()
      });
    }
    componentDidMount() {
      this._onWindowResizeListener = on(window, 'resize', debounce(this.handleWindowResize, 50));
    }

    componentWillUnmount() {
      if (this._onWindowResizeListener) {
        this._onWindowResizeListener.off();
      }
    }

    calculateTableHeight() {
      const { tableDefaultHeight } = this.props;
      const height = getHeight(global) - FRAME_HEIGHT;
      return height < tableDefaultHeight ? tableDefaultHeight : height;
    }

    handleWindowResize() {
      this.setState({
        tableHeight: this.calculateTableHeight()
      });
    }

    //点击分页
    handleChangePage = (dataKey) => {
      const params = Object.assign({}, this.state.params, {
        page: dataKey
      });
      this.props.loadTableData(params);
      this.setState({ params });
    }
    //切换每页显示数目
    handleChangeLength = (dataKey) => {
      const params = Object.assign({}, this.state.params, {
        page: 1,
        pagesize: dataKey
      });
      this.props.loadTableData(params);
      this.setState({ params });
    }
    //关键字搜索
    handleSearch = (word) => {
      const params = Object.assign({}, this.state.params, {
        page: 1,
        word: word.trim()
      });
      this.setState({ params });
      this.props.loadTableData(params);
    }
    //搜索关键字的 过滤字段
    handleChangeFilterColumn = (filterColumn) => {

      const params = Object.assign({}, this.state.params, {
        page: 1,
        filterColumn: filterColumn
      });

      if (this.state.params.word) {
        this.props.loadTableData(params);
      }

      this.setState({ params });
    }

    //改变数据状态 (全部，启用，禁用)
    handleChangeStatus = (status) => {
      const params = Object.assign({}, this.state.params, {
        page: 1,
        status: status
      });
      this.props.loadTableData(params);
      this.setState({ params });
    }

    render() {
      const newProps = {
        handleChangeLength: this.handleChangeLength,
        handleChangePage: this.handleChangePage,
        handleChangeStatus: this.handleChangeStatus,
        handleChangeFilterColumn: this.handleChangeFilterColumn,
        handleSearch: this.handleSearch
      };

      return (
        <WrapComponent
          {...this.props}
          {...this.state}
          {...newProps}
        />
      );
    }
  };
}

export default TableViewHoc;

