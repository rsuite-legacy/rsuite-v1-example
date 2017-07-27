import React, { Component } from 'react';
import { on, getHeight } from 'dom-lib';
import debounce from '../utils/debounce';


function TableResizeHoc(Component) {
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

    render(){
      return <Component {...this.props} {...this.state}/>
    }
  }
}

export default TableResizeHoc;

