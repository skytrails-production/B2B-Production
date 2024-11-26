import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Rate,
  Upload,
  Row,
  Col,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./CreateReview.css";
import { apiURL } from "../../../../../Constants/constant";

const CreateReview = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const selectedPackage = JSON.parse(sessionStorage.getItem("selectedPackage"));
  console.log(selectedPackage?._id, "selectedPackage");

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append all form values to formData
    Object.entries(values).forEach(([key, value]) => {
      if (key === "images" && value?.fileList) {
        value.fileList.forEach((file) =>
          formData.append("images", file.originFileObj)
        );
      } else {
        formData.append(key, value);
      }
    });

    // Append packageId from sessionStorage
    if (selectedPackage?._id) {
      formData.append("packageId", selectedPackage._id);
    }

    setLoading(true);
    try {
      await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/review/createPackageReview`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      message.success("Review submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-container">
      <div className="review-card">
        <h2 className="form-title">Create Package Review</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="review-form"
        >
          <Row gutter={[16, 16]}>
            {/* Name */}
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>

            {/* Title */}
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Title is required" }]}
              >
                <Input placeholder="Enter review title" />
              </Form.Item>
            </Col>
          </Row>

          {/* Description */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your review" />
          </Form.Item>

          <Row gutter={[16, 16]}>
            {/* Travel Date */}
            <Col span={12}>
              <Form.Item
                name="travelDate"
                label="Travel Date"
                // rules={[
                //   { required: true, message: "Travel date is required" },
                // ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            {/* Star Rating */}
            <Col span={12}>
              <Form.Item
                name="starRating"
                label="Star Rating"
                rules={[
                  { required: true, message: "Star rating is required" },
                ]}
              >
                <Rate />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* Package Type */}
            <Col span={12}>
              <Form.Item name="packageType" label="Package Type">
                <Input placeholder="Enter package type" />
              </Form.Item>
            </Col>
          </Row>

          {/* Positive Review Checkbox */}
          <Form.Item name="isPositive" valuePropName="checked">
            <Checkbox>Is this a positive review?</Checkbox>
          </Form.Item>

          {/* Upload Images */}
          <Form.Item name="images" label="Upload Images">
            <Upload
              listType="picture"
              multiple
              beforeUpload={() => false} // Prevent auto-upload
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateReview;
