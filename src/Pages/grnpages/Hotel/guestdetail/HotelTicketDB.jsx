import React, { useEffect } from "react";
import Swal from "sweetalert2";

const HotelTicketDB = () => {
  useEffect(() => {
    // Display SweetAlert when component mounts
    Swal.fire({
      title: "Thank You for Booking With Us",
      text: "Please Check your Email for Booking Details",
      icon: "success",
      showConfirmButton: false,
    });
  }, []);

  return (
    <div
      className="tempBox"
      style={{ marginTop: "150px", marginBottom: "150px" }}
    >
      <div className="container">{/* Content of the component */}</div>
    </div>
  );
};

export default HotelTicketDB;
