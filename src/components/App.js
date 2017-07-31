import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

import locales from '../locales';


addLocaleData([...zh, ...en]);
const propTypes = {
  menuItems: PropTypes.array,
  locale: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object,
};

const childContextTypes = {
  menuItems: PropTypes.array,
};

class App extends Component {

  getChildContext() {
    return {
      menuItems: this.props.menuItems,
    };
  }

  render() {
    const { locale, children } = this.props;
    return (
      <IntlProvider
        locale={locale}
        messages={locales[locale]}
      >
        <div className="page">
          {children}
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = propTypes;
App.childContextTypes = childContextTypes;
App.contextTypes = contextTypes;

export default App;

