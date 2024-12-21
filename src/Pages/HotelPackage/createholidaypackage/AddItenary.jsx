import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Checkbox,
  message,
  Select,
} from "antd";
import { apiURL } from "../../../Constants/constant";
import { InputNumber } from "antd";

const AddItenary = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const { TextArea } = Input;
  const [formData, setFormData] = useState({
    packageId: id || "",
    title: "",
    dayNumber: "",
    description: "",
    //hotelEvents: [{ title: "", name: "", description: "" }],

    flightEvents: [
      { from: "", to: "", fromAirPortCode: "", toAirPortCode: "" },
    ],
    transferEvents: [
      {
        title: "",

        fromLocation: "",
        toLocation: "",
      },
    ],

    leisureDayEvents: [{ title: "" }],
  });

  useEffect(() => {
    const packageId = localStorage.getItem("packageid");
    if (packageId) {
      setFormData((prevData) => ({ ...prevData, packageId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, index, key) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[key]];
    updatedArray[index][name] = value;
    setFormData({ ...formData, [key]: updatedArray });
  };

  const addToArray = (key, emptyObject) => {
    setFormData({ ...formData, [key]: [...formData[key], emptyObject] });
  };

  const removeFromArray = (key, index) => {
    const updatedArray = [...formData[key]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [key]: updatedArray });
  };

 
  const handleSubmit = () => {
    fetch(`${apiURL.baseURL}/skyTrails/holidaypackage/additinerary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("Raw Response:", response); // Logs the raw response object
        return response.json(); // Parse the JSON data
      })
      .then((data) => {
        if (data.status === 200) {
          message.success({
            content: data.message,
            style: { color: "green" }, // Green for success
          });
        } else if (data.status === 400) {
          message.error({
            content: data.message,
            style: { color: "red" }, // Red for error
          });
        } else {
          message.info({
            content: "Unexpected response.",
            style: { color: "blue" }, // Blue for unexpected
          });
        }
      })
      .catch((error) => {
        message.error({
          content: "Error adding itinerary.",
          style: { color: "red" }, // Red for fetch error
        });
        console.error("Error:", error);
      });
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="max-w-4xl mx-auto p-10 space-y-8"
      style={{
        backgroundColor: "#FFFFFF",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "8px",
        width: "60%",
      }}
    >
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Create Itinerary
      </h2>

      {/* Title and Day Number in One Row */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col span={12}>
          <Form.Item
            label="Daywise Location"
            name="title"
            initialValue={formData.title}
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Day Number"
            name="dayNumber"
            initialValue={formData.dayNumber}
            rules={[
              { required: true, message: "Please input the day number!" },
            ]}
          >
            <Input
              type="number"
              name="dayNumber"
              value={formData.dayNumber}
              onChange={handleChange}
              placeholder="Enter day number"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Description */}
      <Card title="Description" bordered={false} className="mb-6">
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please provide a description!" }]}
        >
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            rows={4}
          />
        </Form.Item>
      </Card>

      {/* Flight Events */}
      <Card title="Flight Events" bordered={false} className="mb-8">
        {formData.flightEvents.length > 0 ? (
          formData.flightEvents.map((event, index) => (
            <div key={index} className="mb-6">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="From"
                    name={`flightEvents[${index}][from]`}
                    initialValue={event.from}
                  >
                    <Input
                      name="from"
                      value={event.from}
                      onChange={(e) =>
                        handleArrayChange(e, index, "flightEvents")
                      }
                      placeholder="Enter from location"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="From Airport Code"
                    name={`flightEvents[${index}][fromAirPortCode]`}
                    initialValue={event.fromAirPortCode}
                  >
                    <Input
                      name="fromAirPortCode"
                      value={event.fromAirPortCode}
                      onChange={(e) =>
                        handleArrayChange(e, index, "flightEvents")
                      }
                      placeholder="Enter airport code"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="To"
                    name={`flightEvents[${index}][to]`}
                    initialValue={event.to}
                  >
                    <Input
                      name="to"
                      value={event.to}
                      onChange={(e) =>
                        handleArrayChange(e, index, "flightEvents")
                      }
                      placeholder="Enter to location"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="To Airport Code"
                    name={`flightEvents[${index}][toAirPortCode]`}
                    initialValue={event.toAirPortCode}
                  >
                    <Input
                      name="toAirPortCode"
                      value={event.toAirPortCode}
                      onChange={(e) =>
                        handleArrayChange(e, index, "flightEvents")
                      }
                      placeholder="Enter airport code"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]} justify="center">
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() => removeFromArray("flightEvents", index)}
                    className="w-full md:w-auto mb-4"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Remove Event
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() =>
                      addToArray("flightEvents", {
                        from: "",
                        fromAirPortCode: "",
                        to: "",
                        toAirPortCode: "",
                      })
                    }
                    className="w-full md:w-auto"
                  >
                    Add Flight Event
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-gray-500">
              No flight events added yet. Please add a flight event below:
            </p>
            <Button
              type="primary"
              onClick={() =>
                addToArray("flightEvents", {
                  from: "",
                  fromAirPortCode: "",
                  to: "",
                  toAirPortCode: "",
                })
              }
              className="w-full"
            >
              Add Flight Event
            </Button>
          </div>
        )}
      </Card>

      {/* Transfer Events */}
      {/* Transfer Events */}
      <Card title="Transfer Events" bordered={false} className="mb-8">
        {formData.transferEvents.length > 0 ? (
          formData.transferEvents.map((event, index) => (
            <div key={index} className="mb-6">
              {/* First Row: Title of Transfer */}
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Title of transfer"
                    name={`transferEvents[${index}][title]`}
                    initialValue={event.title}
                  >
                    <Input
                      name="title"
                      value={event.title}
                      onChange={(e) =>
                        handleArrayChange(e, index, "transferEvents")
                      }
                      placeholder="Enter title"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Second Row: From Location and To Location */}
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    label="From Location"
                    name={`transferEvents[${index}][fromLocation]`}
                    initialValue={event.fromLocation}
                  >
                    <Input
                      name="fromLocation"
                      value={event.fromLocation}
                      onChange={(e) =>
                        handleArrayChange(e, index, "transferEvents")
                      }
                      placeholder="Enter from location"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="To Location"
                    name={`transferEvents[${index}][toLocation]`}
                    initialValue={event.toLocation}
                  >
                    <Input
                      name="toLocation"
                      value={event.toLocation}
                      onChange={(e) =>
                        handleArrayChange(e, index, "transferEvents")
                      }
                      placeholder="Enter to location"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Buttons Row */}
              <Row gutter={[16, 16]} justify="center">
                <Col span={6}>
                  <Button
                    type="danger"
                    onClick={() => removeFromArray("transferEvents", index)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Remove Event
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() =>
                      addToArray("transferEvents", {
                        title: "",
                        fromLocation: "",
                        toLocation: "",
                      })
                    }
                    className="w-full md:w-auto"
                  >
                    Add Transfer Event
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <div className="text-center">
            <Button
              type="primary"
              onClick={() =>
                addToArray("transferEvents", {
                  title: "",
                  fromLocation: "",
                  toLocation: "",
                })
              }
              className="w-full md:w-auto"
            >
              Add Transfer Event
            </Button>
          </div>
        )}
      </Card>

      {/* Activity Events */}

      {/* Leisure Day Events */}
      <Card title="Leisure Day Events" bordered={false} className="mb-8">
        {formData.leisureDayEvents.length > 0 ? (
          formData.leisureDayEvents.map((event, index) => (
            <div key={index} className="mb-6">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item
                    label="Location Name"
                    name={`leisureDayEvents[${index}][title]`}
                    initialValue={event.title}
                  >
                    <Input
                      name="title"
                      value={event.title}
                      onChange={(e) =>
                        handleArrayChange(e, index, "leisureDayEvents")
                      }
                      placeholder="Location Name"
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]} justify="center">
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() => removeFromArray("leisureDayEvents", index)}
                    className="w-full md:w-auto mb-4"
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Remove Event
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    onClick={() =>
                      addToArray("leisureDayEvents", { title: "" })
                    }
                    className="w-full md:w-auto"
                  >
                    Add Leisure Day Event
                  </Button>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-gray-500">
              No leisure day events added yet. Please add a leisure day event
              below:
            </p>
            <Button
              type="primary"
              onClick={() => addToArray("leisureDayEvents", { title: "" })}
              className="w-full"
            >
              Add Leisure Day Event
            </Button>
          </div>
        )}
      </Card>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <Button type="primary" htmlType="submit" className="w-full md:w-1/3">
          Submit Itinerary
        </Button>
      </div>
    </Form>
  );
};

export default AddItenary;
