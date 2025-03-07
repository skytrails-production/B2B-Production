import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CouponContainer from "../../Components/Coupon/Couponcontainer";
import dayjs from "dayjs";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography,Modal } from "@mui/material";

import Swal from "sweetalert2";
import { swalModal } from "../../utils/swal";
import { useDispatch} from "react-redux";
import { hotelBookRoomActionGRN } from "../../Redux/HotelGrn/hotel";
import { balanceSubtractRequest } from "../../Redux/Auth/balaceSubtract/actionBalnceSubtract";
function PriceSummaryGRNcoupon(props) {
  const {
    onFinalAmountChange,
    oncouponselect,
    payButton,
    loadingPayButton,
    isPaymentSucessButton,
  } = props;

  const reducerState = useSelector((state) => state);
  const passenger = reducerState?.passengers?.passengersData;

  const hotelinfoGRN = reducerState?.hotelSearchResultGRN?.hotelRoom?.hotel;
  const commnetRate = hotelinfoGRN?.rate?.rate_comments?.MandatoryTax;
  const hotelMainReducer =
    reducerState?.hotelSearchResultGRN?.ticketData?.data?.data;
  const markUpamount =
    Number(reducerState?.markup?.markUpData?.data?.result[0]?.hotelMarkup) *
    Number(hotelinfoGRN?.rate?.price);
    const userId = reducerState?.logIn?.loginData?.data?.data?.id;

  const [showApplyButton, setShowApplyButton] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaderPayment, setLoaderPayment] = useState(false);
  const [open, setOpen] = useState(false); // State to control modal visibility
  
  // const [selectedCoupon, setSelectedCoupon] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const discountValueObj = selectedCoupon?.discountPercentage?.filter(
    (item, index) => {
      return item?.name == "HOTELS" || item?.name == "FORALL";
    }
  );

  // console.log("discountValueObj", discountValueObj,discountValueObj?.[0].value);
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCouponChange = (code) => {
    setCouponCode(code);
    setCouponApplied(!!code);
  };

  const handleCouponStatusChange = (status) => {
    setCouponStatus(status);
  };

  const handleCouponDiscountChange = (discount) => {
    setCouponDiscount(discount);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleErrorChange = (errorMessage) => {
    setError(errorMessage);
  };

  function generateMixedString() {
    const fixedText = "skyTrails_";
    const currentTime = Date.now().toString(); //add current time
    return fixedText + currentTime;
  }

  const mixedString = generateMixedString();

  const userBalance = reducerState?.userData?.userData?.data?.data?.balance;
  const grandTotal = Number(hotelinfoGRN?.rate?.price) + Number(markUpamount);

  const flight = "HOTELS";

  const totalPriceCalculator = () => {
    let finalAmount = 0;
    let discountAmount = 0;

    const publishedFare = Number(hotelinfoGRN?.rate?.price);
    if (selectedCoupon !== null) {
      let discountamount = 0;
      if (publishedFare <= discountValueObj?.[0].value?.min[0]) {
        discountamount = Number(discountValueObj?.[0].value?.min[1]);
      } else if (
        Number(publishedFare) >= Number(discountValueObj?.[0].value?.max[0])
      ) {
        discountamount = Number(discountValueObj?.[0].value?.max[1]);
      }

      if (discountValueObj?.[0].type == "PERCENTAGE") {
        finalAmount =
          Number(publishedFare) +
          Number(markUpamount) -
          Number(publishedFare) * Number(discountamount * 0.01);
        discountAmount = Number(publishedFare) * Number(discountamount * 0.01);
      } else if (discountValueObj?.[0].type == "AMOUNT") {
        finalAmount =
          Number(publishedFare) + Number(markUpamount) - Number(discountamount);
        discountAmount = Number(discountamount);
      }
    } else {
      finalAmount =
        finalAmount + Number(hotelinfoGRN?.rate?.price) + Number(markUpamount);
    }
    // return { amountGenerator: { finalAmount, discountAmount } };
    return { finalAmount, discountAmount };
  };
  const { finalAmount, discountAmount } = totalPriceCalculator();

  // console.log("finalAmount",finalAmount,discountAmount);

  // console.log("couponvalue",selectedCoupon.couponCode);
  useEffect(() => {
    if (typeof onFinalAmountChange === "function") {
      onFinalAmountChange(finalAmount);
      oncouponselect(couponCode);
    } else {
      console.error("onFinalAmountChange is not a function:");
    }
  }, [finalAmount, couponCode]);
  
   useEffect(() => {
      if (loaderPayment == true) {
        handleClickBooking();
      }
    }, [loaderPayment]);
  
 const handleClickBooking = async () => {
    if (userBalance >= grandTotal) {
      const payload = {
        search_id:
          reducerState?.hotelSearchResultGRN?.hotelDetails?.data?.data
            ?.search_id,
        hotel_code: hotelinfoGRN?.hotel_code,
        city_code: hotelinfoGRN?.city_code,
        group_code: hotelinfoGRN?.rate?.group_code,
        checkout: hotelMainReducer?.checkout,
        checkin: hotelMainReducer?.checkin,
        booking_comments: "Test booking",
        payment_type: "AT_WEB",
        agent_reference: mixedString,
        booking_items: [
          {
            room_code: hotelinfoGRN?.rate?.room_code,
            rate_key: hotelinfoGRN?.rate?.rate_key,
            rooms: passenger.map((item, index) => ({
              room_reference:
                hotelinfoGRN?.rate?.rooms?.[index]?.room_reference,
              paxes: [
                ...item.adults.map((adult) => ({
                  title: adult.Title,
                  name: adult.FirstName,
                  surname: adult.LastName,
                  type: "AD",
                })),
                ...item.children.map((child) => ({
                  title: child.Title,
                  name: child.FirstName,
                  surname: child.LastName,
                  type: "CH",
                  age: child.age,
                })),
              ],
            })),
          },
        ],
        holder: {
          title: passenger?.[0]?.adults?.[0]?.Title,
          name: passenger?.[0]?.adults?.[0]?.FirstName,
          surname: passenger?.[0]?.adults?.[0]?.LastName,
          email: passenger?.[0]?.adults?.[0]?.Email,
          phone_number: passenger?.[0]?.adults?.[0]?.Phoneno,
          client_nationality: "in",
          pan_number: passenger?.[0]?.adults?.[0]?.PAN,
        },
      };

      dispatch(hotelBookRoomActionGRN(payload));
      const balancePayload = {
        _id: userId,
        amount: grandTotal,
        bookingType: "Hotel booking",
      };

      dispatch(balanceSubtractRequest(balancePayload));
      Swal.fire({
        title: "Booking Successful",
        text: "Your booking was successful! Thank you for booking with us.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      swalModal(
        "py",
        "Insufficient balance!! Please Recharge your Wallet!",
        true
      );
    }
  };
  
  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal

  return (
    <>
      <div className="sticky overflow-y-scroll border rounded-md shadow-sm top-24 p-7">
        <div className="flex flex-col w-full border rounded-md ">
          <div className="flex flex-row items-center justify-center ">
            <div className="flex flex-col items-center justify-center w-full gap-2 p-3 border-b">
              <p className="mb-0 text-sm text-gray-500">Check-In</p>
              <p className="mb-0 text-sm font-semibold text-gray-600">
                {dayjs(hotelMainReducer?.checkin).format("DD MMM, YY")}
              </p>
              <p className="mb-0 text-sm font-semibold text-gray-600">
                {dayjs(hotelMainReducer?.checkin).format("dddd")}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-2 p-3 border-b">
              <p className="mb-0 text-sm text-gray-500">Check-Out</p>
              <p className="mb-0 text-sm font-semibold text-gray-600">
                {dayjs(hotelMainReducer?.checkout).format("DD MMM, YY")}
              </p>
              <p className="mb-0 text-sm font-semibold text-gray-600">
                {dayjs(hotelMainReducer?.checkout).format("dddd")}
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center p-2 ">
            <p className="mb-0 text-sm font-semibold text-gray-600">
              {hotelMainReducer?.no_of_rooms} Room
            </p>
            <p className="mb-0 text-sm font-semibold text-gray-600">
              {", "}
              {hotelMainReducer?.no_of_adults} Adult{" "}
              {hotelMainReducer?.no_of_children > 0
                ? `${hotelMainReducer?.no_of_children} Child`
                : ""}
            </p>
          </div>
        </div>

        <div className="">
          <div className="flex flex-row justify-between mt-2 text-gray-600 ">
            <p className="mb-0 text-sm font-semibold text-gray-600">
              ₹{" "}
              {(
                hotelinfoGRN?.rate?.price / hotelMainReducer?.no_of_nights
              ).toFixed(0)}{" "}
              x {hotelMainReducer?.no_of_nights} nights
            </p>
            <p className="mb-0 text-sm font-semibold text-gray-600">
              ₹ {hotelinfoGRN?.rate?.price}
            </p>
          </div>
          <div className="flex flex-row justify-between mt-2 text-gray-600 ">
            <p className="mb-0 text-sm font-semibold text-gray-600">
              ₹{" "}
              {(
                hotelinfoGRN?.rate?.price / hotelMainReducer?.no_of_rooms
              ).toFixed(0)}{" "}
              x {hotelMainReducer?.no_of_rooms} rooms
            </p>
            <p className="mb-0 text-sm font-semibold text-gray-600">
              ₹ {hotelinfoGRN?.rate?.price}
            </p>
          </div>
        </div>
        <hr />

        <div className="">
          <div className="flex flex-row justify-between mt-2 text-gray-600 ">
            <p className="mb-0 text-sm font-semibold text-gray-600">
              Other Tax
            </p>
            <p className="mb-0 text-sm font-semibold text-gray-600">
              ₹ {Number(markUpamount).toFixed(0)}
            </p>
          </div>

          {discountAmount > 0 && (
            <div className="flex flex-row justify-between mt-2 text-gray-600 ">
              <p className="mb-0 text-sm font-semibold text-gray-600">
                Discount Amount
              </p>
              <p className="mb-0 font-semibold text-gray-800 text-md">
                ₹ {Number(discountAmount).toFixed(2)}
              </p>
            </div>
          )}
          {commnetRate && (
            <div className="flex flex-row justify-between mt-2 text-gray-600 ">
              <p className="mb-0 text-sm font-semibold text-gray-600">
                Discount Amount
              </p>
              <p className="mb-0 font-semibold text-gray-800 text-md">
                ₹ {commnetRate}
              </p>
            </div>
          )}

          <div className="flex flex-row justify-between mt-2 text-gray-600 ">
            <p className="mb-0 text-sm font-semibold text-gray-600">
              Grand Total
            </p>
            <p className="mb-0 font-semibold text-gray-800 text-md">
              ₹ {Number(finalAmount).toFixed(0)}
            </p>
          </div>
        </div>

        <div className="sideBarPriceBox">
          <button
            className="flex-grow w-full py-2 mt-2 text-sm text-white rounded-md bg-primary-6000 "
            type="submit"
            onClick={handleOpen}
          >
            {isPaymentSucessButton ? (
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              "Pay Now"
            )}
          </button>
          {/* <CouponContainer
            value={flight}
            couponCode={couponCode}
            couponApplied={couponApplied}
            couponStatus={couponStatus}
            couponDiscount={couponDiscount}
            loading={loading}
            selectedCoupon={selectedCoupon}
            error={error}
            onCouponChange={handleCouponChange}
            onCouponStatusChange={handleCouponStatusChange}
            onCouponDiscountChange={handleCouponDiscountChange}
            onLoadingChange={handleLoadingChange}
            onErrorChange={handleErrorChange}
            setSelectedCoupon={setSelectedCoupon}
          /> */}
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box
          className="modalStyle"
          sx={{
            width: 400,
            p: 4,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Typography
            id="confirmation-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Confirm Booking
          </Typography>
          <Typography id="confirmation-modal-description" sx={{ mt: 2, mb: 3 }}>
            Are you sure you want to confirm the booking?
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => {
                handleClickBooking();
                handleClose();
              }}
              variant="contained"
              style={{ backgroundColor: "#4F46E5",color:"white" }}
            >
              Confirm
            </Button>
            <Button
              style={{ backgroundColor: "rgb(231,60,52)",color:"white" }}
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      </div>
    </>
  );
}

export default PriceSummaryGRNcoupon;
