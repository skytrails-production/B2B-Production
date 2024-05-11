import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { apiURL } from "../../Constants/constant";

function Enquirylist() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${apiURL.baseURL}/skytrails/api/user/query/AllInquiriesList`
      );
      const values = response.data.result;
      const initialLoadingStates = values.reduce((acc, item) => {
        acc[item._id] = false;
        return acc;
      }, {});
      setData(values);
      setLoadingStates(initialLoadingStates);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async (itemId) => {
    try {
      setLoadingStates((prevState) => ({
        ...prevState,
        [itemId]: true,
      }));
      await axios.put(
        `${apiURL.baseURL}/skytrails/api/admin/query/resolveQuery`,
        {
          queryId: itemId,
        }
      );
      setData(
        data.map((item) =>
          item._id === itemId ? { ...item, resolveStatus: "RESOLVED" } : item
        )
      );
    } catch (error) {
      console.error("Error resolving inquiry:", error);
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    }
  };

  return (
    <>
      {loader ? (
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "0",
            right: "0",
            width: "100%",
            height: "290%",
            backdropFilter: "blur(4.5px)",
            backgroundColor: "#d8d5e663",
            zIndex: 1,
          }}
        ></div>
      ) : null}
      <div style={{ marginTop: "50px" }}>
        <div
          className="titlebar"
          style={{
            backgroundColor: "#0096ff",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3.4px",
            color: "white",
            width: "95.8%",
            marginLeft: "10px",
            padding: "0.8em",
          }}
        >
          <h2>Enquiry List</h2>
        </div>
        {loader && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress
              disableShrink
              color="primary"
              size={69}
              thickness={4}
              style={{
                position: "absolute",
                top: "50%",
                left: "49.8%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            />
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Message</th>
              <th>Resolve Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 20px",
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 20px",
                  }}
                >
                  {item.email}
                </td>
                <td
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 20px",
                  }}
                >
                  {item.contactNumber}
                </td>
                <td
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 20px",
                  }}
                >
                  {item.message}
                </td>
                <td
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 20px",
                  }}
                >
                  {item.resolveStatus}
                </td>
                <td
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "10px 20px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#21325D",
                      color: "white",
                      borderRadius: "2.5px",
                      padding: "5px 10px",
                      border: "none",
                    }}
                    onClick={() => handleSubmit(item._id)}
                    disabled={loadingStates[item._id]}
                  >
                    {loadingStates[item._id] ? (
                      <CircularProgress
                        disableShrink
                        size={15}
                        thickness={4}
                        variant="determinate"
                        value={75}
                        style={{ color: "#21325D" }}
                      />
                    ) : (
                      "Resolve"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Enquirylist;
