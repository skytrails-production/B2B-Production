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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiURL } from "../../../Constants/constant";
import { useLocation } from "react-router-dom";
const { Title } = Typography;

const HolidayAddImages = () => {
  const location = useLocation();
  const { id } = location.state || {};

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

  const packageId = localStorage.getItem("packageid");

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

    if (checked) {
      // Reset all checkboxes except the one being checked
      setFormData({
        stays: false,
        destinations: false,
        activities: false,
        [name]: true,
      });

      // Clear images for other unchecked categories
      setImages({
        stays: [],
        destinations: [],
        activities: [],
      });
    } else {
      // Uncheck the current checkbox
      setFormData((prevData) => ({
        ...prevData,
        [name]: false,
      }));

      setImages((prevImages) => ({
        ...prevImages,
        [name]: [],
      }));
    }
  };

  const handleFileChange = (key, fileList) => {
    setImages((prevImages) => ({
      ...prevImages,
      [key]: fileList,
    }));
  };

  const handleSubmit = async () => {
    setLoader(true);

    if (!id) {
      message.error("No package ID found in route state.");
      setLoader(false);
      return;
    }

    const url = `${apiURL.baseURL}/skyTrails/holidaypackage/addimages`;
    const formDataToSend = new FormData();

    formDataToSend.append("packageId", id); // Append id to the form data
    const selectedKeywords = Object.keys(formData)
      .filter((key) => formData[key])
      .join(",");
    formDataToSend.append("keyword", selectedKeywords);

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
      title={<Title level={3}>Add Images to Your Holiday Package</Title>}
      bordered={false}
      style={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form onFinish={handleSubmit} layout="vertical">
        <Row gutter={[16, 16]}>
          {/* <Col span={24}>
            <Checkbox
              checked={formData.stays}
              onChange={handleCheckboxChange}
              name="stays"
            >
              Stays
            </Checkbox>
            {formData.stays && (
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
            )}
          </Col>

          <Col span={24}>
            <Checkbox
              checked={formData.destinations}
              onChange={handleCheckboxChange}
              name="destinations"
            >
              Destinations
            </Checkbox>
            {formData.destinations && (
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
            )}
          </Col>

          <Col span={24}>
            <Checkbox
              checked={formData.activities}
              onChange={handleCheckboxChange}
              name="activities"
            >
              Activities
            </Checkbox>
            {formData.activities && (
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
            )}
          </Col> */}
          <Checkbox
            checked={formData.stays}
            onChange={handleCheckboxChange}
            name="stays"
          >
            Stays
          </Checkbox>
          {formData.stays && (
            <Form.Item label="Upload Stays Images">
              <Upload
                multiple
                accept="image/*"
                fileList={images.stays}
                onChange={({ fileList }) => handleFileChange("stays", fileList)}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Select Files</Button>
              </Upload>
            </Form.Item>
          )}

          <Checkbox
            checked={formData.destinations}
            onChange={handleCheckboxChange}
            name="destinations"
          >
            Destinations
          </Checkbox>
          {formData.destinations && (
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
          )}

          <Checkbox
            checked={formData.activities}
            onChange={handleCheckboxChange}
            name="activities"
          >
            Activities
          </Checkbox>
          {formData.activities && (
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
          )}
        </Row>

        <Space style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" loading={loader} block>
            {loader ? "Submitting..." : "Submit Request"}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default HolidayAddImages;
