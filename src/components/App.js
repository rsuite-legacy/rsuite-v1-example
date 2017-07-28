import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';

import locales from '../locales';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';

addLocaleData([...zh, ...en]);
const propTypes = {
  menuItems: React.PropTypes.array,
  locale: React.PropTypes.string
};

const contextTypes = {
  router: React.PropTypes.object,
};

const childContextTypes = {
  menuItems: React.PropTypes.array,
};

class App extends Component {
  constructor(props) {
    super(props);
  }

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


