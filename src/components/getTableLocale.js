import React from 'react';
import { FormattedMessage } from 'react-intl';

export default (status, data) => {

  let emptyMessage = 'loading';
  let iconClassName = 'icon icon-spinner fa-spin ';
  if (status === 'success' && data.length === 0) {
    emptyMessage = 'noDataFound';
    iconClassName = 'icon icon-info info';
  }

  const tableLocale = {
    emptyMessage: (
      <div>
        <i className={iconClassName} /> {' '}
        <FormattedMessage id={emptyMessage} />
      </div>
    )
  };
  return tableLocale;
};
