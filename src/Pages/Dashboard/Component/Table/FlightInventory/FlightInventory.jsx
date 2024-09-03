import React from 'react';
import { Form, Input, InputNumber, Button, DatePicker } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../../Constants/constant';
import Swal from 'sweetalert2';

function FlightInventory() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
      // Adjust the date format to match the expected API format
      const formattedValues = {
        ...values,
        flightDate: values.flightDate.toISOString(),
      };
  
      axios.post(`${apiURL.baseURL}/skyTrails/api/Inventory/flights`, formattedValues)
        .then(response => {
          form.resetFields();
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });

        })
        
        .catch(error => {
          console.error('There was an error submitting the flight data:', error);
          
        });
    };

  return (
    <>

    <div className="subada-table-container" elevation={3} style={{backgroundColor:"white"}}> 
    <header  className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center",justifyContent:"center" }}>
      <div className="adtable-heading" style={{ marginLeft: "20px" ,textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>
      
        <h2>Flight Inventory</h2>
      </div>
    </header>
 <Form
  style={{marginTop:"60px"}}
      form={form}
      name="flight_form"
      onFinish={onFinish}
      layout="vertical"
      
    >
      <Form.Item
        name="flightNumber"
        label={<span style={{ fontSize: '18px' }}>Flight Number</span>}
        rules={[{ required: true, message: 'Please input the flight number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      
        name="flightName"
        label={<span style={{ fontSize: '18px' }}>Flight Name</span>}
        rules={[{ required: true, message: 'Please input the flight name!' }]}
      >
        <Input />
      </Form.Item>

<div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",gap:"12px"}}>
<Form.Item
style={{width:"100%"}}
        name="flightDate"
        label={<span style={{ fontSize: '18px' }}>Flight Date</span>}
        rules={[{ required: true, message: 'Please select the flight date!' }]}
      >
        <DatePicker  style={{width:"100%"}}/>
      </Form.Item>

      <Form.Item
      style={{width:"100%"}}
        name="price"
        label={<span style={{ fontSize: '18px' }}>Price</span>}
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <Input />
      </Form.Item>
</div>
     

<div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",gap:"12px"}}>
<Form.Item
style={{width:"100%"}}
        name="fareRule"
        label={<span style={{ fontSize: '18px' }}>Fare Rule</span>}
        rules={[{ required: true, message: 'Please input the fare rule!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
      style={{width:"100%"}}
        name="cancellationCharge"
        label={<span style={{ fontSize: '18px' }}>Cancellation Charge</span>}
        rules={[{ required: true, message: 'Please input the cancellation charge!' }]}
      >
        <Input />
      </Form.Item>

</div>
     
     <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",gap:"12px"}}>
      <Form.Item
      style={{width:"100%"}}
        name="baggage"
        label={<span style={{ fontSize: '18px' }}>Baggage</span>}
        rules={[{ required: true, message: 'Please input the baggage allowance!' }]}
      >
         <Input />
      </Form.Item>

      <Form.Item
      style={{width:"100%"}}
        name="flightCode"
        label={<span style={{ fontSize: '18px' }}>Flight Code</span>}
        rules={[{ required: true, message: 'Please input the flight code!' }]}
      >
         <Input />
      </Form.Item>
      </div>

      <Form.Item style={{textAlign:"center", fontSize:" 18px"}}>
        <Button type="primary" htmlType="submit" style={{fontSize:"18px"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  )
}

export default FlightInventory