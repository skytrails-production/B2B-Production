
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import "./AddCoupons.css";
import {swalModal} from "../../../../utils/swal"

const AddCoupons = () => {
  const data = JSON.parse(sessionStorage.getItem("persist:root"));
  const logdata = JSON.parse(data?.adminAuth);
  
  const agentID = logdata?.adminData?.data?.id;

  console.log(agentID,"-----------------");
  const [couponImg, setCouponImg] = useState("");

  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    couponCode: "",
    discountPercentage: "",
    limitAmount: "",
    expirationDate: "",
    termsAndCond: "",
    offerType: "",
    uniqueId: agentID,
    images: couponImg,
  });

  useEffect(() => {
    setFormValues({ ...formValues, uniqueId: agentID });
  }, [agentID]);

  useEffect(() => {
    setFormValues({ ...formValues, images: couponImg });
  }, [couponImg]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/admin/createCoupons`,
        formValues,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Coupon created successfully!",
        }).then(() => navigate("/admin/dashboard"));
      } else {
        // Swal.fire({
        //   icon: "error",
        //   title: "Failed to create Coupon!",
        // });
        swalModal('flight','Failed to create Coupon!',false);
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
      // Swal.fire({
      //   icon: "error",
      //   title: "OOP's! Something went wrong..!*~*",
      // });
      swalModal('flight','Failed to create Coupon!',false);
    }
  };

  return (
    <div className="addCoupon-div">
      <h3 style={{ textAlign: "center" }} className="addCoupon-heading">
        <strong>Add Coupons Form</strong>
      </h3>
      <form onSubmit={handleSubmit} className="addCoupon-form">
        <div className="input-row">
          <label className="Coupon-form-label">
            Title:
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
          <label className="Coupon-form-label">
            Content:
            <input
              type="text"
              name="content"
              value={formValues.content}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
        </div>
        <div className="input-row">
          <label className="Coupon-form-label">
            Coupon Code:
            <input
              type="text"
              name="couponCode"
              value={formValues.couponCode}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
          <label className="Coupon-form-label">
            Discount Percentage:
            <input
              type="number"
              name="discountPercentage"
              value={formValues.discountPercentage}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
        </div>
        <div className="input-row">
          <label className="Coupon-form-label">
            Limit Amount:
            <input
              type="number"
              name="limitAmount"
              value={formValues.limitAmount}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
          <label className="Coupon-form-label">
            Expiration Date:
            <input
              type="text"
              name="expirationDate"
              value={formValues.expirationDate}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
        </div>
        <div className="input-row">
          <label className="Coupon-form-label">
            Terms&Condition:
            <input
              type="text"
              name="termsAndCond"
              value={formValues.termsAndCond}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
          </label>
          <label className="Coupon-form-label">
            Offer Type:
            <select
              name="offerType"
              value={formValues.offerType}
              onChange={handleInputChange}
              className="Coupon-form-input-ads-select"
            >
              {[
                "FLIGHTS",
                "HOTELS",
                "HOLIDAYS",
                "TRAINS",
                "CABS",
                "BANKOFFERS",
                "BUS",
                "CouponS",
                "PACKAGES",
                "FORALL",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="input-row">
          <label className="form-label-image">
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCouponImg(e.target.files[0])}
              className="form-input-image-ads-coupon"
            />
          </label>
        </div>
        <button className="buttoncsss" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCoupons;
