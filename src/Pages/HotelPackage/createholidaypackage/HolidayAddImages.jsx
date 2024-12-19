import React, { useState } from "react";
import {
  Checkbox,
  Upload,
  Button,
  Typography,
  Form,
  Space,
  Card,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiURL } from "../../../Constants/constant";
import { useLocation } from "react-router-dom";
import { Select,Input } from "antd";

const { Title } = Typography;

const HolidayAddImages = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    stays: false,
    destinations: false,
    activities: false,
  });

  const [images, setImages] = useState({
    stays: [],
    destinations: [],
    activities: [],
  });

  const [loader, setLoader] = useState(false);

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: checked,
  //   }));

  //   if (!checked) {
  //     setImages((prevImages) => ({
  //       ...prevImages,
  //       [name]: [],
  //     }));
  //   }
  // };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    // Set all checkboxes to false, then update the selected one
    setFormData({
      stays: false,
      destinations: false,
      activities: false,
      [name]: checked, // Set the currently clicked checkbox to true
    });

    // Clear all images if any checkbox is unchecked
    setImages({
      stays: [],
      destinations: [],
      activities: [],
    });
  };

  const handleFileChange = (key, fileList) => {
    setImages((prevImages) => ({
      ...prevImages,
      [key]: fileList,
    }));
  };

  // const handleSubmit = async () => {
  //   setLoader(true);

  //   if (!id) {
  //     message.error("No package ID found in route state.");
  //     setLoader(false);
  //     return;
  //   }

  //   const url = `${apiURL.baseURL}/skyTrails/holidaypackage/addimages`;
  //   const formDataToSend = new FormData();

  //   formDataToSend.append("packageId", id);
  //   const selectedKeywords = Object.keys(formData)
  //     .filter((key) => formData[key])
  //     .join(",");
  //   formDataToSend.append("keyword", selectedKeywords);

  //   Object.keys(images).forEach((key) => {
  //     images[key].forEach((file) => {
  //       formDataToSend.append("files", file.originFileObj);
  //     });
  //   });

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       body: formDataToSend,
  //     });

  //     if (response.ok) {
  //       message.success("Images uploaded successfully!");
  //       setFormData({
  //         stays: false,
  //         destinations: false,
  //         activities: false,
  //       });
  //       setImages({
  //         stays: [],
  //         destinations: [],
  //         activities: [],
  //       });
  //     } else {
  //       const errorData = await response.json();
  //       message.error(`Failed to upload images. ${errorData.message || ""}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     message.error("Error uploading images.");
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  const handleSubmit = async () => {
    setLoader(true);

    if (!id) {
      message.error("No package ID found in route state.");
      setLoader(false);
      return;
    }

    const url = `${apiURL.baseURL}/skyTrails/holidaypackage/addimages`;
    const formDataToSend = new FormData();

    formDataToSend.append("packageId", id);
    const selectedKeywords = Object.keys(formData)
      .filter((key) => formData[key])
      .join(",");
    formDataToSend.append("keyword", selectedKeywords);

    if (formData.stays) {
      formDataToSend.append("hotelType", form.getFieldValue("hotelType"));
      formDataToSend.append("hotelName", form.getFieldValue("hotelName"));
      formDataToSend.append("day", form.getFieldValue("day"));
    }

    Object.keys(images).forEach((key) => {
      images[key].forEach((file) => {
        formDataToSend.append("files", file.originFileObj);
      });
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        message.success("Images uploaded successfully!");
        setFormData({
          stays: false,
          destinations: false,
          activities: false,
        });
        setImages({
          stays: [],
          destinations: [],
          activities: [],
        });
      } else {
        const errorData = await response.json();
        message.error(`Failed to upload images. ${errorData.message || ""}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error uploading images.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <Card
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "40px auto",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Add Images to Holiday Package
      </Title>
      {/* //<Form onFinish={handleSubmit} layout="vertical"> */}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Stays Section */}
        <Row style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Card
              hoverable
              size="small"
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Checkbox
                checked={formData.stays}
                onChange={handleCheckboxChange}
                name="stays"
              >
                Stays
              </Checkbox>
              {formData.stays && (
                <>
                  <Divider />
                  <Form.Item
                    label="Hotel Type"
                    name="hotelType"
                    rules={[
                      {
                        required: true,
                        message: "Please select a hotel type!",
                      },
                    ]}
                  >
                    <Select placeholder="Select Hotel Type">
                      <Select.Option value="Standard">Standard</Select.Option>
                      <Select.Option value="Deluxe">Deluxe</Select.Option>
                      <Select.Option value="Luxury">Luxury</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Hotel Name"
                    name="hotelName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the hotel name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Hotel Name" />
                  </Form.Item>

                  <Form.Item
                    label="Day"
                    name="day"
                    rules={[
                      { required: true, message: "Please select the day!" },
                    ]}
                  >
                    <Input type="number" placeholder="Enter Number of Days" />
                  </Form.Item>

                  <Form.Item label="Upload Stays Images">
                    <Upload
                      multiple
                      accept="image/*"
                      fileList={images.stays}
                      onChange={({ fileList }) =>
                        handleFileChange("stays", fileList)
                      }
                      beforeUpload={() => false}
                    >
                      <Button icon={<UploadOutlined />}>Select Files</Button>
                    </Upload>
                  </Form.Item>
                </>
              )}
            </Card>
          </Col>
        </Row>

        {/* Destinations Section */}
        <Row style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <Card
              hoverable
              size="small"
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Checkbox
                checked={formData.destinations}
                onChange={handleCheckboxChange}
                name="destinations"
              >
                Destinations
              </Checkbox>
              {formData.destinations && (
                <>
                  <Divider />
                  <Form.Item label="Upload Destinations Images">
                    <Upload
                      multiple
                      accept="image/*"
                      fileList={images.destinations}
                      onChange={({ fileList }) =>
                        handleFileChange("destinations", fileList)
                      }
                      beforeUpload={() => false}
                    >
                      <Button icon={<UploadOutlined />}>Select Files</Button>
                    </Upload>
                  </Form.Item>
                </>
              )}
            </Card>
          </Col>
        </Row>

        {/* Activities Section */}
        <Row>
          <Col span={24}>
            <Card
              hoverable
              size="small"
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Checkbox
                checked={formData.activities}
                onChange={handleCheckboxChange}
                name="activities"
              >
                Activities
              </Checkbox>
              {formData.activities && (
                <>
                  <Divider />
                  <Form.Item label="Upload Activities Images">
                    <Upload
                      multiple
                      accept="image/*"
                      fileList={images.activities}
                      onChange={({ fileList }) =>
                        handleFileChange("activities", fileList)
                      }
                      beforeUpload={() => false}
                    >
                      <Button icon={<UploadOutlined />}>Select Files</Button>
                    </Upload>
                  </Form.Item>
                </>
              )}
            </Card>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <Button
              htmlType="submit"
              loading={loader}
              style={{
                padding: "8px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                backgroundColor: "#21325D",
                color: "white",
              }}
            >
              {loader ? "Submitting..." : "Submit Images"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default HolidayAddImages;
