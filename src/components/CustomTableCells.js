import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Cell } from 'rsuite-table';
import { FormattedNumber, FormattedMessage } from 'react-intl';
import { CONF_DATETIME } from '../constants/Conf';

export function getDataByStructure(dataKey, rowData) {

  let keys = dataKey.split('.');
  let data = _.clone(rowData);
  keys.map((key) => {
    if (!data) {
      console.error(`${key} is not defined`);
    }
    data = data[key];
  });
  return data;
}

// 状态列
export const StatusCell = ({ rowData, dataKey, ...props }) => {
  let clesses = 'icon icon-lg ' + (rowData[dataKey] === 'ENABLE' ? 'icon-ok-circle green' : 'icon-info2 gray');
  return (
    <Cell {...props}>
      <i className={clesses} />
    </Cell>
  );
};

// 序号
export const OrderCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} >
      {props.rowIndex + 1 + ((props.page - 1) * props.pagesize)}
    </Cell>
  );
};

export const ObjectCell = ({ rowData = {}, dataKey, ...props }) => {
  let keys = dataKey.split('.');
  keys.map((key) => {
    rowData = rowData[key] || {};
  });
  return (
    <Cell {...props}>
      {(typeof rowData) === 'string' ? rowData : ' '}
    </Cell>
  );
};

export const NumberCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <FormattedNumber value={rowData[dataKey]} />
    </Cell>
  );
};

export const LinkCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props}>
      <a href={rowData[dataKey]}>{rowData[dataKey]}</a>
    </Cell>
  );
};


export const DateTimeCell = ({ rowData, dataKey, ...props }) => {
  let data = getDataByStructure(dataKey, rowData);
  return (
    <Cell {...props}>
      <span>{data ? moment(data).format(CONF_DATETIME) : '--'}</span>
    </Cell>
  );
};

export const ActionsCell = ({ rowData, actions = [], ...props }) => {
  return (
    <Cell {...props}>
      {actions.map((action, i) => {
        const component = action.component || action.getComponent && action.getComponent(rowData);
        if (component) {
          return component;
        }
        const disabled = action.disabledWhen && action.disabledWhen(rowData);
        let href = action.href || action.getHref && action.getHref(rowData);
        if (!href || disabled) {
          href = 'javascript:void(0)';
        }
        return (
          <a
            className={disabled && 'disabled'}
            onClick={
              !disabled && action.onClick && action.onClick.bind(null, rowData)
            }
            href={href}
            key={i}
          >
            {action.label || action.getLabel(rowData)}
          </a>
        );

      }).reduce((prev, cur, idx) => { // join ' | ' between actions
        if (idx) {
          prev = prev.concat(' | ');
        }
        let ret = prev.concat(cur);
        return ret;
      }, [])}
    </Cell>
  );
};
