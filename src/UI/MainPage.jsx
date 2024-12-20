import React, { useEffect, useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Layout/Footer";
import InnerNavbar from "../Layout/InnerNavbar";
import Active from "../Pages/Activities/Active";
import Banner from "../Pages/Banner/Banner";
import "./MainPage.css";
import Flight from "../Pages/Flight/Flight";
import Hotel from "../Pages/Hotel/Hotel";
import OneWay from "../Pages/Flight/FlightForm/OneWay";
import OffShare from "../Pages/Flight/FlightForm/OffShare";
import MultiStop from "../Pages/Flight/FlightForm/MultiStop";
import Calander from "../Pages/Flight/FlightForm/Calendar";
import Return from "../Pages/Flight/FlightForm/Return";
import Flightresult from "../Pages/Flight/flightresult/Flightresult";
import Registration from "../Pages/registration/Registration";
import Onbording from "../Pages/registration/Onbording";
import Login from "../Pages/login/Login";
import Forget from "../Pages/login/ForgetPassword";
import RMforgotpassword from "../Pages/relationshipManager/RMforgotpassword";
import SubadminForgetPassword from "../Pages/subAdmin/SubadminForgetPassword";
import HotelSearch from "../Pages/Hotel/hotelsearch/HotelSearch";
import Booknow from "../Pages/Flight/booknow/Booknow";
import Passengerdetail from "../Pages/Flight/passengerdetail/Passengerdetail";
import FlightReviewbooking from "../Pages/Flight/flightreviewbooking/FlightReviewbooking";
import ReturnPassenger from "../Pages/Flight/flightresult/FlightresultReturn/ReturnPassenger/PassengerReturn";
import ReturnPassengerINC from "../Pages/Flight/flightresult/FlightresultReturn/ReturnPassenger/ReturnPassengerINC";
import Flightbookingconfirmation from "../Pages/Flight/flightbookingconfirmation/Flightbookingconfirmation";
import HolidayPackage from "../Pages/holidayPackage/HolidayPackage";
import HolidayPackageResult from "../Pages/holidayPackage/holidaypackageresult/HolidayPackageResult";
import HolidayForm from "../Pages/holidayPackage/holidayform/HolidayForm";
import Holidaybooknow from "../Pages/holidayPackage/holidaybooknowpage/Holidaybooknow";
import HolidayGuestDetail from "../Pages/holidayPackage/holidayguestdetail/HolidayGuestDetail";
import Holidayreviewbooking from "../Pages/holidayPackage/holidayreviewbooking/Holidayreviewbooking";
import HolidayconfirmationDetail from "../Pages/holidayPackage/holidaybookingconfirmation/Holidaybookingconfirmation";
import Assistanceinssurance from "../Pages/assistance&inssurance/Assistanceinssurance";
import Sightseeing from "../Pages/sightseeing/Sightseeing";
import BusResult from "../Pages/Bus/BusResult/BusResult";
import Hotelresult from "../Pages/grnpages/Hotel/hotelresult/Hotelresult";
import BusPassengerDetail from "../Pages/Bus/busPassengerDetail/BusPassengerDetail";
import BusReviewBooking from "../Pages/Bus/busreviewbooking/BusReviewBooking";
import Busbookingconfirmation from "../Pages/Bus/busbookingconfirmation/Busbookingconfirmation";
import SightseeingResult from "../Pages/sightseeing/sightseeingresult/SightseeingResult";
import SightseeingGuestDetail from "../Pages/sightseeing/sightseeingGuestDetail/SightseeingGuestsalesummary";
import HotelBooknow from "../Pages/Hotel/hotelbokknow/HotelBooknow";
import HotelBooknowTbo from "../Pages/grnpages/Hotel/Tbo/hotelbokknow/HotelBooknowTbo";
import HotelBooknowGrm from "../Pages/grnpages/Hotel/hotelbooknow/HotelBooknowGrm";
import Guestdetail from "../Pages/Hotel/guestdetail/Guestdetail";
import Reviewbooking from "../Pages/Hotel/hotelreviewbooking/Reviewbooking";
import ReviewbookingGrn from "../Pages/grnpages/Hotel/hotelreviewbooking/ReviewbookingGrn";
import ReviewbookingTbo from "../Pages/grnpages/Hotel/Tbo/hotelreviewbookingTbo/ReviewbookingTbo";
import Bus from "../Pages/Bus/Bus";
import SightseeingReviewBooking from "../Pages/sightseeing/sightseeingreviewbooking/SightseeingReviewBooking";
import SightseeingBookingConfirmation from "../Pages/sightseeing/sightseeingbookingconfirmation/SightseeingBookingConfirmation";
import Transfer from "../Pages/transfer/Transfer";
import TransferResult from "../Pages/transfer/TransferResult/TransferResult";
import TansferGuestDetail from "../Pages/transfer/tansferguestdetail/TansferGuestDetail";
import TransferReviewBooking from "../Pages/transfer/TransferReviewBooking/TransferReviewBooking";
import TransferConfirmation from "../Pages/transfer/transferconfirmation/TransferConfirmation";
import Forex from "../Pages/Forex/Forex";
import InsuranceSearchCriteria from "../Pages/assistance&inssurance/insuranceresult/InsuranceSearchCriteria";
import InsuranceResult from "../Pages/assistance&inssurance/insuranceresult/InsuranceResult";
import InsuranceGuestDetails from "../Pages/assistance&inssurance/insuranceguestdetails/InsuranceGuestDetails";
import InsuranceReviewBooking from "../Pages/assistance&inssurance/insurancereviewbooking/InsuranceReviewBooking";
import InsuranceBookingConfirmation from "../Pages/assistance&inssurance/insurancebookingconfirmation/InsuranceBookingConfirmation";
import Admin from "../Pages/admin/Admin";
import AgentProfileLogin from "../Pages/agentProfile/AgentProfileLogin";
import RegionLogin from "../Pages/relationshipManager/RegionLogin";
import RegionDashboard from "../Pages/relationshipManager/RegionDashboard";
import RegionBookings from "../Pages/relationshipManager/RegionBookings";
import RegionCancelReq from "../Pages/relationshipManager/RegionCancelReq";
import RegionChangeReq from "../Pages/relationshipManager/RegionChangeReq";
import AgentProfileDashbord from "../Pages/agentProfile/AgentProfileDashbord";
import AdminUserForm from "../Pages/admin/AdminUserForm";
import Administration from "../Pages/Account/Administration";
import Account from "../Pages/Account/Account";
import AccountDetails from "../Pages/Account/AccountDetails";
import Reports from "../Pages/reports/Reports";
import Services from "../Pages/services/Services";
import GSTform from "../Pages/gst/GSTform";
import Visaform from "../Pages/visa/Visaform";
import HotelbookingConfirmation from "../Pages/Hotel/hotelreviewbooking/HotelbookingConfirmation";
import Dashboard from "../Pages/Dashboard/Component/Dashboard";
import SubAdminDashboard from "../Pages/subAdmin/subAdminDashboard/subAdminDashboard";
import AdminLogin from "../Pages/AdminLogin/AdminLogin";
import CreateHolidayPackage from "../Pages/HotelPackage/createholidaypackage/CreateHolidayPackage";
import EditHolidayPackage from "../Pages/Dashboard/Component/Table/packageUpdate/EditPackage";
import Queue from "../Pages/Account/Queue";
import HolidayPackages from "../Pages/Account/HolidayPackages";
import MainBox from "../Layout/MainBoxNew";
import CreateMarkupForm from "../Pages/Dashboard/Component/Table/AddMarkup";

import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { ipAction, tokenAction } from "../Redux/IP/actionIp";
// import Slider from "../Pages/Banner/Slider";
import GotoTopBtn from "../Components/GotoTopBtn";
import FlightresultReturn from "../Pages/Flight/flightresult/FlightresultReturn/FlightresultReturn";
import GuestdetailGrm from "../Pages/grnpages/Hotel/guestdetail/GuestdetailGrm";
import FlightReturnInternational from "../Pages/Flight/flightresult/FlightresultReturn/FlightReturnInternational";
import Hotels from "../Pages/grnpages/Hotel/Hotels";
import Headers from "../Components/Headers";
import InnerNavbar1 from "../Layout/InnerNavbar1";
import LoadingSpinner from "./LoadingSpinner";
import FlightResResult from "../Pages/Flight/flightresult/FlightresultReturn/FlightResResult";
import FlightReturnReviewbooking from "../Pages/Flight/flightresult/FlightresultReturn/ReturnPassenger/FlightReturnReviewbooking";
import FlightReturnReviewbookingINC from "../Pages/Flight/flightresult/FlightresultReturn/ReturnPassenger/FlightReturnReviewbookingINC";
import FlightReturnBookingConfirmation from "../Pages/Flight/flightresult/FlightresultReturn/ReturnPassenger/FlightReturnBookingConfirmation";
import CreateSubAdminPage from "../Pages/Dashboard/Component/Table/AddSubadmin";
import CreateAdvertisementForm from "../Pages/Dashboard/Component/Table/AddAdvertisement";
import CreateWebAdvertisementForm from "../Pages/Dashboard/Component/Table/AddWebAdvertisement";
import SubAdminLoginPage from "../Pages/subAdmin/SubAdminSignIn"; // Import SubAdminLoginPage
import FlightOneTicket from "../Pages/Account/FlightOneTicket";
import BusOneTicket from "../Pages/Account/BusTicket";
import HotelOneTicket from "../Pages/Account/HotelTicket";
import FlightOpen from "../Pages/Account/FlightOpen";
import CreateAgentPage from "../Pages/Dashboard/Component/Table/AddAgent";
import CreateEventForm from "../Pages/Dashboard/Component/Table/AddEvent";
import CreateCouponForm from "../Pages/Dashboard/Component/Table/AddCoupons";
import AddNotification from "../Pages/Dashboard/Component/Table/AddNotification";
import UpdateFeed from "../Pages/Dashboard/Component/Table/UpdateFeed";
import Download from "./Download";
import AddReward from "../Pages/Dashboard/Component/Table/AddReward";
import PackageBanner from "../Pages/Dashboard/Component/Table/PackageBanner";
import AboutUs from "../Layout/AboutUs";
import ContactUs from "../Layout/ContactUs";
import PrivacyPolicy from "../Layout/PrivacyPolicy";
import RefundPolicy from "../Layout/RefundPolicy";
import TermandCondition from "../Layout/TermandCondition";
import AdminProfile from "../Pages/Dashboard/Component/Table/AdminProfile";
import Popular from "../Pages/Dashboard/Component/Table/Popular";
import { debounce } from "lodash";
import {} from "../utils/validation";
import Pakcat from "../Pages/Dashboard/Component/Table/Pakcat";
import Packages from "../Pages/Packagepages/Packages";
import Loginnew from "../Pages/login/Loginnew";
import HotelSearchs from "../Pages/grnpages/Hotel/hotelsearch/HotelSearch";
import CreateQuiz from "../Pages/Dashboard/Component/Table/CreateQuiz";
import CreateBlog from "../Pages/Dashboard/Component/Table/CreateBlog";
import Controls from "../Pages/Account/Controls";
import HotelTicketDB from "../Pages/grnpages/Hotel/guestdetail/HotelTicketDB";
import Passengerdetailamd from "../Pages/Flight/flightresult/Passengerdetailamd";
import FlightReviewbookingamd from "../Pages/Flight/flightreviewbooking/FlightReviewbookingamd";
import Flightbookingconfirmationamd from "../Pages/Flight/flightbookingconfirmation/Flightbookingconfirmationamd";
import GuestdetailTbo from "../Pages/grnpages/Hotel/Tbo/guestdetailTbo/GuestdetailTbo";
import CreateReview from "../Pages/Dashboard/Component/Table/packageUpdate/CreateReview";
import CreateHolidayPackageNew from "../Pages/HotelPackage/createholidaypackage/CreateHolidayPackageNew";
// import Carrerform from "../Pages/Dashboard/Component/Table/Careerform";
import PackagesList from "../Pages/HotelPackage/createholidaypackage/PackagesList";
import AddItenary from "../Pages/HotelPackage/createholidaypackage/AddItenary";
import HolidayAddImages from "../Pages/HotelPackage/createholidaypackage/HolidayAddImages";
import AddItenaryImage from "../Pages/HotelPackage/createholidaypackage/AddItenaryImage";
const MainPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const reducerState = useSelector((state) => state);
  const isLoginRoute = location.pathname === "/Login";
  const isRegisterRoute = location.pathname === "/Registration";
  const isLogin = location.pathname === "/adminLogin";
  const isAgentProfileLogin = location.pathname === "/agentProfile/login";
  const isDashboard = location.pathname === "/admin/dashboard";
  const isSubAdminLogin = location.pathname === "/subAdminLogin";
  const isSubAdmindashboard = location.pathname === "/subAdmin/dashboard";
  const isAddMarkup = location.pathname === "/addMarkup";
  const isAdminProfile = location.pathname === "/adminprofile";
  const navigate = useNavigate();
  const { id } = useParams();
  const isFlightEticketPage = location.pathname.startsWith("/FlightEticket");
  const isBusEticketPage = location.pathname.startsWith("/BusEticket");
  const isHotelEticketPage = location.pathname.startsWith("/HotelEticket");

  const [scrollY, setScrollY] = useState(0);

  // if wesbite width will go below 750px
  const [windowWidth, setWindowWidth] = useState(window.innerWidth > 750);

  const updateDimensions = useCallback(
    debounce(() => {
      setWindowWidth(window.innerWidth > 750);
    }, 200),
    []
  );

  useEffect(() => {
    const handleResizeScroll = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResizeScroll);
    window.addEventListener("scroll", handleResizeScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResizeScroll);
      window.removeEventListener("scroll", handleResizeScroll);
    };
  }, [updateDimensions]);

  useEffect(() => {
    if (!windowWidth) {
      // return (
      <Download />;
      // )
    }
  }, [windowWidth]);

  useEffect(() => {
    const pathname = location?.pathname?.split("/");

    // console.warn(reducerState);
    if (
      !reducerState?.logIn?.loginData?.data &&
      !location.pathname.includes("/Registration") &&
      !location.pathname.includes("/forgetPassword") &&
      !location.pathname.includes("/SubAdminforgetPassword") &&
      !location.pathname.includes("/RMforgetPassword") &&
      !location.pathname.includes("/adminLogin") &&
      !location.pathname.includes("/subAdminLogin") &&
      !location.pathname.includes("/subAdmin") &&
      !location.pathname.includes("/skyTrails/agent") &&
      !location.pathname.includes("/admin/dashboard") &&
      !location.pathname.includes("/agentProfile/Login") &&
      !location.pathname.includes("/agentProfile/dashboard") &&
      !location.pathname.includes("/relationshipManager/Login") &&
      !location.pathname.includes("relationshipManager/dashboard") &&
      !location.pathname.includes("relationShipManager/getAgentBookings") &&
      !location.pathname.includes("relationShipManager/getAgentCancelReq") &&
      !location.pathname.includes("relationShipManager/getAgentChangeReq")
    ) {
      navigate("/Login");
    } else if (location.pathname === "/admin/dashboard") {
      if (!reducerState?.adminAuth?.isLogin) {
        // navigate("/admin/dashboard");
        navigate("/adminLogin");
      }
      //  else {
      // }
    } else if (location.pathname === "/subAdmin/dashboard") {
      if (!reducerState?.subadminLogin?.isLogin) {
        // navigate("/subAdmin/dashboard");
        navigate("/subAdminLogin");
      }
      // else {
      // }
    } else if (location.pathname.includes("skyTrails/agent")) {
      navigate(location.pathname);
    } else if (location.pathname === "adminLogin") {
      if (reducerState?.adminAuth?.isLogin) {
        // console.log(reducerState?.adminAuth?.isLogin, "/admin/dashboard");
        navigate("/admin/dashboard");
      }
    } else if (location.pathname === "agentProfile/Login") {
      // if(reducerState?.adminAuth?.isLogin){
      // console.log(reducerState?.adminAuth?.isLogin,'/admin/dashboard')
      navigate("/agentProfile/Login");
      // }
    } else if (location.pathname === "relationshipManager/Login") {
      navigate("relationshipManager/Login");
    } else if (location.pathname === "relationShipManager/getAgentBookings") {
      navigate("relationShipManager/getAgentBookings");
    } else if (location.pathname === "relationShipManager/getAgentCancelReq") {
      navigate("relationShipManager/getAgentCancelReq");
    } else if (location.pathname === "relationShipManager/getAgentChangeReq") {
      navigate("relationShipManager/getAgentChangeReq");
    } else if (location.pathname === "forgetPassword") {
      navigate("forgetPassword");
    } else if (location.pathname === "RMforgetPassword") {
      navigate("RMforgetPassword");
    } else if (location.pathname === "SubAdminforgetPassword") {
      navigate("SubAdminforgetPassword");
    }
  }, []);

  useEffect(() => {
    dispatch(ipAction());
  }, []);

  useEffect(() => {
    const payload = {
      EndUserIp: reducerState?.ip?.ipData,
    };
    dispatch(tokenAction(payload));
  }, [reducerState?.ip?.ipData]);

  // console.log(reducerState?.ip,"reducerState")

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const payload = {
  //         EndUserIp: reducerState?.ip?.ipData,
  //       };
  //       await dispatch(tokenAction(payload)); // Dispatch the action to fetch data
  //     } catch (error) {
  //       console.error('Error fetching token:', error);
  //     }
  //   };

  //   if (reducerState && reducerState.ip && reducerState.ip.tokenData && Object.keys(reducerState.ip.tokenData).length === 0) {
  //     fetchData();
  //   }

  // }, [reducerState?.ip?.ipData, reducerState?.ip?.tokenData]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    // return
    <LoadingSpinner />;
  }

  // if (!windowWidth) {
  //   return (
  //     <>
  //       <Download />
  //     </>
  //   );
  // }

  return (
    <>
      {/* <div className="header_section" style={{ width: "100vw" }}>
        <Header />
       
      </div> */}

      {/* <Headers/> */}

      {location.pathname === "/Login" ||
      location.pathname === "/aboutus" ||
      location.pathname === "/contactus" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/termAndCondition" ||
      location.pathname === "/refundPolicy" ||
      location.pathname === "/Registration" ||
      location.pathname === "/addMarkup" ||
      location.pathname === "/addEvents" ||
      location.pathname === "/adminprofile" ||
      location.pathname === "/subAdmin/dashboard/userflightchange" ||
      location.pathname === "/subAdmin/dashboard/userhotelchange" ||
      location.pathname === "/subAdmin/dashboard/userbuschange" ||
      location.pathname === "/subAdmin/dashboard/Agenttable" ||
      location.pathname === "/subAdmin/dashboard/Usertable" ||
      location.pathname === "/subAdmin/dashboard/AgentrequestTable" ||
      location.pathname === "/admin/addCoupons" ||
      location.pathname === "admin/updateFeed" ||
      location.pathname === "/admin/createPackageCategory" ||
      location.pathname === "/adminlogin" ||
      location.pathname === "/admin/addnotification" ||
      location.pathname === "/admin/createQuiz" ||
      location.pathname==="/admin/createReview"||
      location.pathname === "/admin/createBlog" ||
      location.pathname === "/subAdmin/dashboard/Agentflightcancel" ||
      location.pathname === "/subAdmin/dashboard/Agenthotelcancel" ||
      location.pathname === "/subAdmin/dashboard/Agentbuscancel" ||
      location.pathname === "/subAdmin/dashboard/Userflightcancel" ||
      location.pathname === "/subAdmin/dashboard/Userbuscancel" ||
      location.pathname === "/subAdmin/dashboard/Userhotelcancel" ||
      location.pathname === "/subAdmin/dashboard/agentflightchange" ||
      location.pathname === "/subAdmin/dashboard/agenthotelchange" ||
      location.pathname === "/subAdmin/dashboard/agentbuschange" ||
      location.pathname === "/subAdmin/dashboard/visacategory" ||
      location.pathname === "/subAdmin/dashboard/visacountry" ||
      location.pathname === "/subAdmin/dashboard/visadocumenttype" ||
      location.pathname === "/subAdmin/dashboard/visadocumentcategory" ||
      location.pathname === "/subAdmin/dashboard/visarequiredocument" ||
      location.pathname === "/subAdmin/dashboard/AgentflightBooking" ||
      location.pathname === "/subAdmin/dashboard/AgenthotelBooking" ||
      location.pathname === "/subAdmin/dashboard/AgentbusBooking" ||
      location.pathname === "/subAdmin/dashboard/visacountryform" ||
      location.pathname === "/subAdmin/dashboard/visacountrysform" ||
      location.pathname === "/subAdmin/dashboard/visacategorysform" ||
      location.pathname === "/subAdmin/dashboard/visadocumentcategorysform" ||
      location.pathname === "/subAdmin/dashboard/requiredocuments" ||
      location.pathname === "/subAdmin/dashboard/userflightBooking" ||
      location.pathname === "/subAdmin/dashboard/userhotelBooking" ||
      location.pathname === "/subAdmin/dashboard/userbusBooking" ||
      location.pathname === "/subAdmin/dashboard/markupamount" ||
      location.pathname === "/subAdmin/dashboard/fixedDeparture" ||
      location.pathname === "/subAdmin/dashboard/addwebAdvertisements" ||
      location.pathname === "/subAdmin/dashboard/Subadmintable" ||
      location.pathname === "/subAdmin/dashboard/fixedDeparturecontrol" ||
      location.pathname === "/subAdmin/dashboard/advertisement" ||
      location.pathname === "/subAdmin/dashboard/webadvertisement" ||
      location.pathname === "/subAdmin/dashboard/getevent" ||
      location.pathname === "/subAdmin/dashboard/searchdata" ||
      location.pathname === "/subAdmin/dashboard/packageEnquary" ||
      location.pathname === "/subAdmin/dashboard/addsubadmins" ||
      location.pathname === "/subAdmin/dashboard/addagent" ||
      location.pathname === "/subAdmin/dashboard/addAdvertisements" ||
      location.pathname === "/subAdmin/dashboard/addcouponscode" ||
      location.pathname === "/subAdmin/dashboard/addnotification" ||
      location.pathname === "/subAdmin/dashboard/addEvents" ||
      location.pathname === "/subAdmin/dashboard/holidaypackage" ||
      location.pathname === "/subAdmin/dashboard/addmarkups" ||
      location.pathname ===
        "/hotels/hotelsearchGRM/guestDetails/review/ticket" ||
      location.pathname.includes("skyTrails/agent") ||
      location.pathname.includes("agentProfile/Login") ||
      location.pathname.includes("relationshipManager/Login") ||
      // /subAdmin/dashboard/addmarkups"
      isFlightEticketPage ||
      isBusEticketPage ||
      isHotelEticketPage ? null : (
        <>{reducerState?.logIn?.isLogin && <Headers />}</>
      )}
      {location.pathname === "/" ||
      location.pathname === "/aboutus" ||
      location.pathname === "/contactus" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/termAndCondition" ||
      location.pathname === "/subAdmin/dashboard/Usertable" ||
      location.pathname === "/subAdmin/dashboard/AgentrequestTable" ||
      location.pathname === "/refundPolicy" ||
      location.pathname === "/Login" ||
      location.pathname === "/subAdmin/dashboard/userflightchange" ||
      location.pathname === "/subAdmin/dashboard/userhotelchange" ||
      location.pathname === "/subAdmin/dashboard/userbuschange" ||
      location.pathname === "/Registration" ||
      location.pathname === "/addMarkup" ||
      location.pathname === "/addEvents" ||
      location.pathname === "/subAdmin/dashboard/holidaypackage" ||
      location.pathname === "/subAdmin/dashboard/visacountryform" ||
      location.pathname === "/subAdmin/dashboard/visacountrysform" ||
      location.pathname === "/subAdmin/dashboard/visacategorysform" ||
      location.pathname === "/subAdmin/dashboard/visadocumentcategorysform" ||
      location.pathname === "/subAdmin/dashboard/requiredocuments" ||
      location.pathname ===
        "/hotels/hotelsearchGRM/guestDetails/review/ticket" ||
      location.pathname === "/adminprofile" ||
      location.pathname === "/subAdmin/dashboard/addEvents" ||
      location.pathname === "/subAdmin/dashboard/Subadmintable" ||
      location.pathname === "/subAdmin/dashboard/visacategory" ||
      location.pathname === "/subAdmin/dashboard/visacountry" ||
      location.pathname === "/subAdmin/dashboard/visadocumenttype" ||
      location.pathname === "/subAdmin/dashboard/visadocumentcategory" ||
      location.pathname === "/subAdmin/dashboard/visarequiredocument" ||
      location.pathname === "/subAdmin/dashboard/addwebAdvertisements" ||
      location.pathname === "/subAdmin/dashboard/addcouponscode" ||
      location.pathname === "/admin/addCoupons" ||
      location.pathname === "/admin/addnotification" ||
      location.pathname === "/admin/updateFeed" ||
      location.pathname === "/subAdmin/dashboard/Agenttable" ||
      location.pathname === "/adminlogin" ||
      location.pathname === "/subAdmin/dashboard/Agentflightcancel" ||
      location.pathname === "/subAdmin/dashboard/Agenthotelcancel" ||
      location.pathname === "/subAdmin/dashboard/Agentbuscancel" ||
      location.pathname === "/subAdmin/dashboard/Userflightcancel" ||
      location.pathname === "/subAdmin/dashboard/Userhotelcancel" ||
      location.pathname === "/subAdmin/dashboard/Userbuscancel" ||
      location.pathname === "/subAdmin/dashboard/agentflightchange" ||
      location.pathname === "/subAdmin/dashboard/agenthotelchange" ||
      location.pathname === "/subAdmin/dashboard/agentbuschange" ||
      location.pathname === "/subAdmin/dashboard/AgentflightBooking" ||
      location.pathname === "/subAdmin/dashboard/AgenthotelBooking" ||
      location.pathname === "/subAdmin/dashboard/AgentbusBooking" ||
      location.pathname === "/subAdmin/dashboard/webadvertisement" ||
      location.pathname === "/subAdmin/dashboard/addnotification" ||
      location.pathname === "/subAdmin/dashboard/addmarkups" ||
      location.pathname === "/subAdmin/dashboard/userflightBooking" ||
      location.pathname === "/subAdmin/dashboard/userhotelBooking" ||
      location.pathname === "/subAdmin/dashboard/userbusBooking" ||
      location.pathname === "/subAdmin/dashboard/markupamount" ||
      location.pathname === "/subAdmin/dashboard/fixedDeparture" ||
      location.pathname === "/subAdmin/dashboard/fixedDeparturecontrol" ||
      location.pathname === "/subAdmin/dashboard/advertisement" ||
      location.pathname === "/subAdmin/dashboard/getevent" ||
      location.pathname === "/subAdmin/dashboard/searchdata" ||
      location.pathname === "/subAdmin/dashboard/packageEnquary" ||
      location.pathname === "/subAdmin/dashboard/addsubadmins" ||
      location.pathname === "/subAdmin/dashboard/addagent" ||
      location.pathname === "/subAdmin/dashboard/addAdvertisements" ||
      location.pathname.includes("skyTrails/agent") ||
      location.pathname.includes("agentProfile/Login") ||
      location.pathname.includes("relationshipManager/Login") ||
      isFlightEticketPage ||
      isBusEticketPage ||
      isHotelEticketPage ? null : (
        <>{reducerState?.logIn?.isLogin && <InnerNavbar />}</>
      )}

      {!isLoginRoute &&
        !isRegisterRoute &&
        !isDashboard &&
        !isLogin &&
        !isSubAdmindashboard &&
        !isSubAdminLogin && (
          <div className="mainBox ">
            {/* header of main dashboard */}

            {/* all routes of inner navbar */}
            <div className="componentsContainer">
              <Routes>
                <Route
                  element={<Active />}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                />
                <Route
                  path="/"
                  element={<MainBox />}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                />
                <Route
                  path="/Hotel"
                  element={<Hotel />}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                />
                <Route exact path="flightresult" element={<Flightresult />} />

                <Route
                  exact
                  path="FlightresultReturn"
                  // element={<FlightresultReturn />}
                  element={<FlightResResult />}
                />
                <Route
                  exact
                  path="FlightResultInternational"
                  element={<FlightReturnInternational />}
                />
                <Route
                  exact
                  path="/hotel/hotelsearch"
                  element={<HotelSearch />}
                />
                {/* grm */}

                <Route
                  path="/Hotels"
                  element={<Hotels />}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                />
                <Route
                  exact
                  path="/hotels/hotelsearchs"
                  element={<HotelSearchs />}
                />

                <Route
                  exact
                  path="/hotels/hotelsearchs/HotelBooknowTbo"
                  element={<HotelBooknowTbo />}
                />
                <Route
                  exact
                  path="/hotels/hotelsearchs/HotelBooknowgrm"
                  element={<HotelBooknowGrm />}
                />

                <Route
                  exact
                  path="/hotels/hotelsearchs/HotelBooknowTbo/ReviewbookingTbo"
                  element={<ReviewbookingTbo />}
                />
                 {/* /GuestdetailTbo */}<Route
                  exact
                  path="/GuestdetailTbo"
                  element={<GuestdetailTbo />}
                />



                <Route
                  exact
                  path="/hotels/hotelsearchs/guestDetails"
                  element={<ReviewbookingGrn />}
                />

                <Route
                  exact
                  path="/GuestdetailGrm"
                  element={<GuestdetailGrm />}
                />

                <Route
                  exact
                  path="/hotels/hotelsearchGRM/guestDetails/review/ticket"
                  element={<HotelTicketDB />}
                />

                {/* grm */}
                <Route
                  exact
                  path="/Flightresult/booknow"
                  element={<Booknow />}
                />
                <Route exact path="/onbording" element={<Onbording />} />
                <Route path="/flights/*" element={<Flight />}>
                  <Route exact path="oneway" element={<OneWay />} />
                  <Route exact path="offShare" element={<OffShare />} />
                  <Route exact path="multiStop" element={<MultiStop />} />
                  <Route exact path="calenderfare" element={<Calander />} />
                  <Route exact path="return" element={<Return />} />
                </Route>

                {/* <Route path="/" element={<Banner />} /> */}

                {/* <Route path="/" element={<Slider />} /> */}

                <Route
                  exact
                  path="/hotel/hotelsearch/HotelBooknow"
                  element={<HotelBooknow />}
                />
                <Route exact path="/Guestdetail" element={<Guestdetail />} />
                <Route
                  exact
                  path="/hotel/hotelsearch/HotelBooknow/Reviewbooking"
                  element={<Reviewbooking />}
                />

                {/* Reviewbookinggrn */}
                <Route
                  exact
                  path="/passengerdetail"
                  element={<Passengerdetail />}
                />
                <Route
                  exact
                  path="/Passengerdetailamd"
                  element={<Passengerdetailamd />}
                />
                <Route
                  exact
                  path="/FlightresultReturn/Passengerdetail"
                  element={<ReturnPassenger />}
                />
                <Route
                  exact
                  path="/FlightResultInternational/FlightresultReturn/PassengerdetailINC"
                  element={<ReturnPassengerINC />}
                />
                <Route
                  exact
                  path="/Flightresult/passengerdetail/flightreviewbooking"
                  element={<FlightReviewbooking />}
                />
                <Route
                  exact
                  path="/Flightresult/passengerdetail/flightreviewbookingamd"
                  element={<FlightReviewbookingamd />}
                />

                <Route
                  exact
                  path="/bookedTicketSucess"
                  element={<Flightbookingconfirmationamd />}
                />

                <Route
                  exact
                  path="/Flightresult/passengerdetail/flightReturnreviewbooking"
                  element={<FlightReturnReviewbooking />}
                />
                <Route
                  exact
                  path="/Flightresult/passengerdetail/flightReturnreviewbookingINC"
                  element={<FlightReturnReviewbookingINC />}
                />
                <Route
                  exact
                  path="/Flightbookingconfirmation"
                  element={<Flightbookingconfirmation />}
                />
                <Route
                  exact
                  path="/Flightreturnbookingconfirmation"
                  element={<FlightReturnBookingConfirmation />}
                />

                <Route
                  exact
                  path="/holidaypackage"
                  element={<HolidayPackage />}
                />
                <Route
                  exact
                  path="/holidaypackage/HolidaypackageResult"
                  element={<HolidayPackageResult />}
                />
                <Route
                  exact
                  path="/holidaypackage/HolidaypackageResult/HolidayPackage"
                  element={<HolidayPackage />}
                />
                <Route
                  exact
                  path="/holidaypackage/Holidaybooknow"
                  element={<Holidaybooknow />}
                />

                <Route
                  exact
                  path="/HolidayGuestDetail"
                  element={<HolidayGuestDetail />}
                />
                <Route
                  exact
                  path="/Holidayreviewbooking"
                  element={<Holidayreviewbooking />}
                />
                <Route
                  exact
                  path="/Reviewbooling"
                  element={<HotelbookingConfirmation />}
                />
                <Route
                  exact
                  path="/HolidayconfirmationDetail"
                  element={<HolidayconfirmationDetail />}
                />
                <Route exact path="/Bus" element={<Bus />} />
                <Route
                  exact
                  path="/assistance&inssurance"
                  element={<Assistanceinssurance />}
                />
                <Route exact path="/sightseeing" element={<Sightseeing />} />
                <Route exact path="/BusResult" element={<BusResult />} />
                <Route
                  exact
                  path="/BusPassengerDetail"
                  element={<BusPassengerDetail />}
                />
                <Route
                  exact
                  path="/BusReviewBooking"
                  element={<BusReviewBooking />}
                />
                <Route
                  exact
                  path="/Busbookingconfirmation"
                  element={<Busbookingconfirmation />}
                />
                <Route
                  exact
                  path="/SightseeingResult"
                  element={<SightseeingResult />}
                />
                <Route
                  exact
                  path="/SightseeingGuestDetail"
                  element={<SightseeingGuestDetail />}
                />
                <Route
                  exact
                  path="/SightseeingReviewBooking"
                  element={<SightseeingReviewBooking />}
                />
                <Route
                  exact
                  path="/SightseeingBookingConfirmation"
                  element={<SightseeingBookingConfirmation />}
                />
                <Route exact path="Transfer" element={<Transfer />} />
                <Route
                  exact
                  path="TransferResult"
                  element={<TransferResult />}
                />
                <Route
                  exact
                  path="TansferGuestDetail"
                  element={<TansferGuestDetail />}
                />
                <Route
                  exact
                  path="TransferReviewBooking"
                  element={<TransferReviewBooking />}
                />
                <Route
                  exact
                  path="TransferConfirmation"
                  element={<TransferConfirmation />}
                />
                <Route exact path="/Forex" element={<Forex />} />
                <Route
                  exact
                  path="/InsuranceSearchCriteria"
                  element={<InsuranceSearchCriteria />}
                />
                <Route
                  exact
                  path="/InsuranceResult"
                  element={<InsuranceResult />}
                />
                <Route
                  exact
                  path="/InsuranceGuestDetails"
                  element={<InsuranceGuestDetails />}
                />
                <Route
                  exact
                  path="/InsuranceReviewBooking"
                  element={<InsuranceReviewBooking />}
                />
                <Route
                  exact
                  path="/InsuranceBookingConfirmation"
                  element={<InsuranceBookingConfirmation />}
                />
                <Route
                  path="/skyTrails/agent/:first_name"
                  element={<Packages />}
                />
                <Route exact path="/admin" element={<Admin />} />
                <Route
                  exact
                  path="/addSubAdmin"
                  element={<CreateSubAdminPage />}
                />
                <Route exact path="/addAgent" element={<CreateAgentPage />} />
                <Route
                  exact
                  path="/addAdvertisement"
                  element={<CreateAdvertisementForm />}
                />
                <Route
                  exact
                  path="/addWebAdvertisement"
                  element={<CreateWebAdvertisementForm />}
                />
                <Route exact path="/addMarkup" element={<CreateMarkupForm />} />
                {/* <Route exact path="/adminprofile" element={<AdminProfile />} /> */}
                {/* location.pathname === "/adminprofile" || */}
                <Route exact path="/addEvents" element={<CreateEventForm />} />
                <Route
                  exact
                  path="/admin/addCoupons"
                  element={<CreateCouponForm />}
                />
                <Route
                  exact
                  path="/admin/createQuiz"
                  element={<CreateQuiz />}
                />
                <Route
                  exact
                  path="/admin/CreateReview"
                  element={<CreateReview />}
                />
                <Route
                  exact
                  path="/admin/createBlog"
                  element={<CreateBlog />}
                />
                <Route
                  exact
                  path="/admin/addnotification"
                  element={<AddNotification />}
                />
                <Route
                  exact
                  path="/admin/updateFeed"
                  element={<UpdateFeed />}
                />
                <Route exact path="/admin/addReward" element={<AddReward />} />
                <Route
                  exact
                  path="/admin/addPackagebanner"
                  element={<PackageBanner />}
                />
                <Route
                  exact
                  path="/admin/addPopulardestination"
                  element={<Popular />}
                />

                {/* <Route
                  exact
                  path="/admin/carrerPage"
                  element={<Carrerform />}
                /> */}

                <Route
                  exact
                  path="/admin/createPackageCategory"
                  element={<Pakcat />}
                />
                <Route
                  exact
                  path="/AdminUserForm"
                  element={<AdminUserForm />}
                />
                <Route
                  exact
                  path="/Administration"
                  element={<Administration />}
                />
                <Route exact path="/accounts" element={<Account />} />
                <Route
                  exact
                  path="/AccountDetails"
                  element={<AccountDetails />}
                />
                <Route exact path="/reports" element={<Reports />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/gst" element={<GSTform />} />
                <Route exact path="/visa" element={<Visaform />} />
                <Route
                  exact
                  path="/CreateHolidayPackage"
                  element={<CreateHolidayPackage />}
                ></Route>
                <Route
                  exact
                  path="/CreateHolidayPackagenew"
                  element={<CreateHolidayPackageNew />}
                ></Route>
                <Route
                  exact
                  path="/AddItenary"
                  element={<AddItenary />}
                ></Route>
                <Route
                  exact
                  path="/AddItenaryImage"
                  element={<AddItenaryImage/>}
                ></Route>
                <Route
                  exact
                  path="/AddImages"
                  element={<HolidayAddImages />}
                ></Route>
                <Route
                  exact
                  path="/PackagesList"
                  element={<PackagesList />}
                ></Route>



                <Route
                  exact
                  path="admin/dashboard/EditHolidayPackage"
                  element={<EditHolidayPackage />}
                ></Route>
                <Route exact path="/Queue" element={<Queue />}></Route>
                <Route exact path="/controls" element={<Controls />}></Route>

                <Route
                  exact
                  path="/holidayPackages"
                  element={<HolidayPackages />}
                ></Route>
                <Route
                  exact
                  path="/FlightConfirmBooking/:id"
                  element={<FlightOpen />}
                />
                <Route
                  exact
                  path="/FlightEticket/:id"
                  element={<FlightOneTicket />}
                />
                <Route
                  exact
                  path="/BusEticket/:id"
                  element={<BusOneTicket />}
                />
                <Route
                  exact
                  path="/HotelEticket/:id"
                  element={<HotelOneTicket />}
                />

                <Route path="/aboutus" element={<AboutUs />}></Route>
                <Route path="/contactus" element={<ContactUs />}></Route>
                <Route
                  path="/privacypolicy"
                  element={<PrivacyPolicy />}
                ></Route>
                <Route
                  path="/termAndCondition"
                  element={<TermandCondition />}
                ></Route>
                <Route path="/refundPolicy" element={<RefundPolicy />}></Route>
              </Routes>
            </div>

            {/* main page footer */}

            {/* {!isLoginRoute && <Footer />} */}
          </div>
        )}
      {/* <GotoTopBtn /> */}
      <div>
        <Routes>
          <Route path="login" element={<Loginnew />} />
          <Route path="forgetPassword" element={<Forget />} />
          <Route
            path="subAdminforgetPassword"
            element={<SubadminForgetPassword />}
          />
          <Route path="RMforgetPassword" element={<RMforgotpassword />} />

          <Route path="registration" element={<Registration />} />
          <Route
            exact
            path="/admin/dashboard/*"
            element={<Dashboard />}
          ></Route>
          <Route
            exact
            path="/agentProfile/dashboard/*"
            element={<AgentProfileDashbord />}
          ></Route>
          <Route exact path="/adminLogin" element={<AdminLogin />}></Route>
          <Route
            exact
            path="/agentProfile/Login"
            element={<AgentProfileLogin />}
          ></Route>
          <Route
            exact
            path="/relationshipManager/Login"
            element={<RegionLogin />}
          ></Route>
          <Route
            exact
            path="relationshipManager/dashboard"
            element={<RegionDashboard />}
          ></Route>
          <Route
            exact
            path="relationShipManager/getAgentBookings"
            element={<RegionBookings />}
          ></Route>
          <Route
            exact
            path="relationShipManager/getAgentCancelReq"
            element={<RegionCancelReq />}
          ></Route>
          <Route
            exact
            path="relationShipManager/getAgentChangeReq"
            element={<RegionChangeReq />}
          ></Route>
          <Route
            exact
            path="/subAdmin/dashboard/*"
            element={<SubAdminDashboard />}
          >
            {" "}
          </Route>
          {isSubAdminLogin && (
            <Route
              exact
              path="/subAdminLogin"
              element={<SubAdminLoginPage />}
            ></Route>
          )}
          {/* {isAddMarkup && (
            <Route
              exact
              path="/addMarkup"
              element={<CreateMarkupForm />}></Route>
          )} */}
        </Routes>
      </div>

      {/* main page footer */}
      {/* {!isLoginRoute && reducerState?.adminAuth?.adminData?.data ? (
        <FooterAdmin />
      ) : ( */}
      {/* <Footer /> */}
      {/* )} */}
    </>
  );
};

export default MainPage;
