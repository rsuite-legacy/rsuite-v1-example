import React, { Component } from 'react';
import classNames from 'classnames';
import { Form, Field, createFormControl } from 'form-lib';
import { SchemaModel, StringType } from 'rsuite-schema';
import _ from 'lodash';


import {
  Button, FormGroup, ControlLabel, HelpBlock,
  FormControl, InputGroup, Checkbox, IconFont
} from 'rsuite';

import { API_CAPTCHA_JPG } from '../constants/APIs';
import CustormField from './CustomField';


const LoginModel = SchemaModel({
  username: StringType().isEmail('邮箱格式错误').isRequired('请输入邮箱'),
  password: StringType().rangeLength(6, 30, '密码必须是6-30个字符').isRequired('请输入密码'),
  captcha: StringType().rangeLength(4, 4, '验证码必须是4个字符').isRequired('请输入验证码')
});

const propTypes = {
  onLogin: React.PropTypes.func,
  errors: React.PropTypes.obejct,
  status: React.PropTypes.string,
  message: React.PropTypes.string,
  onFetchMenu: React.PropTypes.func
};

const contextTypes = {
  router: React.PropTypes.object.isRequired
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      errors: {},
      captcha: API_CAPTCHA_JPG
    };
  }

  handleSubmit = () => {
    const { formData } = this.state;
    if (!this.form.check()) {
      console.error('数据格式有错误');
      return;
    }
    // do something when login success
    alert('登录成功');
    this.context.router.push('/');
  }

  updateCaptcha() {
    this.setState({
      captcha: API_CAPTCHA_JPG + '?' + Date.now()
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.getForm().reset();
      this.setState({
        formData: {
          username: this.formData.username,
          captcha: '',
          password: ''
        }
      });
      this.updateCaptcha();
    }
  }

  handleFormChange = (values) => {
    this.setState({
      formData: values
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <Form
          ref={ref => this.form = ref}
          onChange={this.handleFormChange}
          onCheck={errors => this.setState({ errors })}
          defaultValues={this.state.formData}
          model={LoginModel}
          checkTrigger="blur"
          >

          <FormGroup className={errors['username'] ? 'has-error' : ''}>
            <InputGroup inside size="lg">
              <InputGroup.Addon>
                <IconFont icon="user" />
              </InputGroup.Addon>
              <Field name="username" placeholder="邮箱" />
            </InputGroup>
            <HelpBlock className={errors['username'] ? 'error' : ''}>{errors['username']}</HelpBlock>
          </FormGroup>

          <FormGroup className={errors['password'] ? 'has-error' : ''}>
            <InputGroup inside size="lg">
              <InputGroup.Addon>
                <IconFont icon="lock" />
              </InputGroup.Addon>
              <Field name="password" type="password" placeholder="密码" />
            </InputGroup>
            <HelpBlock className={errors['password'] ? 'error' : ''}>{errors['password']}</HelpBlock>
          </FormGroup>


          <FormGroup className={errors['captcha'] ? 'has-error' : ''}>
            <InputGroup inside size="lg">
              <InputGroup.Addon>
                <IconFont icon="shield" />
              </InputGroup.Addon>
              <Field name="captcha" placeholder="验证码" />
              <InputGroup.Addon>
                <img onClick={this.updateCaptcha} height={40} className="captcha" src={this.state.captcha} />
              </InputGroup.Addon>
            </InputGroup>
            <HelpBlock className={errors['captcha'] ? 'error' : ''}>{errors['captcha']}</HelpBlock>
          </FormGroup>

          <Button shape="primary" block size="lg" onClick={this.handleSubmit}>登录</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = propTypes;
Login.contextTypes = contextTypes;
export default Login;
