import React from 'react';
import { on, getHeight } from 'dom-lib';
import debounce from '../utils/debounce';

const FRAME_HEIGHT = 136;  // 上下 50 + 上下 18 padding
const TABLE_TOOLBAR_HEIGHT = 72;

const PAGE_TABS_HEIGHT = 62;
const PAGE_TOOLBAR_HEIGHT = 78;
const PAGE_TITLE_HEIGHT = 50;

function TableResizeHoc(Component) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableHeight: this.calculateTableHeight()
      };
    }

    calculateTableHeight() {
      const { tableDefaultHeight, hasPageTabs, hasPageToolbar, tableHeight } = this.props;
      if (tableHeight) {
        return tableHeight;
      }

      let height = getHeight(global) - FRAME_HEIGHT - PAGE_TITLE_HEIGHT - TABLE_TOOLBAR_HEIGHT;

      if (hasPageTabs) {
        height -= PAGE_TABS_HEIGHT;
      }
      if (hasPageToolbar) {
        height -= PAGE_TOOLBAR_HEIGHT;
      }


      return height < tableDefaultHeight ? tableDefaultHeight : height;
    }

    handleWindowResize = () => {
      this.setState({
        tableHeight: this.calculateTableHeight()
      });
    }

    componentDidMount() {
      this.onWindowResizeListener = on(window, 'resize', debounce(this.handleWindowResize, 50));
    }

    componentWillUnmount() {
      if (this.onWindowResizeListener) {
        this.onWindowResizeListener.off();
      }
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
}

export default TableResizeHoc;

