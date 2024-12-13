import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [isRegistering, setIsRegistering] = React.useState(false);

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        message.success('Registered successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        message.success('Logged in successfully!');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
          name="firstname"
          label="Firstname"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password />
        </Form.Item>
        
        <Button
          type="link"
          onClick={() => setIsRegistering((prev) => !prev)}
        >
          {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
        </Button>
        <Button type="primary" htmlType="submit">
          {isRegistering ? 'Register' : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
