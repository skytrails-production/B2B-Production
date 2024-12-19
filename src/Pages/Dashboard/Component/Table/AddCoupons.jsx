import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { apiURL } from "../../../../Constants/constant";
import { useNavigate } from "react-router-dom";
import "./AddCoupons.css";
import { swalModal } from "../../../../utils/swal";
import { CircularProgress } from "@mui/material";

const AddCoupons = () => {
  const data = JSON.parse(sessionStorage.getItem("persist:root"));
  const logdata = JSON.parse(data?.adminAuth);
  const agentID = logdata.adminData.data.id;

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

  const [formErrors, setFormErrors] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setFormValues({ ...formValues, uniqueId: agentID });
  }, [agentID]);

  useEffect(() => {
    setFormValues({ ...formValues, images: couponImg });
  }, [couponImg]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form values
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Clear the specific error for the field if it becomes valid
    setFormErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (value.trim() !== "") {
        delete updatedErrors[name];
      }
      return updatedErrors;
    });
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!formValues.title) errors.title = "Title is required.";
    if (!formValues.content) errors.content = "Content is required.";
    if (!formValues.couponCode) errors.couponCode = "Coupon Code is required.";
    if (!formValues.discountPercentage)
      errors.discountPercentage = "Discount Percentage is required.";
    if (!formValues.limitAmount)
      errors.limitAmount = "Limit Amount is required.";
    if (!formValues.expirationDate)
      errors.expirationDate = "Expiration Date is required.";
    if (!formValues.termsAndCond)
      errors.termsAndCond = "Terms and Conditions are required.";
    if (!formValues.offerType) errors.offerType = "Offer Type is required.";

    // Numeric validations
    if (formValues.discountPercentage && isNaN(formValues.discountPercentage)) {
      errors.discountPercentage = "Discount Percentage must be a number.";
    }

    if (formValues.limitAmount && isNaN(formValues.limitAmount)) {
      errors.limitAmount = "Limit Amount must be a number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoad(true);
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
        swalModal("flight", "Failed to create Coupon!", false);
      }
    } catch (error) {
      console.error("API Error:", error.response.data);
      swalModal("flight", "Failed to create Coupon!", false);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="addCoupon-div">
      {load && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress
            color="primary"
            size={50}
            thickness={3}
            style={{
              position: "absolute",
              top: "50%",
              left: "49.8%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
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
            {formErrors.title && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.title}
              </span>
            )}
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
            {formErrors.content && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.content}
              </span>
            )}
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
            {formErrors.couponCode && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.couponCode}
              </span>
            )}
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
            {formErrors.discountPercentage && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.discountPercentage}
              </span>
            )}
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
            {formErrors.limitAmount && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.limitAmount}
              </span>
            )}
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
            {formErrors.expirationDate && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.expirationDate}
              </span>
            )}
          </label>
        </div>
        <div className="input-row">
          <label className="Coupon-form-label">
            Terms & Conditions:
            <input
              type="text"
              name="termsAndCond"
              value={formValues.termsAndCond}
              onChange={handleInputChange}
              className="Coupon-form-input-ads"
            />
            {formErrors.termsAndCond && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.termsAndCond}
              </span>
            )}
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
            {formErrors.offerType && (
              <span className="error-text" style={{ color: "red" }}>
                {formErrors.offerType}
              </span>
            )}
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
        <button className="button1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCoupons;
