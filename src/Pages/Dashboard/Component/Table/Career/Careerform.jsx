import React,{useState,useEffect} from 'react'
import { CircularProgress } from "@mui/material";
import { Form, Input, Select, Button, Tag, Tooltip, DatePicker  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { apiURL } from '../../../../../Constants/constant';
import axios from 'axios';
import Swal from 'sweetalert2';


const { Option } = Select;
const { TextArea } = Input;

function Careerform() {
  const [load, setLoad] = useState(false);
  const [parentcategory, setParentCategory] = useState();
  const [jobCategories, setJobCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    fetchJobCategories1();
}, []);


  // const [form] = Form.useForm();

  // const onFinish = (values) => {
  //   console.log('Form Values:', values);
  // };

  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedTag) => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  // ///////////////////////////////////////////////////////////////////////////////


  const fetchJobCategories1 = async () => {
    setLoad(true);
    try {
        const response = await axios.get(`${apiURL.baseURL}/skyTrails/api/career/getskyjobcategory`);
        if (response.data.success === 1) {
            setJobCategories(response.data.data.result);
            setLoaded(true); // Set loaded to true after successful fetch
        } else {
            console.error('Failed to fetch job categories:');
        }
    } catch (error) {
        console.error('Error fetching job categories:', error);
    } finally {
        setLoad(false);
    }
};




const handleSelectClick = () => {
if (!loaded) {
  fetchJobCategories1();
}
};



const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoad(true);
    const payload = {
      skyJobCategoriesId: values.skyjobs,
      designation: values.Designation,
      aboutCompany: values.aboutCompany,
      jobDescription: values.description,
      desiredProfile: values.Desired_Profile,
      preferredIndustry: values.Prefered_industry,
      jobFunctions: values.Job_function,
      responsibilities: values.Responsibilities,
      expirience: values.Experience,
      description: values.description,
      jobType: values.Job_type,
      locationType: values.Location_type,
      country: values.Country,
      state: values.State,
      city: values.City,
      skills: tags,
      openingAt: values.Date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    };

    try {
      const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/career/createjob`, payload);
      // if (response.data.success === 1) {
        // console.log('Job created successfully:', response.data);
        form.resetFields();
        Swal.fire("Form Submitted");
        setTags([]);
      // } else {
        // console.error('Failed to create job:', response.data.message);
      // }
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setLoad(false);
    }
  };











 


  return (
    <div className="subada-table-container" elevation={3} style={{backgroundColor:"white"}} >
    {/* {load && (
      <div
        className="loader-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.5))",
          zIndex: 9999,
        }}
      >
        <CircularProgress
          color="primary"
          size={50}
          thickness={3}
          style={{
            position: "absolute",
            top: "50%",
            left: "49.8%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    )} */}
    {/* {message && (
      <div
        style={{
          backgroundColor: "#d4edda",
          color: "#155724",
          padding: "10px",       
          marginBottom: "30px",
          borderRadius: "5px",
        }}
      >
        {message}
      </div>
    )} */}
    <header  className="adsearch-bar" style={{ position: "absolute", top: 10, zIndex: 1, fontWeight: "bold", display: "flex", alignItems: "center",justifyContent:"center" }}>
      <div className="adtable-heading" style={{ marginLeft: "20px" ,textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>
        {/* <img src={profilePicUrl} style={{ width: "80%" }} alt="Logo" /> */}
        <h2 >Add Career</h2>
      </div>
    </header>
    
    <Form
           form={form}
        name="demo_form"
        layout="vertical"
        onFinish={onFinish}
      
      style={{marginTop:"60px"}}
    >
      <Form.Item
        name="aboutCompany"
        label="About Company"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input placeholder="Write about company" />
      </Form.Item>

      <Form.Item
                style={{width:"100%"}}
        name="skyjobs"
        label="Skyjob SubCategory"
        rules={[{ required: true, message: 'Please select an option' }]}
      >

{jobCategories && jobCategories.length > 0 ? (
        <Select
          placeholder="Select an option"
          onClick={handleSelectClick} 
          onFocus={handleSelectClick} 
        >
        
          {jobCategories.map(category => (
            <Select.Option key={category._id} value={category._id}>
              {category.categoryName}
            </Select.Option>
          ))}
        </Select>
):(
  <div>No data found</div>
)}
      </Form.Item>
      <Form.Item
        name="Designation"
        label="Designation"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input placeholder="Select Designation" />
      </Form.Item>

      <Form.Item
        name="Desired_Profile"
        label="Desired Profile"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input placeholder="Select Desired Profile" />
      </Form.Item>

      <Form.Item
        name="Prefered_industry"
        label="Prefered Industry"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input placeholder="Select Prefered Industry" />
      </Form.Item>

      <Form.Item
        name="Job_function"
        label="Job Function"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input placeholder="Select Job Function" />
      </Form.Item>


      <Form.Item
        name="Responsibilities"
        label="Responsibilities"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input placeholder="Select Job Responsibilities" />
      </Form.Item>

      <Form.Item
        name="Experience"
        label="Experience"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Select placeholder="Select an option">
          <Option value="0-1">0 - 1 years</Option>
          <Option value="1-2">1 - 2 years</Option>
          <Option value="2-3">2 - 3 years</Option>
          <Option value="3-4">3 - 4 years</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input your message!' }]}
      >
        <TextArea rows={4} placeholder="Write Description" />
      </Form.Item>

      <Form.Item
        name="Job_type"
        label="Job Type"
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select placeholder="Select an option">
          <Option value="Full-Time">FULLTIME</Option>
          <Option value="Part-time">PARTTIME</Option>
          <Option value="Internship">INTERNSHIP</Option>
          <Option value="Remote">REMOTE</Option>
        </Select>
      </Form.Item>


      <Form.Item
        name="Location_type"
        label="Location "
        rules={[{ required: true, message: 'Please select an option!' }]}
      >
        <Select placeholder="Select an option">
          <Option value="All">ALL</Option>
          <Option value="On-site">ONSITE</Option>
          <Option value="Hybrid">HYBRID</Option>
          <Option value="Remote">REMOTE</Option>
        </Select>
      </Form.Item>


      <Form.Item
        name="Country"
        label="Country"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="State"
        label="State"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="City"
        label="City"
        rules={[{ required: true, message: 'Fill this field' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Skills" >
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag
              key={tag}
              closable
              onClose={() => handleClose(tag)}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            type="text"
            size="small"
            style={{ width: 80}}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            <PlusOutlined /> Skill
          </Tag>
        )}
      </Form.Item>



      <Form.Item
  name="Date"
  label="Date"
  rules={[{ required: true, message: 'Fill this field' }]}
>
  <DatePicker 
    format="YYYY-MM-DD"
    placeholder="Select Date"
  />
</Form.Item>











      <Form.Item style={{display:"flex",justifyContent:"center"}}>
        <Button htmlType="submit" style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid blue",textAlign:"center",fontSize:"18px"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>

  </div>
  )
}

export default Careerform