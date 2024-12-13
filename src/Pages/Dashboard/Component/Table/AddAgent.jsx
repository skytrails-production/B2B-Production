import React, { useState } from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../../../Constants/constant';

const CreateAgentPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,  // Added to trigger form value changes manually
    clearErrors,  // Used to clear individual field errors
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/createAgent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(`Agent ${formData.firstName} created successfully!`);
        setTimeout(() => navigate('/admin/dashboard'), 3000);
      } else if (response.status === 409) {
        setMessage(`Agent ${formData.firstName} already exists.`);
      } else {
        setMessage('Failed to create agent. Please try again.');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handles clearing the error when the user starts typing
  const handleInputChange = (e, fieldName) => {
    // If there's an error, clear it when the user starts typing
    if (errors[fieldName]) {
      clearErrors(fieldName);
    }
    // Set the new value in the form
    setValue(fieldName, e.target.value, { shouldValidate: true });
  };

  return (
    <div style={{ width:'60%', margin: '50px auto', padding: '20px', background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" tip="Creating Agent..." />
        </div>
      )}

      {message && (
        <Alert
          message={message}
          type={message.includes('successfully') ? 'success' : 'error'}
          showIcon
          closable
          style={{ marginBottom: '20px' }}
        />
      )}

      <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Create Agent</h2>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="First Name" validateStatus={errors.firstName && 'error'} help={errors.firstName?.message}>
          <Input
            {...register('firstName', {
              required: 'First name is required',
            })}
            placeholder="Enter first name"
            onChange={(e) => handleInputChange(e, 'firstName')}
          />
        </Form.Item>

        <Form.Item label="Last Name" validateStatus={errors.lastName && 'error'} help={errors.lastName?.message}>
          <Input
            {...register('lastName', {
              required: 'Last name is required',
            })}
            placeholder="Enter last name"
            onChange={(e) => handleInputChange(e, 'lastName')}
          />
        </Form.Item>

        <Form.Item label="Email" validateStatus={errors.email && 'error'} help={errors.email?.message}>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="Enter email"
            onChange={(e) => handleInputChange(e, 'email')}
          />
        </Form.Item>

        <Form.Item label="Password" validateStatus={errors.password && 'error'} help={errors.password?.message}>
          <Input.Password
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Enter password"
            onChange={(e) => handleInputChange(e, 'password')}
          />
        </Form.Item>

        <Form.Item label="Mobile Number" validateStatus={errors.mobile_number && 'error'} help={errors.mobile_number?.message}>
          <Input
            {...register('mobile_number', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile number must be 10 digits',
              },
            })}
            placeholder="Enter mobile number"
            onChange={(e) => handleInputChange(e, 'mobile_number')}
          />
        </Form.Item>

        <Form.Item label="PAN Number" validateStatus={errors.panNumber && 'error'} help={errors.panNumber?.message}>
          <Input
            {...register('panNumber', {
              required: 'PAN number is required',
            })}
            placeholder="Enter PAN number"
            onChange={(e) => handleInputChange(e, 'panNumber')}
          />
        </Form.Item>

        <Form.Item label="Agency Name" validateStatus={errors.agency_name && 'error'} help={errors.agency_name?.message}>
          <Input
            {...register('agency_name', {
              required: 'Agency name is required',
            })}
            placeholder="Enter agency name"
            onChange={(e) => handleInputChange(e, 'agency_name')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ marginTop: '10px' }}>
            Create Agent
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAgentPage;
