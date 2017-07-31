import React from 'react';
import { FormattedMessage } from 'react-intl';

export function getLocale(status, data) {

  let emptyMessage;
  let iconClassName;

  if (status === 'DEFAULT') {
    /**
     * 暂时不处理，后续有设计的话，再设置
     */
    emptyMessage = null;
    iconClassName = null;
  } else if (status === 'REQUEST') {
    emptyMessage = 'loading';
    iconClassName = 'icon icon-cog icon-lg icon-spin ';
  } else if (status === 'SUCCESS' && data && data.length === 0) {
    emptyMessage = 'noDataFound';
    iconClassName = 'icon icon-info2 icon-lg info';
  } else if (status === 'ERROR') {
    emptyMessage = 'error';
    iconClassName = 'icon icon-info2 icon-lg error';
  }


  return {
    emptyMessage: (
      <div>
        {iconClassName ? <i className={iconClassName} /> : null}
        {emptyMessage ? <FormattedMessage id={emptyMessage} /> : null}
      </div>
    )
  };
}
