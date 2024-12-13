import React, { useState } from 'react';
import { Form, Input, Button, Select, Spin, Alert } from 'antd';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../../../Constants/constant';

const { Option } = Select;

const authArray = [
  'ADS_HANDLER',
  'PACKAGE_HANDLER',
  'REQUEST_HANDLER',
  'BOOKING_MANAGER',
  'CUSTOMER_SUPPORT',
  'CONTENT_MANAGER',
  'FINANCIAL_SUBADMIN',
  'USER_MANAGER',
  'MARKETING_PROMOTIONS',
  'ANALYTICS_SUBADMIN',
  'VISA_PROCESSING',
  'SECURITY_COMPLIANCE',
  'LOCALIZATION_TRANSLATION',
  'EVENT_HANDLER',
  'COUPON_CODE_HANDLER',
  'AGENT_MANAGER',
];

const CreateSubAdminPage = () => {
  const [form] = Form.useForm();
  const [chipData, setChipData] = useState({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddChip = () => {
    if (input.trim()) {
      const nextTaskNumber = Object.keys(chipData).length + 1;
      setChipData((chips) => ({ ...chips, [`task${nextTaskNumber}`]: input }));
      setInput('');
    }
  };

  const handleRemoveChip = (chipKey) => {
    const { [chipKey]: removedChip, ...remainingChips } = chipData;
    setChipData(remainingChips);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setMessage('');

    const requestData = {
      ...values,
      dynamicProperties: chipData,
    };

    try {
      const response = await fetch(`${apiURL.baseURL}/skytrails/api/subAdmin/createSubAdmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      setLoading(false);

      if (response.ok) {
        setMessage(`Subadmin ${values.username} created successfully!`);
        setTimeout(() => navigate('/admin/dashboard'), 3000);
      } else {
        setMessage('Failed to create subadmin.');
      }
    } catch (error) {
      console.error('Error creating subadmin:', error.message);
      setMessage('An error occurred while creating subadmin.');
      setLoading(false);
    }
  };

  return (
    <div style={{ width:'60%', margin: '50px auto', padding: 20, background: '#fff', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      {loading && (
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Spin tip="Creating Subadmin..." />
        </div>
      )}

      {message && (
        <Alert
          message={message}
          type={message.includes('successfully') ? 'success' : 'error'}
          showIcon
          closable
          style={{ marginBottom: 20 }}
        />
      )}

      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Create Subadmin</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter a username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter a password' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="mobile_number"
          label="Mobile Number"
          rules={[{ required: true, message: 'Please enter a mobile number' }]}
        >
          <Input placeholder="Enter mobile number" />
        </Form.Item>

        <Form.Item label="Properties">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
            {Object.entries(chipData).map(([key, value]) => (
              <div
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f0f0f0',
                  padding: '5px 10px',
                  borderRadius: 20,
                }}
              >
                <span>{value}</span>
                <button
                  onClick={() => handleRemoveChip(key)}
                  style={{
                    background: 'none',
                    border: 'none',
                    marginLeft: 10,
                    color: '#ff4d4f',
                    cursor: 'pointer',
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a property"
              onPressEnter={handleAddChip}
            />
            <Button icon={<FaPlus />} onClick={handleAddChip}>
              Add
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name="authType"
          label="Auth Type"
          rules={[{ required: true, message: 'Please select an auth type' }]}
        >
          <Select placeholder="Select auth type">
            {authArray.map((authType) => (
              <Option key={authType} value={authType}>
                {authType}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create Subadmin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateSubAdminPage;
