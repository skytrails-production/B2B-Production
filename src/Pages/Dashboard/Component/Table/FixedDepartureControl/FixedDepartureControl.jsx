import React, { useState, useEffect } from "react";
import { apiURL } from "../../../../../Constants/constant";
import axios from "axios";
import "./FixedDepartureControl.css";
import userApi from "../../../../../Redux/API/api";

const FixedDepartureControl = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAllFixDepartureBooking`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(data?.result?.docs, "data");
  const handleUpdate=(flightId,seat)=>{
    const payload = {
      _id: flightId,
      noOfBooking: seat,
    };

    userApi.updateFlightBookingSeat(payload)
  }
  return (
    <div class="parent">
      <table>
        <thead>
          <tr>
            <th>Login Name</th>
            <th>Number Of seat</th>
            <th>Phone Number</th>
            <th>Sold To</th>
            <th>Email</th>
            <th>Status</th>
            <th>Final Sale Price</th>
            <th>Passenger</th>
            <th>Update seat</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            data?.result?.docs.map((item, index) => {
              return (
                <tr>
                  <td>{item?.loginName}</td>
                  <td>{item?.numberOfSeats}</td>
                  <td>{item?.phoneNo}</td>
                  <td>{item?.soldTo}</td>
                  <td>{item?.emailId}</td>
                  <td>{item?.status}</td>
                  <td>{item?.finalSalePrice}</td>

                  <td>
                    {item?.names.map((itemName) => {
                      return (
                        <ul>
                          <li>{itemName?.firstName}</li>
                          <li>{itemName?.lastName}</li>
                          <li>{itemName?.title}</li>
                          <li>{itemName?.passport}</li>
                          <li>{itemName?.passportExpiry}</li>
                        </ul>
                      );
                    })}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdate(item?.flightId, item?.numberOfSeats)
                      }
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FixedDepartureControl;
