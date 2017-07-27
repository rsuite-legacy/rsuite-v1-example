import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'rsuite';
import { FormattedMessage } from 'react-intl';

const propTypes = {
  status: React.PropTypes.oneOf(['', 'ENABLE', 'DISABLE']),
  onClick: React.PropTypes.func
};

class ButtonGroupStatusRadio extends Component {
  constructor(props) {
    super(props);
  }

  handleSelect(activeButton) {
    const { onClick } = this.props;
    onClick && onClick(activeButton.props.dataKey);
  }

  render() {
    const items = [
      {
        dataKey: '',
        title: <FormattedMessage id="all" />
      }, {
        dataKey: 'ENABLE',
        title: <FormattedMessage id="enabled" />
      }, {
        dataKey: 'DISABLE',
        title: <FormattedMessage id="disabled" />
      }
    ];

    const buttons = items.map((item, index) => {
      const classes = item.dataKey === this.props.status ? 'active' : '';
      return (
        <Button
          shape="default"
          key={index}
          dataKey={item.dataKey}
          className={classes}
        >
          {item.title}
        </Button>
      );
    });
    return (
      <ButtonGroup type='radio' onSelect={this.handleSelect}>
        {buttons}
      </ButtonGroup>
    );
  }
}
ButtonGroupStatusRadio.propTypes = propTypes;

export default ButtonGroupStatusRadio;
