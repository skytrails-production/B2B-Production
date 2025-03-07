import axios from "axios";
import { apiURL } from "../../Constants/constant";
import SecureStorage from "react-secure-storage";
import secureLocalStorage from "react-secure-storage";

function api() {
  const userIP = (formData) => {
    return axios.get("https://api.ipify.org?format=json");
  };


  const markUp = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/api/admin/getMarkup`);
  };

 
 
  const flightList = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/airline`);
  };
  const airportList = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/searchCity`);
  };
  const faqReviewApi = () => {
    return axios.get(`${apiURL.baseURL}/skyTrails/api/user/getFaqRating`);
  };
  const fetchflightSuggest = async () => {
    let data = await axios.get(
      `${apiURL.baseURL}/skyTrails/staticContent/flightPayload/listStaticFlightPayload`
    );
    return data?.data?.result;
  };

  const usersTableData = () => {
    return axios.get(
      `${apiURL.baseURL}/skyTrails/api/agent/getAgentTableWithRevenue`
    );
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
      url: `skyTrails/wallet/update_amount/${key.walletid}`,
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

  //agent Profile Login

  const agentProfileLogin = (payload) => {
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

  const userB2BOnbording = (formData1) => {
    return axios({
      method: "POST",
      url: "/skyTrails/b2b/updateProfile",
      baseURL: `${apiURL.baseURL}`,
      data: formData1,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

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

  const oneWaySearch = (payload) => {
    return axios({
      method: "POST",
      // url: "/skytrails/api/combined/combineTVOAMADEUSPriceSort",
      url: "/skytrails/api/combined/AMADEUSPriceSort",

      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const oneWaySearchCombined = (payload) => {
    return axios({
      method: "POST",
      // url: "/skytrails/api/combined/combineTVOAMADEUSPriceSort",
      url: "/skyTrails/api/combine/combineApiRes",
      // url: "/skytrails/api/combined/AMADEUSPriceSort",

      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const flightBookingDB = (payload) => {
    const token = SecureStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/api/amadeus/user/flightBooking",

      // url: "/skyTrails/flight/search/oneway",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };

  const flightQuoteSearch = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/skyTrails/flight/farequote",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response; // Return the response if the request is successful
    } catch (error) {
      console.error("Error in flightQuoteSearch:", error);
      return { error: true, errorMessage: error };
    }
  };
  const flightSSR = async (payload) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${apiURL.baseURL}/skyTrails/flight/ssr`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Response = res?.data?.data?.Response;
      const mealLength = Response?.MealDynamic?.[0]?.filter((item) => {
        return item?.Code !== "NoMeal";
      });
      let BaggageList = Response?.Baggage?.[0].filter((item, index) => {
        return item?.Price !== 0;
      });
      let MealsList = mealLength;
      let baglis = [...Array(BaggageList?.length)].fill(0);
      let Meals = [...Array(Response?.MealDynamic?.[0]?.length)].fill(0);
      let MealsNew = Response?.MealDynamic?.[0]?.reduce((result, param) => {
        if (param.Code !== "NoMeal") {
          const flightNumber = param.FlightNumber;
          if (!result[flightNumber]) {
            result[flightNumber] = [];
          }
          result[flightNumber].push(0);
        }
        return result;
      }, {});
      let seatMapList = Response?.SeatDynamic;
      let seatListt = [];
      let seatAmountList = [];

      for (let i = 0; i < seatMapList?.[0]?.SegmentSeat?.length; i++) {
        // seatListt[i]={}
        seatListt.push([]);
        seatAmountList.push([]);
        // console.log(seatListt, "gg")
      }
      return {
        seatMap: seatMapList,
        number_of_seat_map: 0,

        number_of_airline: 0,
        seatList: seatListt,
        amountList: [],
        amountTVO: seatAmountList,
        defaultSeatOccupation: [],
        midAmount: 0,
        seatDataList: [],
        mealsList: MealsList,
        baggageList: BaggageList,
        baggage: baglis,
        meals: MealsNew,

        isError: false,
        isLoading: false,
        errorMessage: "",
        isSeatsShow: seatMapList?.[0]?.SegmentSeat?.length > 0 ? true : false,
      };
    } catch (error) {
      console.warn(error);
      return { error: true, errorMessage: error };
    }
  };

  const flightRuleSearch = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/skyTrails/flight/farerule",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error in flightRuleSearch:", error);
      return { error: true, errorMessage: error };
    }
  };


  const kafilaFareCheck = async (payload) => {
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/kafila/kafilaFareCheck`,
        payload
      );
      return response;
    } catch (error) {
      console.error(error);
      return { error: true, errorMessage: error?.message };
    }
  };
  const fetchAirsel = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${apiURL.baseURL}/skyTrails/amadeus/airsell`,
        data: payload,
        headers: {
          "Content-Type": "text/xml",
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      return { error: true, errorMessage: error };
    }
  };
  const flightFromData = (payload) => {
    return payload;
  };

  const flightToData = (payload) => {
    return payload;
  };
  const flightBookGDS = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: "skyTrails/flight/booking",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return { error: true, errorMessage: error };
    }
  };

  const flightGetTicketLcc = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: "skyTrails/flight/getticketlcc",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return { error: true, errorMessage: error };
    }
  };

  const flightGetTicketNonLcc = async (payload) => {
    try {
      const response = await axios({
        method: "POST",
        url: "skyTrails/flight/getticketnonlcc",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return { error: true, errorMessage: error };
    }
  };

  const flightBookingDataSave = async (payload) => {
    try {
      const token = SecureStorage?.getItem("jwtToken");
      const response = await axios({
        method: "POST",
        url: "skyTrails/api/user/flightBooking",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      return response;
    } catch (error) {
      return { error: true, errorMessage: error };
    }
  };
  const flightBookingDataSaveKafila = async (payload) => {
    try {
      const token = SecureStorage?.getItem("jwtToken");
      const response = await axios({
        method: "POST",
        url: "/skytrails/flightbooking/kafila/addflightbooking",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      return response;
    } catch (error) {
      return { error: true, errorMessage: error };
    }
  };
  //Kafila PNR
  const kafilapnr = async (payloadvalue) => {
    try {
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/kafila/kafilaPnrcreation`,
        payloadvalue
      );
      // setresponse(response);
      // console.log("response aagya", response);
      // setpnrResponse(response?.data);
      return response?.data;
      // console.log(response);
    } catch (error) {
      console.error(error, "error in kafila PNR api ");
      return { error: true, errorMessage: error };
    }
  };

  // return flight api

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

  const flightGetTicketLccReturn = async (payload) => {
    try {
      return axios({
        method: "POST",
        url: "/skyTrails/flight/getticketlcc",
        baseURL: `${apiURL.baseURL}`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return { error: true, errorMessage: error };
    }
  };

  // multicity flight api

  const multicitySearch = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/search/multicity",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const addBookingDetailsKafila = async (payloadkafila) => {
    try {
      const token = SecureStorage?.getItem("jwtToken");
      const response = await axios.post(
        `${apiURL.baseURL}/skyTrails/api/user/kafila/userFlightBookingData`,
        payloadkafila,
        {
          headers: {
            token: token,
          },
        }
      );
    } catch (error) {}
  };

  // multicity flight api

  // const oneWaySearch = (payload) => {
  //   return axios({
  //     method: "POST",
  //     url: "/skytrails/api/combined/combineTVOAMADEUSPriceSort",

  //     // url: "/skyTrails/flight/search/oneway",
  //     baseURL: `${apiURL.baseURL}`,
  //     data: payload,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };

  //flight return api

  // const returnSearch = async (payload) => {
  //   // console.log({ payload, emtPayload });
  //   return axios({
  //     method: "POST",
  //     url: "/skyTrails/flight/search/return",
  //     baseURL: `${apiURL.baseURL}`,
  //     data: payload,
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  // };
  const forgetPasswordLink = async (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/api/agent/forgetPassword",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };
  const resetPassword = async (userID, payload) => {
    return axios({
      method: "PUT",
      url: `/skyTrails/api/agent/resetPassword/${userID}`,
      data: payload,
      baseURL: `${apiURL.baseURL}`,
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

  

  

  const Ssr = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flight/ssr",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // ///////////////////////////////////////////////////////////////////////////////////////////

  const fligtname = () => {
    return axios({
      method: "GET",
      url: "/skyTrails/airline",
      baseURL: `${apiURL.baseURL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const cityname = () => {
    return axios({
      method: "GET",
      url: "/skyTrails/searchCity",
      baseURL: `${apiURL.baseURL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // const fligtname = () => {
  //   return axios.get(`${apiURL.baseURL}/skyTrails/airline`);
  // };

  // ///////////////////////////////////////////////////////////////////////////////////////////

 

  
 
  //Flight API's End

  const createPackage = (formData2) => {
    return axios({
      method: "POST",
      url: "/skyTrails/holidaypackage/create",
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

  // new hotel grn api's

  const hotelSearchGRN = (payload) => {
    return axios({
      method: "POST",
      //url: `/skyTrails/grnconnect/hotelSearchWithPagination?page=${payload.page}`,
      url: `/skyTrails/tboandgrn/searchresults`,
      baseURL: `${apiURL.baseURL}`,
      data: payload.data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelsingleDataGRN = (payload) => {
    // console.log("key")
    const { data } = payload;
    const searchId = payload.searchID;
    return axios({
      method: "POST",
      url: `/skyTrails/grnconnect/rateRefetchHotel?searchId=${searchId}`,
      baseURL: `${apiURL.baseURL}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookRoomGRN = (payload) => {
    // console.log("key")
    const { data } = payload;
    const searchId = payload.searchID;
    console.log(searchId, "************************");
    const hcode = payload.hotel_code;
    return axios({
      method: "GET",
      // url: `/skyTrails/grnconnect/rateRefetchHotel?searchId=${searchId}`,
      url: `/skyTrails/grnconnect/refetchHotel?searchId=${searchId}&hcode=${hcode}`,
      baseURL: `${apiURL.baseURL}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelGalleryGRN = (payload) => {
    console.log("key");
    const hotel_id = payload.hotel_id;
    return axios({
      method: "GET",
      url: `/skyTrails/grnconnect/hotelimages?hotelCode=${hotel_id}`,
      baseURL: `${apiURL.baseURL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookingGRN = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/grnconnect/hotelbooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const hotelBookingDetailsSaveGRN = (payload) => {
    const token = secureLocalStorage?.getItem("jwtToken");
    return axios({
      method: "POST",
      url: "/skyTrails/grnconnect/addhotelBooking",
      baseURL: `${apiURL.baseURL}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
  };

  // new hotel grn api's

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
 
  const flightbookingamedius = (payload) => {
    return axios({
      method: "POST",
      url: "/skyTrails/flightBooking/amadeus/addflightbooking",
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
      return response.data;
    } catch (error) {
      // Handle the error appropriately, e.g., log it or throw a custom error
      alert("Sector already exists", error);
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
  const updateFlightBookingSeat = async (data) => {
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
  };

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
    agentProfileLogin,
    flightbookingamedius,
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
    hotelSearchGRN,
    hotelBookingDetailsSaveGRN,
    hotelSearchInfo,
    hotelRoomInfo,
    hotelBlockRoom,
    hotelBookRoom,
    hotelBookingDetails,
    bookingHolidayRequest,
    bookingHoliday,
    hotelsingleDataGRN,
    resetPassword,
    createForex,
    createForexForCustomer,
    forexData,
    forexCustomerData,
    visaRequest,
    getBusSearch,
    busBlock,
    hotelBookingGRN,
    hotelGalleryGRN,
    hotelBookRoomGRN,
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
    Ssr,
    fligtname,
    forgetPasswordLink,
    cityname,
    airportList,
    oneWaySearchCombined,
    
    flightList,
    markUp,
    fetchAirsel,
    fetchflightSuggest,
    multicitySearch,
    flightBookingDB,
    flightFromData,
    flightToData,
    faqReviewApi,
    kafilaFareCheck,
    addBookingDetailsKafila,
    flightSSR,
    kafilapnr,
    flightBookingDataSaveKafila
    
  };
}

const userApi = api();

export default userApi;
