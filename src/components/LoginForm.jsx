/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input, Tooltip } from 'antd';
import './login.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class NormalLoginForm extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handle_login = (e, data) => {
    console.log(data);
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json?.user?.username,
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handle_login(e, values);
      }
    });
  };

  handleUserChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>
        <div className="form-group">
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true,
                },
              ],
            })(<Input onChange={this.handle_change} />)}
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ],
            })(<Input.Password onChange={this.handle_change} />)}
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}
const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
};
