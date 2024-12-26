import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Card,
  Row,
  Col,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import { useLocation } from "react-router-dom";
import "./AddItineraryImage.css"; // Import custom styles

const AddItineraryImage = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleAddItineraryImage = async (values) => {
    const formData = new FormData();
    formData.append("itineraryDay", values.itineraryDay);

    formData.append("packageId", id); // Add the 'id' to the formData
    values.files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      setLoading(true);
      await axios.post(
        `${apiURL.baseURL}/skytrails/holidaypackage/additinerary/images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      message.success("Itinerary images added successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to add itinerary images.");
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Add Itinerary Images"
      bordered={false}
      style={{ width: "60%", margin: "0 auto", marginBottom: "8px" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddItineraryImage}
        initialValues={{ itineraryDay: "", packageId: "", files: [] }}
      >
        {/* Itinerary Day */}
        <Form.Item
          label="Itinerary Day"
          name="itineraryDay"
          rules={[
            { required: true, message: "Please enter the itinerary day" },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter itinerary day"
            style={{ borderRadius: "10px", padding: "12px 16px" }}
          />
        </Form.Item>

        {/* Upload Files */}
        <Form.Item
          label="Upload Files"
          name="files"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            { required: true, message: "Please upload at least one file" },
          ]}
        >
          <Upload
            beforeUpload={() => false} // Prevent automatic upload
            multiple
            accept="image/*"
            listType="picture-card"
            showUploadList={{
              showRemoveIcon: true,
              showPreviewIcon: true,
            }}
            className="upload-container"
          >
            <div className="upload-button">
              <UploadOutlined style={{ fontSize: "24px" }} />
              <div style={{ marginTop: 8, fontSize: "16px" }}>
                Upload Images
              </div>
            </div>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
                style={{ width: "100%" }}
              >
                {loading ? "Uploading..." : "Add Images"}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddItineraryImage;
