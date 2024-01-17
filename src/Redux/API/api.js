import axios from "axios";
import { apiURL } from "../../Constants/constant";


function api() {
  const userIP = (formData) => {
    return axios.get("https://api.ipify.org?format=json");
  };

  const usersTableData = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/user/getallusers`);
  };

  const userB2BToken = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/token",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const setVendorAmount = (payload) => {
    const { data, key } = payload;
    return axios({
      method: "PUT",
      url: `skyTrails/wallet/update_amount/${key.wallet_Id}`,
      baseURL: `${apiURL.baseURL}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const passengerData = (payload) => {
    // console.log("Passenger payload", payload);
    return payload;
  };
  const userB2BLogin = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/b2b/login",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const userB2BRegistration = (formData1) => {
    return axios({
      method: "POST",
      url: "/skyTrails/b2b/register",
      baseURL: `${apiURL.baseURL}`,
      data: formData1,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  
  const userB2BOnbording=(formData1)=>{
    return axios({
      method: "POST",
      url: "/skyTrails/b2b/updateProfile",
      baseURL: `${apiURL.baseURL}`,
      data: formData1,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const adminAuth = (payload) => {
    return axios({
      method: "POST",
      url: "/api/auth/signin",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const adminSignOut = (payload) => {
    return axios({
      method: "POST",
      url: "/api/auth/signout",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };



  const activeStatus = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/user/update",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const markUpStatus = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/user/setmarkup",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //Flight API's Start

  const oneWaySearch = async (payload) => {
    
    try {
      const response = await axios({
        method: "POST",
        url: "/skyTrails/flight/search/oneway",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      // Check if the response status is within the success range (e.g., 200-299)
      if (response.status >= 200 && response.status < 300) {
        return response; // Return the data if successful
      } else {
        // If the response status is not in the success range, throw an error
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle the error here
      // console.error("An error occurred during the request:", error);
      
      alert(error)
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

  //flight return api

  const returnSearch = async (payload) => {
    // console.log({ payload, emtPayload });
    return axios({
      method: "POST",
      url: "/skyTrails/flight/search/return",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const oneWayEMTSearch = (payload) => {
    // console.log("Paayload EMT Search", payload);
    return axios({
      method: "POST",
      url: "/emt/flight/search/oneway",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const flightRuleSearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/farerule",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightQuoteSearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/farequote",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightBookGDS = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/booking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightGetTicketLcc = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/getticketlcc",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const flightGetTicketLccReturn = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/getticketlcc",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const flightGetTicketNonLcc = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/getticketnonlcc",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  //Flight API's End

  const createPackage = (formData2) => {
    return axios({
      method: "POST",
      url: "/skyTrails/international/create",
      baseURL: `${apiURL.baseURL}`,
      data: formData2,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const searchPackage = (payload) => {
    // console.log("searchPackage" + payload.destination);
    // console.log("searchPackage" + payload.days);
    const { destination, days } = payload;
    // ?filter=${days}&keyword=${destination}
    return axios.get(
      `${apiURL.baseURL}/skyTrails/international/getAll?keyword=${destination}`
    );
  };

  const getOnePackage = (payload) => {
    // console.log("getOnePacked", payload);
    const { id } = payload;
    return axios.get(`${apiURL.baseURL}/skyTrails/international/getone/${id}`);
  };

  // GET holiday Booking Request

  const bookingHolidayRequest = (payload) => {
    // console.log("bookingHolidayRequest api", payload);
    return axios({
      method: "POST",
      url: "/skyTrails/international/pakageBookingrequest",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const bookingHoliday = (payload) => {
    // console.log("bookingHolidayRequest api", payload);
    return axios({
      method: "POST",
      url: "/skyTrails/international/pakageBooking/",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createForex = (formData3) => {
    // console.log(formData3);
    return axios({
      method: "POST",
      url: "/skyTrails/forex/createForex",
      baseURL: `${apiURL.baseURL}`,
      data: formData3,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createForexForCustomer = (formData3) => {
    return axios({
      method: "POST",
      url: "skyTrails/forex/createCustomerforex",
      baseURL: `${apiURL.baseURL}`,
      data: formData3,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Forex data for dashboard
  const forexData = () => {
    return axios.get("https://api.skyTrails.com/skyTrails/forex/getAllForex");
  };
  const forexCustomerData = () => {
    return axios.get(`${apiURL.baseURL}m/skyTrails/forex/getAllCustomerforex`);
  };

  // visa data for dashboard
  const visaData = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/visa/getAllVisa`);
  };

  // create Visa
  const visaRequest = (formData4) => {
    // console.log("api.js", formData4.payload);
    return axios({
      method: "POST",
      url: "skyTrails/visa/createVisa",
      baseURL: `${apiURL.baseURL}`,
      data: formData4,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // Bus Search
  const getBusSearch = (payload) => {
    // console.log("bus result api", payload);
    return axios({
      method: "POST",
      url: "/skyTrails/bus/search",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //Hotel API's Start
  const hotelSearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/hotel/search/dedup",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelSearchInfo = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/hotel/searchinfo",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelRoomInfo = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/hotel/room",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBlockRoom = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/hotel/blockroom",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookRoom = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/hotel/bookroom",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookingDetails = (payload) => {
    //  console.log("payload of api 👍")
    return axios({
      method: "POST",
      url: "/skyTrails/hotel/bookingdetails",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //Bus API's Start

  const busBlock = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/bus/block",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const busBook = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/bus/book",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const busBookDetails = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/bus/bookingdetails",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const busBookingDataSave = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/busBooking/addBusBookingData",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const flightBookingDataSave = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flightBooking/addFlightBookingData",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const hotelBookingDataSave = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/hotelBooking/addHotelBookingData",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const fixedDepartureAddSector = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/skyTrails/addSector",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Assuming you want to return the response data
      // alert(response.data)
      return response.data
    } catch (error) {
      // Handle the error appropriately, e.g., log it or throw a custom error
      alert("Sector already exists",error);
      throw error; // You can choose to throw the error again or handle it differently
    }
  };
   const fixedDepartureBooking = async (payload) => {
     try {
       const response = await axios({
         method: "POST",
         url: "/skyTrails/fixDepartureBooking",
         baseURL: `${apiURL.baseURL}`,
         data: payload,
         headers: {
           "Content-Type": "application/json",
         },
       });

       // Assuming you want to return the response data
       // alert(response.data)
       return response.data;
     } catch (error) {
       // Handle the error appropriately, e.g., log it or throw a custom error
       alert("Something Went Wrong", error);
       throw error; // You can choose to throw the error again or handle it differently
     }
   };
   const updateFlightBookingSeat=async(data)=>{
     try {
       const response = await axios({
         method: "POST",
         url: "/skyTrails/updateFixDepartureData",
         baseURL: `${apiURL.baseURL}`,
         data: data,
         headers: {
           "Content-Type": "application/json",
         },
       });

       // Assuming you want to return the response data
       // alert(response.data)
       return response.data;
     } catch (error) {
       // Handle the error appropriately, e.g., log it or throw a custom error
       alert("Something Went Wrong", error);
       throw error; // You can choose to throw the error again or handle it differently
     }
   }


  /// userDetails by Id

  const UserDetail = (payload) => {
    // console.log("userDataId", payload);
    const userId = payload;
    return axios.get(`${apiURL.baseURL}/skyTrails/user/${userId}`);
  };

  // balance subtract api

  const balanceSubtract = (payload) => {
    // console.log("balance of api 👍",payload)
    return axios({
      method: "POST",
      url: "/skyTrails/subtractBalance",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    userB2BRegistration,
    userB2BOnbording,
    userIP,
    usersTableData,
    userB2BToken,
    adminAuth,
    adminSignOut,
    activeStatus,
    markUpStatus,
    passengerData,
    oneWaySearch,
    returnSearch,
    oneWayEMTSearch,
    userB2BLogin,
    flightRuleSearch,
    flightQuoteSearch,
    flightBookGDS,
    flightGetTicketLcc,
    flightGetTicketLccReturn,
    flightGetTicketNonLcc,
    setVendorAmount,
    createPackage,
    searchPackage,
    getOnePackage,
    hotelSearch,
    hotelSearchInfo,
    hotelRoomInfo,
    hotelBlockRoom,
    hotelBookRoom,
    hotelBookingDetails,
    bookingHolidayRequest,
    bookingHoliday,
    createForex,
    createForexForCustomer,
    forexData,
    forexCustomerData,
    visaRequest,
    getBusSearch,
    busBlock,
    busBook,
    busBookDetails,
    busBookingDataSave,
    visaData,
    UserDetail,
    balanceSubtract,
    flightBookingDataSave,
    hotelBookingDataSave,
    fixedDepartureAddSector,
    fixedDepartureBooking,
    updateFlightBookingSeat,
  };
}

const userApi = api();

export default userApi;
