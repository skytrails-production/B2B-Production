import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, Checkbox, message } from "antd";
import { apiURL } from "../../../Constants/constant";

const AddItenary = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [formData, setFormData] = useState({
    packageId: id || "",
    title: "",
    dayNumber: "",
    hotelEvents: [{ title: "", name: "", description: "" }],
    flightEvents: [{ title: "" }],
    transferEvents: [{ title: "" }],
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
      .then((response) => response.json())
      .then((data) => {
        message.success("Itinerary added successfully!");
      })
      .catch((error) => {
        message.error("Error adding itinerary.");
        console.error("Error:", error);
      });
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="max-w-4xl mx-auto p-10 space-y-8"
      style={{ backgroundColor: "#FFFFFF", padding: "10px",borderRadius: "10px",marginBottom:"8px"}}
    >
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
        Create Itinerary
      </h2>

      {/* Title and Day Number in One Row */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col span={12}>
          <Form.Item
            label="Title"
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

      {/* Hotel Events */}
      <Card title="Hotel Events" bordered={false} className="mb-8">
        {formData.hotelEvents.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Title"
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

              <Col span={8}>
                <Form.Item
                  label="Name"
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

              <Col span={8}>
                <Form.Item
                  label="Description"
                  name={`hotelEvents[${index}][description]`}
                  initialValue={event.description}
                >
                  <Input
                    name="description"
                    value={event.description}
                    onChange={(e) => handleArrayChange(e, index, "hotelEvents")}
                    placeholder="Enter description"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="danger"
              onClick={() => removeFromArray("hotelEvents", index)}
              className="w-full md:w-auto mb-4"
            >
              Remove Event
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() =>
            addToArray("hotelEvents", { title: "", name: "", description: "" })
          }
          className="w-full md:w-auto"
        >
          Add Hotel Event
        </Button>
      </Card>
      {/* Flight Events */}
      <Card title="Flight Events" bordered={false} className="mb-8">
        {formData.flightEvents.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Title"
                  name={`flightEvents[${index}][title]`}
                  initialValue={event.title}
                >
                  <Input
                    name="title"
                    value={event.title}
                    onChange={(e) =>
                      handleArrayChange(e, index, "flightEvents")
                    }
                    placeholder="Enter title"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="danger"
              onClick={() => removeFromArray("flightEvents", index)}
              className="w-full md:w-auto mb-4"
            >
              Remove Event
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() => addToArray("flightEvents", { title: "" })}
          className="w-full md:w-auto"
        >
          Add Flight Event
        </Button>
      </Card>

      {/* Transfer Events */}
      <Card title="Transfer Events" bordered={false} className="mb-8">
        {formData.transferEvents.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Title"
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

            <Button
              type="danger"
              onClick={() => removeFromArray("transferEvents", index)}
              className="w-full md:w-auto mb-4"
            >
              Remove Event
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() => addToArray("transferEvents", { title: "" })}
          className="w-full md:w-auto"
        >
          Add Transfer Event
        </Button>
      </Card>

      {/* Activity Events */}
      <Card title="Activity Events" bordered={false} className="mb-8">
        {formData.activityEvents.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Title"
                  name={`activityEvents[${index}][title]`}
                  initialValue={event.title}
                >
                  <Input
                    name="title"
                    value={event.title}
                    onChange={(e) =>
                      handleArrayChange(e, index, "activityEvents")
                    }
                    placeholder="Enter title"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="danger"
              onClick={() => removeFromArray("activityEvents", index)}
              className="w-full md:w-auto mb-4"
            >
              Remove Event
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() => addToArray("activityEvents", { title: "" })}
          className="w-full md:w-auto"
        >
          Add Activity Event
        </Button>
      </Card>

      {/* Leisure Day Events */}
      <Card title="Leisure Day Events" bordered={false} className="mb-8">
        {formData.leisureDayEvents.map((event, index) => (
          <div key={index} className="mb-6">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Title"
                  name={`leisureDayEvents[${index}][title]`}
                  initialValue={event.title}
                >
                  <Input
                    name="title"
                    value={event.title}
                    onChange={(e) =>
                      handleArrayChange(e, index, "leisureDayEvents")
                    }
                    placeholder="Enter title"
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="danger"
              onClick={() => removeFromArray("leisureDayEvents", index)}
              className="w-full md:w-auto mb-4"
            >
              Remove Event
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() => addToArray("leisureDayEvents", { title: "" })}
          className="w-full md:w-auto"
        >
          Add Leisure Day Event
        </Button>
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

            <Button
              type="danger"
              onClick={() => removeFromArray("mealsIncludedWithHotels", index)}
              className="w-full md:w-auto mb-4"
            >
              Remove Meal Event
            </Button>
          </div>
        ))}
        <Button
          type="primary"
          onClick={() =>
            addToArray("mealsIncludedWithHotels", { location: "", meal: "" })
          }
          className="w-full md:w-auto"
        >
          Add Meal Event
        </Button>
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
