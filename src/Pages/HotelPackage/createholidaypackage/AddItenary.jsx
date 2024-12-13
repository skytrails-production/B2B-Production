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
    hotelEvents: [
      {
        title: "",
        name: "",
        description: "",
        hotelStar: 3, // Default star rating
        checkIn: "",
        checkOut: "",
        numberOfNights:""
      },
    ],
    flightEvents: [
      {from: "", to: "", fromAirPortCode: "", toAirPortCode: "" },
    ],
    transferEvents: [
      {
        title: "",

        fromLocation: "",
        toLocation: "",
      },
    ],
    activityEvents: [{ title: "" }],
    leisureDayEvents: [{ title: "" }],
    mealsIncluded: [],
    mealsIncludedWithHotels: [{ location: "", meal: "" }],
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

  const handleCheckboxChange = (checkedValues) => {
    setFormData({ ...formData, mealsIncluded: checkedValues });
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

      <Card title="Hotel Events" bordered={false} className="mb-8">
        {formData.hotelEvents.map((event, index) => (
          <div key={index} className="mb-6">
            {/* First Row: Title and Name */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Room Type"
                  name={`hotelEvents[${index}][title]`}
                  initialValue={event.title}
                >
                  <Input
                    name="title"
                    value={event.title}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter title"
                    className="w-full"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Hotel Name"
                  name={`hotelEvents[${index}][name]`}
                  initialValue={event.name}
                >
                  <Input
                    name="name"
                    value={event.name}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter name"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Second Row: Description */}
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Description"
                  name={`hotelEvents[${index}][description]`}
                  initialValue={event.description}
                >
                  <TextArea
                    name="description"
                    value={event.description}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter description"
                    className="w-full"
                    rows={4} // Adjust the number of rows as needed
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Third Row: Hotel Star and Number of Nights */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Hotel Star"
                  name={`hotelEvents[${index}][hotelStar]`}
                  initialValue={event.hotelStar}
                >
                  <Select
                    name="hotelStar"
                    value={event.hotelStar}
                    onChange={(value) =>
                      handleArrayChange(
                        { target: { name: "hotelStar", value } },
                        index,
                        "hotelEvents"
                      )
                    }
                    placeholder="Select hotel star"
                    className="w-full"
                  >
                    <Select.Option value={3}>3</Select.Option>
                    <Select.Option value={4}>4</Select.Option>
                    <Select.Option value={5}>5</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Number of Nights"
                  name={`hotelEvents[${index}][numberOfNights]`}
                  initialValue={event.numberOfNights}
                >
                  <Input
                    name="numberOfNights"
                    type="number"
                    value={event.numberOfNights}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter number of nights"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Fourth Row: Check-In and Check-Out */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Check-In Time"
                  name={`hotelEvents[${index}][checkIn]`}
                  initialValue={event.checkIn}
                >
                  <Input
                    name="checkIn"
                    type="time"
                    value={event.checkIn}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter check-in date"
                    className="w-full"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Check-Out Time"
                  name={`hotelEvents[${index}][checkOut]`}
                  initialValue={event.checkOut}
                >
                  <Input
                    name="checkOut"
                    type="time"
                    value={event.checkOut}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter check-out date"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Buttons Row */}
            <Row gutter={[16, 16]} justify="center">
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() => removeFromArray("hotelEvents", index)}
                  className="w-full"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Remove Event
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() =>
                    addToArray("hotelEvents", {
                      title: "",
                      name: "",
                      description: "",
                      hotelStar: 3,
                      checkIn: "",
                      checkOut: "",
                      numberOfNights: "",
                    })
                  }
                  className="w-full"
                >
                  Add Hotel Event
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </Card>

      {/* Meals Included */}
      <Card title="Meals Included" bordered={false} className="mb-8">
        <Checkbox.Group
          name="mealsIncluded"
          value={formData.mealsIncluded}
          onChange={handleCheckboxChange}
          className="flex flex-wrap"
        >
          <Checkbox value="breakfast" className="w-full sm:w-1/2 lg:w-1/4">
            Breakfast
          </Checkbox>
          <Checkbox value="lunch" className="w-full sm:w-1/2 lg:w-1/4">
            Lunch
          </Checkbox>
          <Checkbox value="dinner" className="w-full sm:w-1/2 lg:w-1/4">
            Dinner
          </Checkbox>
        </Checkbox.Group>
      </Card>

      {/* Meals Included with Hotels */}
      <Card
        title="Meals Included with Hotels"
        bordered={false}
        className="mb-8"
      >
        {formData.mealsIncludedWithHotels.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  label="Location"
                  name={`mealsIncludedWithHotels[${index}][location]`}
                  initialValue={event.location}
                >
                  <Input
                    name="location"
                    value={event.location}
                    onChange={(e) =>
                      handleArrayChange(e, index, "mealsIncludedWithHotels")
                    }
                    placeholder="Enter location"
                    className="w-full"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Meal"
                  name={`mealsIncludedWithHotels[${index}][meal]`}
                  initialValue={event.meal}
                >
                  <Input
                    name="meal"
                    value={event.meal}
                    onChange={(e) =>
                      handleArrayChange(e, index, "mealsIncludedWithHotels")
                    }
                    placeholder="Enter meal"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() =>
                    removeFromArray("mealsIncludedWithHotels", index)
                  }
                  className="w-full md:w-auto mb-4"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Remove Meal Event
                </Button>
              </Col>

              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() =>
                    addToArray("mealsIncludedWithHotels", {
                      location: "",
                      meal: "",
                    })
                  }
                  className="w-full md:w-auto"
                >
                  Add Meal Event
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </Card>

      {/* Flight Events */}
      <Card title="Flight Events" bordered={false} className="mb-8">
        {formData.flightEvents.map((event, index) => (
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
                {" "}
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
        ))}
      </Card>

      {/* Transfer Events */}
      {/* Transfer Events */}
      <Card title="Transfer Events" bordered={false} className="mb-8">
        {formData.transferEvents.map((event, index) => (
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
                  type="danger" // This will make the background red
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
        ))}
      </Card>

      {/* Activity Events */}
      <Card title="Activity Events" bordered={false} className="mb-8">
        {formData.activityEvents.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Activity Title"
                  name={`activityEvents[${index}][title]`}
                  initialValue={event.title}
                >
                  <Input
                    name="title"
                    value={event.title}
                    onChange={(e) =>
                      handleArrayChange(e, index, "activityEvents")
                    }
                    placeholder="Activity Title"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} justify="center">
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() => removeFromArray("activityEvents", index)}
                  className="w-full md:w-auto mb-4"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Remove Event
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  type="primary"
                  onClick={() => addToArray("activityEvents", { title: "" })}
                  className="w-full md:w-auto"
                >
                  Add Activity Event
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </Card>

      {/* Leisure Day Events */}
      <Card title="Leisure Day Events" bordered={false} className="mb-8">
        {formData.leisureDayEvents.map((event, index) => (
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
                  onClick={() => addToArray("leisureDayEvents", { title: "" })}
                  className="w-full md:w-auto"
                >
                  Add Leisure Day Event
                </Button>
              </Col>
            </Row>
          </div>
        ))}
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
