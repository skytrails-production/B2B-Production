import React, { useEffect, useState, useRef, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { Checkbox } from "antd";
import {
  validateEmail,
  validateName,
  validateGender,
  validatetitle1,
  validatePhoneNumber,
  isValidPassportNumber,
  validatePassportExpiry,
} from "../../utility/validationFunctions";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { passportReqired } from "../../utility/flightUtility/BookwarperUtility";

// const PassengersDetails = React.forwardRef(({
//   sub,
//   setPassengerDataa,
//   set_Validation,
//   isSeatMapopen,
//   setIsDropdown,
//   setIsSeatMapOpen, }, ref) => {

// }) => {
const NewPassengerDetails = React.forwardRef(
  (
    {
      sub,
      setPassengerDataa,
      set_Validation,
      isSeatMapopen,
      setIsDropdown,
      setIsSeatMapOpen,
    },
    ref
  ) => {
    const location = useLocation();
    const adultCount = Number(sessionStorage?.getItem("adults"));
    const childCount = Number(sessionStorage?.getItem("childs"));
    const infantCount = Number(sessionStorage?.getItem("infants"));

    const reducerState = useSelector((state) => state);
    const isDummyTicketBooking = JSON.parse(
      sessionStorage.getItem("hdhhfb7383__3u8748")
    );
    const authenticUser = reducerState?.logIn?.loginData?.status;
    const [email, setEmail] = useState("");
    const [cNumber, setCnumber] = useState("");
    const [farePrice, setFarePrice] = useState("");
    const [toggle, setToggle] = useState(false);
    const [V_aliation, setValidation] = useState(false);
    const isPassportRequired = passportReqired();
    // const [sub, setSub] = useState(true);

    const passengerTemplate = {
      title: "",
      firstName: "",
      lastName: "",
      gender: "1",
      email: "",
      addressLine1: "delhi",
      city: "Delhi",
      TicketNumber: "Hold",
      amount: null,
      FirstName: "",
      LastName: "",
      PaxType: 1,
      DateOfBirth: "",
      Gender: 1,
      passportNo: "",
      passportExpiry: "",
      AddressLine1: "test",
      AddressLine2: "test2",
      Fare: farePrice,
      City: "gurgaon",
      CountryCode: "IN",
      CellCountryCode: "+91-",
      ContactNo: cNumber,
      Nationality: "",
      Email: email,
      IsLeadPax: true,
      FFAirlineCode: null,
      FFNumber: "",
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    };
    const childPassenger = {
      title: "Mr",
      firstName: "",
      lastName: "",
      gender: "1",

      email: "",
      addressLine1: "delhi",
      city: "Delhi",
      TicketNumber: "Hold",
      amount: null,
      Title: "Mr",
      FirstName: "",
      LastName: "",
      PaxType: 2,
      DateOfBirth: "",
      Gender: 1,
      passportNo: "",
      passportExpiry: "",
      Fare: farePrice,
      IsLeadPax: false,
      FFAirlineCode: null,
      FFNumber: "",
    };
    const infantPassenger = {
      title: "Mr",
      firstName: "",
      lastName: "",

      gender: "1",

      email: "",
      addressLine1: "delhi",
      city: "Delhi",
      TicketNumber: "Hold",
      amount: null,
      Title: "Mr",
      FirstName: "",
      LastName: "",
      PaxType: 3,
      DateOfBirth: "",
      Gender: 1,
      passportNo: "",
      passportExpiry: "",
      Fare: farePrice,
      IsLeadPax: false,
      FFAirlineCode: null,
      FFNumber: "",
    };

    const passengerLists = [];
    const passengerChildLists = [];
    const passengerInfantLists = [];
    const [currentAdultCount, setCurrentAdultCount] = useState(0);
    const [currentChildCount, setcurrentChildCount] = useState(0);
    const [currentinfantCount, setcurrentinfantCount] = useState(0);

    const addAdult = () => {
      if (currentAdultCount < adultCount) {
        setCurrentAdultCount((prevCount) => prevCount + 1);
      }
    };

    const addChild = () => {
      if (currentChildCount < childCount) {
        setcurrentChildCount((prevCount) => prevCount + 1);
      }
    };

    const addinfant = () => {
      if (currentinfantCount < infantCount) {
        setcurrentinfantCount((prevCount) => prevCount + 1);
      }
    };
    for (let i = 0; i < adultCount; i++) {
      passengerLists.push({
        ...passengerTemplate,
        IsLeadPax: i === 0, // Set the first passenger as the lead passenger
      });
    }

    for (let i = 0; i < childCount; i++) {
      passengerChildLists.push({
        ...childPassenger,
        IsLeadPax: false, // Set the first passenger as the lead passenger
      });
    }
    for (let i = 0; i < infantCount; i++) {
      passengerInfantLists.push({
        ...infantPassenger,
        IsLeadPax: false, // Set the first passenger as the lead passenger
      });
    }

    const allPassenger = [
      passengerLists,
      passengerChildLists,
      passengerInfantLists,
    ];
    const [passengerData, setPassengerData] = useState(allPassenger.flat());

    // setPassengerData(allPassenger.flat());
    const handleServiceChange = (e, i) => {
      const { name, value } = e.target;
      const list = [...passengerData];
      if (i < adultCount) {
        if (!list[i]["Fare"]) {
          list[i]["Fare"] = farePrice[0];
        }
      }
      if (i >= adultCount && i < +adultCount + +childCount) {
        if (!list[i]["Fare"]) {
          list[i]["Fare"] = farePrice[1];
        }
      } else {
        if (!list[i]["Fare"]) {
          list[i]["Fare"] = farePrice[2];
        }
      }
      list[i][name] = value;
      setPassengerData(list);
      setPassengerDataa(list);
      // console.log("Passengerdatabookwraper", passengerData);
    };

    // console.log(passengerData, "passenger data");

    const validation = async () => {
      const result = passengerData?.filter(
        (item) =>
          validateName(item?.firstName) &&
          validateName(item?.lastName) &&
          validateDate(item?.DateOfBirth) &&
          validatetitle1(item.title) &&
          (isPassportRequired ? isValidPassportNumber(item?.passportNo) : true)
      );
      if (
        result?.length === passengerData?.length &&
        validatePhoneNumber(passengerData?.[0]?.ContactNo) &&
        validateEmail(passengerData?.[0]?.email)
      ) {
        set_Validation(true);

        // console.log("here i am in if");
        return setValidation(true);
      } else {
        // console.log("here i am");

        setValidation(false);
      }
    };

    useEffect(() => {
      validation();
    }, [passengerData]);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };
    const datet = new Date();
    const maxDateValue = new Date(datet);
    maxDateValue.setFullYear(datet.getFullYear() - 12);
    const minDateValueChild = new Date(datet);
    const maxDateValueChild = new Date(datet);
    const minDateValueInfer = new Date(datet);

    minDateValueChild.setFullYear(datet.getFullYear() - 11);
    maxDateValueChild.setFullYear(datet.getFullYear() - 2);
    minDateValueInfer.setFullYear(datet.getFullYear() - 2);

    const currentDate = formatDate(datet);
    const maxDate = formatDate(maxDateValue);
    const minDateChild = formatDate(minDateValueChild);
    const maxDateChild = formatDate(maxDateValueChild);
    const minDateInfer = formatDate(maxDateValueChild);
    const validateDate = (dateString) => {
      try {
        const parsedDate = new Date(dateString);
        if (isNaN(parsedDate)) {
          return false;
        }
        const formattedDate = parsedDate?.toISOString()?.split("T")[0];
        return formattedDate === dateString;
      } catch (error) {
        return false;
      }
    };

    const [firstnamevalue, setfirstnamevalue] = useState("");
    const [lastnamevalue, setlastnamevalue] = useState("");
    const [numbervalue, setnumbervalue] = useState("");

    const passengerdetail = (e) => {
      const isChecked = e.target.checked;

      if (isChecked) {
        const fullName = reducerState?.logIn?.loginData?.data?.result?.username;
        const lastName = fullName ? fullName.split(" ").slice(1).join(" ") : "";
        const firstName = fullName ? fullName.split(" ")[0] : "";
        const phonenumber =
          reducerState?.logIn?.loginData?.data?.result?.phone?.mobile_number;

        setnumbervalue(phonenumber);
        setfirstnamevalue(firstName);
        setlastnamevalue(lastName);
        handleServiceChange(
          { target: { name: "firstName", value: firstName } },
          0
        );
        handleServiceChange(
          { target: { name: "lastName", value: lastName } },
          0
        );
        handleServiceChange(
          { target: { name: "ContactNo", value: phonenumber } },
          0
        );
      } else {
        setfirstnamevalue(" ");
        setlastnamevalue(" ");
        setnumbervalue("");
        handleServiceChange({ target: { name: "firstName", value: "" } }, 0);
        handleServiceChange({ target: { name: "lastName", value: "" } }, 0);
        handleServiceChange({ target: { name: "ContactNo", value: "" } }, 0);
      }
    };
    return (
      <div
        ref={ref}
        className="mt-3 border-gray-200 rounded-md border-1"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {isSeatMapopen ? (
          <div
            onClick={() => {
              setIsDropdown(false);
              setIsSeatMapOpen(false);
            }}
            className="p-2 col-lg-12"
          >
            <div className="flex flex-col gap-2 p-4 bg-white rounded-md">
              <div className="px-2 rounded-sm bg-primary-100">
                <p className="font-semibold text-red-600 text-md">
                  Passenger Details
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">
                  {passengerData.map((p) => {
                    return p.firstName;
                  })}
                </p>
                <EditOutlined />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 col-lg-12">
            <div className="p-2 bg-white rounded-md md:p-4">
              <div className="px-2 py-2 rounded-sm bg-primary-100 md:px-3" style={{backgroundColor:"#E0E7FF"}}>
                <h3
                  style={{
                   
                    fontWeight: 500, // Equivalent to font-medium
                    marginBottom: 0, // Equivalent to mb-0
                    color: "#4338CA", // Equivalent to text-primary-700 (assuming Tailwind's primary-700 is a blue shade)
                    fontSize:15,
                  }}
                >
                  Passenger Details
                </h3>

                {/* <h3 className="mb-0 text-base font-medium text-primary-700">
                  Passenger Details
                </h3> */}
              </div>

              <div onClick={addAdult} className="py-2 cursor-pointer ">
                <p className="font-semibold">
                  {" "}
                  +Add the Adult ({currentAdultCount}/{adultCount})
                </p>
                {sub && !V_aliation && currentAdultCount < adultCount && (
                  <p className="block mb-2 text-xs font-medium text-red-500 ">
                    Please add the remaining {adultCount - currentAdultCount}{" "}
                    adult(s)
                  </p>
                )}
              </div>

              {sub && !V_aliation && (
                <p className="block mb-2 text-xs font-medium text-red-500 ">
                  <i className="fa-solid fa-circle-info"></i> Please fill all
                  the required fields.
                </p>
              )}
              {currentAdultCount > 0 &&
                Array.from({ length: currentAdultCount }, (_, index) => (
                  <div className="mt-2 " key={index}>
                    <div className="flex items-center gap-2 ">
                      <IoPersonSharp />
                      <p className="font-semibold">Adult {index + 1}</p>
                    </div>
                    <div className="mb-3 row g-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Title
                        </label>
                        <select
                          className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:!ring-indigo-700 
                        focus:outline-none
                        focus:!border-indigo-700 block w-full p-2 "
                          value={passengerData[index].title || ""}
                          name="title"
                          onChange={(e) => handleServiceChange(e, index)}
                        >
                          <option value="">Select Title</option>
                          <option value="Mr">Mr.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="Miss">Miss</option>
                        </select>
                        {sub && !validatetitle1(passengerData[index].title) && (
                          <span className="text-xs text-red-500">
                            Select Title
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          First Name
                        </label>

                        <input
                          type="text"
                          name="firstName"
                          value={
                            index === 0
                              ? firstnamevalue
                              : passengerData[index]?.firstName || ""
                          }
                          id="floatingInput"
                          className=" border border-gray-300 text-gray-900 text-sm rounded-md focus:!ring-indigo-700
                        focus:outline-none
                        focus:!border-indigo-700 block w-full p-2"
                          onChange={(e) => {
                            if (index === 0) {
                              setfirstnamevalue(e.target.value);
                            }
                            handleServiceChange(e, index);
                          }}
                          // placeholder="First Name"
                        />
                        {sub &&
                          !validateName(passengerData[index]?.firstName) && (
                            <span className="text-xs text-red-500">
                              First name{" "}
                            </span>
                          )}
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Last Name
                        </label>

                        <input
                          type="text"
                          name="lastName"
                          id="floatingInput"
                          value={
                            index === 0
                              ? lastnamevalue
                              : passengerData[index]?.lastName || ""
                          }
                          className=" border border-gray-300 text-gray-900 text-sm rounded-md
                        focus:outline-none
                        focus:!ring-indigo-700 focus:!border-indigo-700 block w-full p-2"
                          onChange={(e) => {
                            if (index === 0) {
                              setlastnamevalue(e.target.value);
                            }
                            handleServiceChange(e, index);
                          }}
                        ></input>
                        {sub &&
                          !validateName(passengerData[index]?.lastName) && (
                            <span className="text-xs text-red-500">
                              Last name{" "}
                            </span>
                          )}
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Gender
                        </label>
                        <select
                          className="border border-gray-300 text-gray-900 text-sm rounded-md focus:!ring-indigo-700 
                        focus:outline-none
                        focus:!border-indigo-700 block w-full p-2"
                          name="gender"
                          onChange={(e) => handleServiceChange(e, index)}
                        >
                          <option selected value="1">
                            Male
                          </option>
                          <option value="2">Female</option>
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="DateOfBirth"
                          id="floatingInput"
                          className=" border border-gray-300 text-gray-900 text-sm rounded-md
                        focus:outline-none
                        focus:!ring-indigo-700 focus:!border-indigo-700 block w-full p-2"
                          onChange={(e) => handleServiceChange(e, index)}
                          max={maxDate}
                        ></input>
                        {sub &&
                          !validateDate(passengerData[index]?.DateOfBirth) && (
                            <span className="text-xs text-red-500">DOB </span>
                          )}
                      </div>
                    </div>

                    {/* passport details here */}
                    {isPassportRequired == true ? (
                      <>
                        <div className="flex items-center gap-2 ">
                          <p className="font-semibold">Passport Details</p>
                        </div>
                        <div className="mb-3 row g-3">
                          <div className="col-lg-6 col-md-6">
                            <label
                              for="exampleInputEmail1"
                              className="block mb-2 text-sm font-medium text-gray-700 "
                            >
                              Passport Number
                            </label>
                            <input
                              type="text"
                              name="passportNo"
                              id="floatingInput"
                              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                              onChange={(e) => {
                                handleServiceChange(e, index);
                              }}
                            ></input>
                            {sub &&
                              !isValidPassportNumber(
                                passengerData[index]?.passportNo
                              ) && (
                                <span className="text-xs text-red-500">
                                  Enter a Valid Passport Number{" "}
                                </span>
                              )}
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label
                              for="exampleInputEmail1"
                              className="block mb-2 text-sm font-medium text-gray-700 "
                            >
                              Passport Expiry
                            </label>
                            <input
                              type="date"
                              name="passportExpiry"
                              id="floatingInput"
                              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                              onChange={(e) => {
                                handleServiceChange(e, index);
                              }}
                              min={currentDate}
                            ></input>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ))}

              {/* child details here  */}
              {childCount > 0 && (
                <div onClick={addChild} className="py-2 cursor-pointer">
                  <p className="font-semibold">
                    {" "}
                    +Add the child ({currentChildCount}/{childCount})
                  </p>

                  {sub && !V_aliation && currentChildCount < childCount && (
                    <p className="block mb-2 text-xs font-medium text-red-500 ">
                      Please add the remaining {childCount - currentChildCount}{" "}
                      child(s)
                    </p>
                  )}
                </div>
              )}

              {currentChildCount > 0 &&
                Array.from({ length: currentChildCount }, (_, index) => (
                  <div className="mt-2" key={index}>
                    <div className="flex items-center gap-2 ">
                      <p className="font-semibold">Child {index + 1}</p>
                    </div>
                    <div className="mb-3 row g-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="floatingInput"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                          onChange={(e) =>
                            handleServiceChange(e, index + Number(adultCount))
                          }
                        ></input>
                        {sub &&
                          !validateName(
                            passengerData[index + Number(adultCount)]?.firstName
                          ) && (
                            <span className="text-xs text-red-500">
                              First name{" "}
                            </span>
                          )}
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="floatingInput"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                          onChange={(e) =>
                            handleServiceChange(e, index + Number(adultCount))
                          }
                        ></input>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Gender
                        </label>
                        <select
                          className="border border-gray-300 text-gray-900 text-sm rounded-md focus:!ring-indigo-700 
                        focus:outline-none
                        focus:!border-indigo-700 block w-full p-2"
                          name="gender"
                          onChange={(e) =>
                            handleServiceChange(e, index + Number(adultCount))
                          }
                        >
                          <option selected value="1">
                            Male
                          </option>
                          <option value="2">Female</option>
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="DateOfBirth"
                          id="floatingInput"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                          onChange={(e) =>
                            handleServiceChange(e, index + Number(adultCount))
                          }
                          max={maxDateChild}
                          min={minDateChild}
                        ></input>
                        {sub &&
                          !validateDate(
                            passengerData[index + Number(adultCount)]
                              .DateOfBirth
                          ) && (
                            <span className="text-xs text-red-500">DOB </span>
                          )}
                      </div>
                    </div>
                    {/* passport details here */}
                    {isPassportRequired == true ? (
                      <>
                        <div className="flex items-center gap-2 ">
                          <p className="font-semibold">Passport Details</p>
                        </div>
                        <div className="mb-3 row g-3">
                          <div className="col-lg-6 col-md-6">
                            <label
                              for="exampleInputEmail1"
                              className="block mb-2 text-sm font-medium text-gray-700 "
                            >
                              Passport Number
                            </label>
                            <input
                              type="text"
                              name="passportNo"
                              id="floatingInput"
                              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                              onChange={(e) =>
                                handleServiceChange(
                                  e,
                                  index + Number(adultCount)
                                )
                              }
                            ></input>
                            {sub &&
                              !isValidPassportNumber(
                                passengerData[index + Number(adultCount)]
                                  ?.passportNo
                              ) && (
                                <span className="text-xs text-red-500">
                                  Enter valid Passport Number{" "}
                                </span>
                              )}
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label
                              for="exampleInputEmail1"
                              className="block mb-2 text-sm font-medium text-gray-700 "
                            >
                              Passport Expiry
                            </label>
                            <input
                              type="date"
                              name="passportExpiry"
                              id="floatingInput"
                              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                              min={currentDate}
                              onChange={(e) =>
                                handleServiceChange(
                                  e,
                                  index + Number(adultCount)
                                )
                              }
                            ></input>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ))}

              {/* child details here  */}

              {/* infant details here  */}
              {infantCount > 0 && (
                <div onClick={addinfant} className="py-2 cursor-pointer">
                  <p className="font-semibold">
                    {" "}
                    +Add the infant ({currentinfantCount}/{infantCount})
                  </p>

                  {sub && !V_aliation && currentinfantCount < infantCount && (
                    <p className="block mb-2 text-xs font-medium text-red-500 ">
                      Please add the remaining{" "}
                      {infantCount - currentinfantCount} Infant(s)
                    </p>
                  )}
                </div>
              )}

              {currentinfantCount > 0 &&
                Array.from({ length: currentinfantCount }, (_, index) => (
                  <div className="mt-2" key={index}>
                    <div className="flex items-center gap-2 ">
                      <p className="font-semibold">Infant {index + 1}</p>
                    </div>
                    <div className="mb-3 row g-3">
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="floatingInput"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                          onChange={(e) =>
                            handleServiceChange(
                              e,
                              index + Number(adultCount) + Number(childCount)
                            )
                          }
                        ></input>
                        {sub &&
                          !validateName(
                            passengerData[
                              index + Number(adultCount) + Number(childCount)
                            ]?.firstName
                          ) && (
                            <span className="text-xs text-red-500">
                              First name{" "}
                            </span>
                          )}
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="floatingInput"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                          onChange={(e) =>
                            handleServiceChange(
                              e,
                              index + Number(adultCount) + Number(childCount)
                            )
                          }
                        ></input>
                        {sub &&
                          !validateName(
                            passengerData[
                              index + Number(adultCount) + Number(childCount)
                            ]?.lastName
                          ) && (
                            <span className="text-xs text-red-500">
                              Last name{" "}
                            </span>
                          )}
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Gender
                        </label>
                        <select
                          className="border border-gray-300 text-gray-900 text-sm rounded-md focus:!ring-indigo-700 
                        focus:outline-none
                        focus:!border-indigo-700 block w-full p-2"
                          name="gender"
                          onChange={(e) =>
                            handleServiceChange(
                              e,
                              index + Number(adultCount) + Number(childCount)
                            )
                          }
                        >
                          <option value="1" selected>
                            Male
                          </option>
                          <option value="2">Female</option>
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <label
                          for="exampleInputEmail1"
                          className="block mb-2 text-sm font-medium text-gray-700 "
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="DateOfBirth"
                          id="floatingInput"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                          onChange={(e) =>
                            handleServiceChange(
                              e,
                              index + Number(adultCount) + Number(childCount)
                            )
                          }
                          min={minDateInfer}
                          max={currentDate}
                        ></input>
                        {sub &&
                          !validateDate(
                            passengerData[
                              index + Number(adultCount) + Number(childCount)
                            ]?.DateOfBirth
                          ) && (
                            <span className="text-xs text-red-500">DOB </span>
                          )}
                      </div>
                    </div>
                    {/* passport details here */}
                    {isPassportRequired == true ? (
                      <>
                        <div className="flex items-center gap-2 ">
                          <p className="font-semibold">Passport Details</p>
                        </div>
                        <div className="mb-3 row g-3">
                          <div className="col-lg-6 col-md-6">
                            <label
                              for="exampleInputEmail1"
                              className="block mb-2 text-sm font-medium text-gray-700 "
                            >
                              Passport Number
                            </label>
                            <input
                              type="text"
                              name="passportNo"
                              id="floatingInput"
                              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                              onChange={(e) =>
                                handleServiceChange(
                                  e,
                                  index +
                                    Number(adultCount) +
                                    Number(childCount)
                                )
                              }
                            ></input>
                            {sub &&
                              !isValidPassportNumber(
                                passengerData[
                                  index +
                                    Number(adultCount) +
                                    Number(childCount)
                                ]?.passportNo
                              ) && (
                                <span className="text-xs text-red-500">
                                  Enter a Valid Passport Number{" "}
                                </span>
                              )}
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label
                              for="exampleInputEmail1"
                              className="block mb-2 text-sm font-medium text-gray-700 "
                            >
                              Passport Expiry
                            </label>
                            <input
                              type="date"
                              name="passportExpiry"
                              id="floatingInput"
                              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-700 focus:border-indigo-700"
                              min={currentDate}
                              onChange={(e) => {
                                handleServiceChange(
                                  e,
                                  index +
                                    Number(adultCount) +
                                    Number(childCount)
                                );
                              }}
                            ></input>
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {authenticUser == 200 ? (
          <div className="flex justify-end my-[12px] bg-primary-100 p-2">
            <Checkbox
              onChange={passengerdetail}
              className="font-bold text-primary-700"
            >
              Booking flight for yourself
            </Checkbox>
          </div>
        ) : (
          " "
        )}
        {!isSeatMapopen && (
          <div className="mt-3 col-lg-12">
            <div className="p-2 bg-white rounded-md md:p-4">
              <form>
                <div className="bookFlightPassInner">
                  <div className="flex items-center gap-2 ">
                    <p className="font-semibold">
                      Your Booking Details will be sent to
                    </p>
                  </div>
                  <div className="mb-3 row g-3">
                    <div className="col-lg-5 col-md-5">
                      <label
                        for="exampleInputEmail1"
                        className="block mb-2 text-sm font-medium text-gray-700 "
                      >
                        Enter Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="floatingInput"
                        className="border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:!ring-indigo-700 focus:!border-indigo-700 block w-full p-2"
                        onChange={(e) => {
                          handleServiceChange(e, 0);
                        }}
                      ></input>
                      {sub && !validateEmail(passengerData[0].email) && (
                        <span className="text-xs text-red-500">
                          Enter a Valid Email{" "}
                        </span>
                      )}
                    </div>
                    <div className="col-lg-5 col-md-5">
                      <label
                        for="exampleInputEmail1"
                        className="block mb-2 text-sm font-medium text-gray-700 "
                      >
                        Mobile Number
                      </label>
                      <input
                        type="phone"
                        name="ContactNo"
                        value={numbervalue}
                        id="floatingInput"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-md 
                      focus:outline-none
                      focus:!ring-indigo-700 focus:!border-indigo-700 block w-full p-2"
                        onChange={(e) => {
                          // if (index === 0) {
                          setnumbervalue(e.target.value);
                          // }
                          handleServiceChange(e, 0);
                        }}
                      ></input>
                      {sub &&
                        !validatePhoneNumber(passengerData[0]?.ContactNo) && (
                          <span className="text-xs text-red-500">
                            Enter valid number{" "}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default NewPassengerDetails;
