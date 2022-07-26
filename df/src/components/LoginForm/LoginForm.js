import React, { useEffect, useState } from 'react';
import './LoginForm.css';

import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AuthService from '../../services/AuthService';

import { useNavigate } from "react-router-dom";


const LoginForm = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  let setGlobalUser = props.setUser;
  const onFinish = (values) => {
    setIsLoading(true);
    console.log('Received values of form: ', values);
    AuthService.login(values.username, values.password).then(
      () => {
        setGlobalUser(AuthService.getCurrentUser);
        return (navigate("/individual-reports"));
      });
  };

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      return navigate("/individual-reports");
    }
  }, []);

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>



      <Form.Item>
        {!isLoading &&
          <>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </>
        }
        {isLoading && <Spin />}



      </Form.Item>
    </Form>
  );
};


export default LoginForm;
