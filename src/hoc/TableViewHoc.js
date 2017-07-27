import React, { Component } from 'react';
import { on, getHeight } from 'dom-lib';
import debounce from '../utils/debounce';


function TableViewHoc(WrapComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHeight: this.calculateTableHeight()
      };
    }

    calculateTableHeight() {
      const { tableDefaultHeight, frameHeight } = this.props;
      const height = getHeight(global) - frameHeight;
      return height < tableDefaultHeight ? tableDefaultHeight : height;
    }

    handleWindowResize() {
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

    //点击分页
    handleChangePage(dataKey) {
      const params = Object.assign({}, this.state.params, {
        page: dataKey
      });
      this.loadTableData(params);
      this.setState({ params });
    }
    //切换每页显示数目
    handleChangeLength(dataKey) {
      const params = Object.assign({}, this.state.params, {
        page: 1,
        pagesize: dataKey
      });
      this.loadTableData(params);
      this.setState({ params });
    }
    //关键字搜索
    handleSearch(word) {
      const params = Object.assign({}, this.state.params, {
        page: 1,
        word: word.trim()
      });
      this.setState({ params });
      this.loadTableData(params);
    }
    //搜索关键字的 过滤字段
    handleChangeFilterColumn(filterColumn) {

      const params = Object.assign({}, this.state.params, {
        page: 1,
        filterColumn: filterColumn
      });

      if (this.state.params.word) {
        this.loadTableData(params);
      }

      this.setState({ params });
    }

    //改变数据状态 (全部，启用，禁用)
    handleChangeStatus(status) {
      const params = Object.assign({}, this.state.params, {
        page: 1,
        status: status
      });
      this.loadTableData(params);
      this.setState({ params });
    }

    render() {
      return (
        <WrapComponent
          {...this.props}
          {...this.state}
        />
      );
    }
  };
}

export default TableViewHoc;

