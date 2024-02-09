import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { apiURL } from "../../../Constants/constant";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./fixeddeparture.css";
import userApi from "../../../Redux/API/api";

const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    overFlowY: "scroll",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadies: "12px",



};
const style1 = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    overFlowY: "scroll",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadies: "12px",



};
const schema = yup.object().shape({
    loginName: yup.string().required("Login Name is required"),
    numberOfSeats: yup.number().required("Number of Seats is required"),
    status: yup.string().required("Status is required"),
    itemPrice: yup.number().required("Sale Price is required"),
    soldTo: yup.string().required("Sold To is required"),
    phoneNo: yup
        .string()
        .matches(/^[0-9]+$/, "Phone No must be a valid number")
        .required("Phone No is required"),
    emailId: yup
        .string()
        .email("Email must be a valid email")
        .required("Email Id is required"),
    finalSalePrice: yup.string().required("Final Sale Price is required"),
    names: yup.array().of(
        yup.object().shape({
            title: yup.string().required("Title is required"),
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            passport: yup.string().required("passport no is required"),
            passportExpiry: yup.string().required("Passport expiry date is required"),
        })
    ),
});
const FixedDeparture = () => {
    const reducerState = useSelector((state) => state);
    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
    const userData = reducerState?.logIn?.loginData?.data?.data;
    const [isLoading, setIsLoading] = useState(false);
    const [toQuery, settoQuery] = useState("");
    const [toSearchResult, setToSearchResults] = useState([]);
    const [toSearchResultData, setToSearchResultsData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [item, setItem] = useState(null);
    const [openModal1, setOpenModal1] = useState(false);
    const [item1, setItem1] = useState(null);
    const [loginName, setLoginName] = useState(userData?.username);
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const [tempnumberOfSeats, setTempNumberSeats] = useState(0);
    const [status, setStatus] = useState("sold");
    const [salePrice, setSalePrice] = useState(22000);
    const [soldTo, setSoldTo] = useState(userData?.username);
    const [phoneNo, setPhoneNo] = useState("");
    const [emailId, setEmailId] = useState(userData?.email);
    const [finalSalePrice, setFinalSalePrice] = useState("");
    const [enableName, setEnableName] = useState(false);
    
    // console.log("userData", userData);
    useEffect(() => {
        let mounted = true;

        const fetchSearchResults = async () => {
            setIsLoading(true);

            // make an API call to get search results

            const results = await axios.get(`${apiURL.baseURL}/skyTrails/getSector`);
            setToSearchResults(results?.data);
            // console.log(
            //     results,
            //     "jfdvhjdfvdfuivfuifviufviu................................"
            // );
            settoQuery(results?.data.data[0]?.Sector);
        };
        fetchSearchResults();

        // return () => {
        //   mounted = false;
        // };
    }, []);

    const handelSearch = async () => {
        const results = await axios.get(
            `${apiURL.baseURL}/skyTrails/fixDeparturefilter?Sector=${toQuery}`
            // `${apiURL.baseURL}/skyTrails/fixDeparturefilter?Sector=DEL-DXB`
        );
        console.warn(
            results?.data?.data,
            "result1 ................................................."
        );
        setToSearchResultsData(results?.data?.data);
        console.warn("search result click", results?.data?.data);
    };

    const handleSubmittest = (e) => {
        e.preventDefault();
        // console.log({
        //     loginName,
        //     numberOfSeats,
        //     status,
        //     salePrice,
        //     soldTo,
        //     phoneNo,
        //     emailId,
        //     finalSalePrice,
        // });
    };
    const onSubmit = (data) => {
        // 'data' contains all the form values
        console.warn(data, "// 'data' contains all the form values");
        const payload = {
            userId: userData?.id,
            loginName: data?.loginName,
            emailId: data?.emailId,
            numberOfSeats: data?.numberOfSeats,
            phoneNo: data?.phoneNo,
            soldTo: data?.soldTo,
            status: data?.status,
            finalSalePrice: data?.itemPrice * data?.numberOfSeats,
            names: data?.names,
            flightId: item?._id
        };
        userApi.fixedDepartureBooking(payload);
        reset();
        setNumberOfSeats(0);
    };
    // console.warn("Fetching results", toSearchResult);
    // console.log(item, "item");
    return (
        <>
            <div className="container-fluid margin-pecenatage">
                <div className="topBoxDeparture">
                    <h3>Search Fixed Departure</h3>
                    <p> </p>
                    <label htmlFor="">
                        Sector <sup>*</sup>
                    </label>

                    <div className="fixedDepartSelect">
                        {toSearchResult.data?.length > 0 ? (
                            <select
                                class="form-select"
                                onChange={(e) => settoQuery(e.target.value)}
                                aria-label="Default select example"
                            >
                                {toSearchResult?.data.map((item, index) =>
                                    index === 0 ? (
                                        <option selected value={item.Sector}>
                                            {item.Sector}
                                        </option>
                                    ) : (
                                        <option value={item.Sector}>{item.Sector}</option>
                                    )
                                )}
                            </select>
                        ) : (
                            ""
                        )}
                        <button
                            className="fixedDepartButton"
                            onClick={() => handelSearch()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="table1">
                    {toSearchResultData.length > 0 && (
                        <table

                        //  id="boxx" sx={{ mt: "50px", position: "fixed", top: "30%", left: "0", width: "100%", display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection: "column" }}
                        >
                            <thead
                            //  container spacing={0} columns={16} sx={{ backgroundColor: "#071C2C", display: 'flex', justifyContent: 'center', alignItems: "center", height: "70px" }}
                            >
                                <tr>
                                    <th item className="4grid_item">
                                        Sector
                                    </th>
                                    <th item className="4grid_item">
                                        Departure Date
                                    </th>
                                    <th item className="4grid_item">
                                        Return Date
                                    </th>
                                    <th item className="4grid_item">
                                        Airlines
                                    </th>
                                    <th item className="4grid_item">
                                        Flight No
                                    </th>
                                    <th item className="4grid_item">
                                        Total Seats
                                    </th>
                                    <th item className="4grid_item">
                                        Onward Time
                                    </th>
                                    <th item className="4grid_item">
                                        Return Time
                                    </th>
                                    <th item className="4grid_item">
                                        Agent Price
                                    </th>
                                    <th item className="4grid_item">
                                        Sold
                                    </th>
                                    <th item className="4grid_item">
                                        UnSold
                                    </th>
                                    <th item className="4grid_item">
                                        Hold
                                    </th>
                                    <th item className="4grid_item">
                                        Availlable Seats
                                    </th>
                                    <th item className="4grid_item">
                                        AirTKT
                                    </th>
                                    <th item className="4grid_item">
                                        AIRPKG
                                    </th>
                                </tr>
                            </thead>

                            {toSearchResultData.length > 0 &&
                                toSearchResultData.map((item, index) => (
                                    <tbody
                                    //  className="child1" container spacing={0} columns={16}  sx={{ backgroundColor: "#071C2C", display: 'flex', justifyContent: 'center', alignItems: "center", height: "70px"  }}
                                    >
                                        <tr>
                                            <td item className="4grid_item item14">
                                                {item.Sector}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.DepartureDate}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.ReturnDate}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.Airlines}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.FlightNo}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.AvailableSeats}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.OnwardTime}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.ReturnTime}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.Price}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.Sold}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.UnSold}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.Hold}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.AvailableSeats}
                                            </td>

                                            <td item className="4grid_item item14">
                                                {item.AirTKT === "Call Us Book" ? (
                                                    item.AirTKT
                                                ) : (
                                                    <button
                                                        className="book_know_btn"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setItem(item);
                                                            setOpenModal((prev) => !prev);
                                                        }}
                                                    >
                                                        Book Know
                                                    </button>
                                                )}
                                            </td>
                                            <td item className="4grid_item item14">
                                                {item.AIRPKG}
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </table>
                    )}
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={() => {
                    setItem("");
                    setOpenModal((prev) => !prev);
                }}
                sx={{ padding: "9px" }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="fixeddGlass">
                    <Box display="flex" justifyContent="space-around" >
                        <Box>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sector</td>
                                        <td>{item?.Sector}</td>
                                    </tr>
                                    <tr>
                                        <td>Dept Dates</td>
                                        <td>{item?.DepartureDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Return Dates</td>
                                        <td>{item?.ReturnDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Airlines</td>
                                        <td>{item?.Airlines}</td>
                                    </tr>
                                    <tr>
                                        <td>Flight No</td>
                                        <td>{item?.FlightNo}</td>
                                    </tr>
                                    <tr>
                                        <td>Onward Time</td>
                                        <td>{item?.OnwardTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Return Time</td>
                                        <td>{item?.ReturnTime}</td>
                                    </tr>
                                    <tr>
                                        <td>Agent Price</td>
                                        <td>{item?.Price}</td>
                                    </tr>
                                    <tr>
                                        <td>Available Seats</td>
                                        <td>{item?.AvailableSeats}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                        <Box>
                            {/* <form onSubmit={handleSubmittest}>
                <label>
                  Login Name:
                  <input type="text" value={loginName} />
                </label>

                <label>
                  No of Seats:
                  <input
                    type="number"
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(e.target.value)}
                  />
                </label>

                <label>
                  Status:
                  <select
                    id="title"
                    name="title"
                    style={{ padding: "0px" }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="purchase">Purchase</option>
                    <option value="Hold">Hold</option>
                  </select>
                </label>

                <label>
                  Sale Price:
                  <input type="number" value={item?.Price} />
                </label>

                <label>
                  Sold To:
                  <input
                    type="text"
                    value={soldTo}
                    onChange={(e) => setSoldTo(e.target.value)}
                  />
                </label>

                <label>
                  Phone No:
                  <input
                    type="tel"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </label>

                <label>
                  Email Id:
                  <input type="email" value={emailId} />
                </label>

                <label>
                  Final Sale Price:
                  <input type="text" value={item?.Price * numberOfSeats} />
                </label>
                <Button
                  onClick={() => {
                    setEnableName((prev) => !prev);
                  }}
                >
                  ENTER NAMES
                </Button>

                {enableName && (
                  <form
                    style={{
                      overflow: "hidden",
                      height: "100px",
                      overflowY: "scroll",
                      padding: "10px",
                    }}
                  >
                    {Array.from({ length: numberOfSeats }, (_, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          <p>Name{index + 1}</p>
                          <select
                            id="title"
                            name="title"
                            style={{ padding: "0px" }}
                          >
                            <option value="mr">Mr</option>
                            <option value="ms">Ms</option>
                            <option value="mrs">Mrs</option>
                          </select>
                          <input type="text" placeholder="enter first name" />
                          <input type="text" placeholder="enter last name" />
                          <input type="text" placeholder="enter passport" />
                          <input
                            type="date"
                            placeholder="enter passport expiry"
                          />
                        </div>
                      );
                    })}
                  </form>
                )}

                <button type="submit">Submit</button>
              </form> */}
                            <form className="fixedForm" onSubmit={handleSubmit(onSubmit)}>
                                <label>
                                    Login Name:
                                    <input
                                        {...register("loginName")}
                                        type="text"
                                        value={loginName}
                                    />
                                </label>

                                <label>
                                    No of Seats:
                                    <input
                                        {...register("numberOfSeats")}
                                        type="number"
                                        value={tempnumberOfSeats}
                                        onChange={(e) => {
                                            setNumberOfSeats(0);
                                            setTempNumberSeats(e.target.value);
                                        }}
                                    />
                                </label>

                                <label>
                                    Status:
                                    <select
                                        {...register("status")}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="purchase">Purchase</option>
                                        <option value="Hold">Hold</option>
                                    </select>
                                </label>

                                <label>
                                    Sale Price:
                                    <input
                                        {...register("itemPrice")}
                                        type="number"
                                        value={item?.Price}
                                    />
                                </label>

                                <label>
                                    Sold To:
                                    <input
                                        {...register("soldTo")}
                                        type="text"
                                        value={soldTo}
                                        onChange={(e) => setSoldTo(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Phone No:
                                    <input
                                        {...register("phoneNo")}
                                        type="tel"
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                    />
                                    {errors.phoneNo && <p>{errors.phoneNo.message}</p>}
                                </label>

                                <label>
                                    Email Id:
                                    <input
                                        {...register("emailId")}
                                        type="email"
                                        value={emailId}
                                    />
                                </label>

                                <label>
                                    Final Sale Price:
                                    <input
                                        {...register("finalSalePrice")}
                                        type="text"
                                        value={item?.Price * tempnumberOfSeats}
                                    />
                                </label>

                                <button
                                    type="button"
                                    className="backButton"
                                    onClick={() => {
                                        setNumberOfSeats(tempnumberOfSeats);
                                        setEnableName(true);
                                        setOpenModal1((prev) => !prev);
                                    }}
                                    disabled={tempnumberOfSeats == 0 ? true : false}
                                >
                                    ENTER NAMES
                                </button>

                                {enableName && numberOfSeats > 0 && (
                                    <Modal
                                        open={openModal1}
                                        onClose={() => {
                                            // setItem1("");
                                            setOpenModal1((prev) => !prev);
                                        }}
                                        sx={{ padding: "9px", zIndex: 99 }}
                                        id="zZindex"
                                        aria-labelledby="modal-modal-title "
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style1} className="fixeddGlass">
                                            <div
                                            className="fixedContainer"
                                               
                                            >
                                                <div className="passenger"><h1>Passenger Detail's</h1> </div>
                                                {Array.from({ length: numberOfSeats }, (_, index) => (
                                                    <div
                                                        key={index}
                                                        className="Fixedname"
                                                        style={{


                                                           
                                                            
                                                        }}
                                                    >
                                                        <p>Name{index + 1}</p>
                                                        <div className="fixed_data">
                                                            <Controller
                                                                render={({ field }) => (
                                                                    <select {...field} style={{ padding: "0px" }}>
                                                                        <option value="mr">Mr</option>
                                                                        <option value="ms">Ms</option>
                                                                        <option value="mrs">Mrs</option>
                                                                    </select>
                                                                )}
                                                                control={control}
                                                                name={`names[${index}].title`}
                                                                defaultValue="mr"
                                                            />
                                                            <Controller
                                                                render={({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        type="text"
                                                                        placeholder="enter first name"
                                                                    />
                                                                )}
                                                                control={control}
                                                                name={`names[${index}].firstName`}
                                                                defaultValue=""
                                                            />
                                                            <Controller
                                                                render={({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        type="text"
                                                                        placeholder="enter last name"
                                                                    />
                                                                )}
                                                                control={control}
                                                                name={`names[${index}].lastName`}
                                                                defaultValue=""
                                                            />
                                                            <Controller
                                                                render={({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        type="text"
                                                                        placeholder="enter passport"
                                                                    />
                                                                )}
                                                                control={control}
                                                                name={`names[${index}].passport`}
                                                                defaultValue=""
                                                            />
                                                            <Controller
                                                                render={({ field }) => (
                                                                    <input
                                                                        {...field}
                                                                        type="date"
                                                                        placeholder="enter passport expiry"
                                                                    />
                                                                )}
                                                                control={control}
                                                                name={`names[${index}].passportExpiry`}
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Box>
                                    </Modal>
                                )}

                                <button
                                    type="submit"
                                    className="backButton"
                                    disabled={numberOfSeats == 0 || !enableName}
                                >
                                    Submit
                                </button>
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FixedDeparture;
