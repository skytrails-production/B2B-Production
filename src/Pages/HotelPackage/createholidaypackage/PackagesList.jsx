import React, { useEffect, useState } from "react";
import { Button, Table, Spin, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiURL } from "../../../Constants/constant";
import "./PackageList.css";

const PackagesList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reducerState = useSelector((state) => state);
  const packageid = reducerState.logIn.loginData.data.data.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          `${apiURL.baseURL}/skyTrails/holidaypackage/getallpackagebyuser/${packageid}`
        );
        const data = await response.json();

        if (
          data.success === 1 &&
          Array.isArray(data.data) &&
          data.data.length > 0
        ) {
          setPackages(data.data);
        } else {
          setError("No packages found.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [packageid]);

  const handleNavigateToAddItinerary = (id) => {
    navigate(`/AddItenary`, { state: { id } });
  };

  const handleNavigateToAddItineraryImage = (id) => {
    navigate(`/AddItenaryImage`, { state: { id } });
  };

  const handleNavigateToAddImages = (id) => {
    navigate(`/AddImages`, { state: { id } });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    // {
    //   title: "Add Itinerary",
    //   key: "addItinerary",
    //   render: (_, record) => (
    //     <Button
    //       type="primary"
    //       shape="round"
    //       onClick={() => handleNavigateToAddItinerary(record._id)}
    //       style={{ backgroundColor: "#1677ff", borderColor: "#1677ff" }}
    //     >
    //       Add Itinerary
    //     </Button>

    //   ),

    //   // addItinerary Images

    // },
    {
      title: "Add Itinerary",
      key: "addItinerary",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            shape="round"
            onClick={() => handleNavigateToAddItinerary(record._id)}
            style={{ backgroundColor: "#1677ff", borderColor: "#1677ff" }}
          >
            Add Itinerary
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => handleNavigateToAddItineraryImage(record._id)}
            style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          >
            Add Itinerary Image
          </Button>
        </div>
      ),
    },

    {
      title: "Add Images",
      key: "addImages",
      render: (_, record) => (
        <Button
          type="default"
          shape="round"
          onClick={() => handleNavigateToAddImages(record._id)}
          style={{
            color: "#52c41a",
            borderColor: "#52c41a",
          }}
        >
          Add Images
        </Button>
      ),
    },
  ];

  const rowClassName = () => "custom-row";

  if (loading)
    return <Spin size="large" className="flex justify-center mt-10" />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      style={{ width: "60%" }}
    >
      <Table
        className="custom-bordered-table"
        dataSource={packages}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
        title={() => (
          <Typography.Title
            level={4}
            className="text-center mb-0 text-gray-800"
          >
            Package List
          </Typography.Title>
        )}
        rowClassName={rowClassName}
      />
    </div>
  );
};

export default PackagesList;
