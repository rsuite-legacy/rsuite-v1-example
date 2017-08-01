import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormGroup,
  RadioList,
  FormControl,
  Radio,
  ControlLabel,
  HelpBlock,
  RadioGroup
} from 'rsuite';
import {
  Form,
  Field
} from 'form-lib';
import { SchemaModel, StringType } from 'rsuite-schema';
import { FormattedMessage } from 'react-intl';

import { CustomField } from '../CustomField';

const UserModel = SchemaModel({
  'systemRole.name': StringType().isRequired('该字段不能为空')
});


const propTypes = {
  show: PropTypes.bool,
  onHideModal: PropTypes.func,
  onSubmit: PropTypes.func,
  user: PropTypes.object
};
class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formData: {
        name: 'superman'
      }
    };
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit();
  }

  handleFormChange = (values) => {
    this.setState({
      formData: values
    });
  }

  render() {
    const { errors, formData } = this.state;
    const { show, onHideModal, user = {} } = this.props;

    return (
      <Modal autoResizeHeight show={show} onHide={onHideModal} className="UserModal">
        <Modal.Header>
          <Modal.Title>编辑用户</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            ref={(ref) => {
              this.form = ref;
            }}
            onCheck={(errors) => {
              this.setState({ errors });
            }}
            model={UserModel}
            onChange={this.handleFormChange}
            defaultValues={user}
          >
            <CustomField
              name="name"
              label={<FormattedMessage id="username" />}
              accepter={FormControl}
              errors={errors.name}
            />

            <CustomField
              name="email"
              label={<FormattedMessage id="email" />}
              accepter={FormControl}
              errors={errors.name}
            />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit} shape="primary">
            <FormattedMessage id="confirm" />
          </Button>
          <Button onClick={onHideModal} shape="default">
            <FormattedMessage id="cancel" />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

UserModal.propTypes = propTypes;

export default UserModal;
