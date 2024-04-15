import { combineReducers } from "redux";
import { logInReducer } from "./Auth/logIn/logInReducer";
import { signUpReducer } from "./Auth/SignUp/signUpReducer";
import { ipReducer } from "./IP/ipReducer";
import { oneWayReducer } from "./FlightSearch/OneWay/oneWayReducer";
import { returnReducer } from "./FlightSearch/Return/returnReducer";
import { oneWayEMTReducer } from "./FlightSearch/OneWayEMT/oneWayEMTReducer";
import storage from "redux-persist/lib/storage/session";
import { LOGOUT_REQUEST } from "./Auth/logIn/actionType";
import { flightFareReducer } from "./FlightFareQuoteRule/flightFareReducer";
import { flightBookReducer } from "./FlightBook/flightBookReducer";
import { UserTableDataReducer } from "./Auth/UserData/userDataReducer";
import { AdminAuthReducer } from "./Auth/AdminAuth/AdminAuthReducer";
import { vendorReducer } from "./Auth/VendorAmount/vendorReducer";
import { createPackageReducer } from "./CreatePackage/createPackageReducer";
import { passengersReducer } from "./Passengers/passengerReducer";
import { ActiveStatusReducer } from "./Auth/activeStatus/activeStatusReducer";
import { MarkUpReducer } from "./Auth/markUp/markUpReducer";
import { ADMIN_SIGN_OUT_REQUEST } from "./Auth/AdminSignOut/actionType";
import { searchPackageReducer } from "./SearchPackage/searchPackageReducer";
import { searchOnePackageReducer } from "./OnePackageSearchResult/searchOnePackageReducer";
import { hotelReducer } from "./Hotel/hotelReducer";
import { hotelReducerGRN } from "./HotelGrn/hotelReducer";
import { createForexReducer } from "./CreateForxWithMe/createForexReducer";
import { createForex4CustomerReducer } from "./CreateForexWithCustomer/createForexReducer";
import { forexDataReducer } from "./Auth/forexData/forexDataReducer";
import { forexData4CustomerReducer } from "./Auth/ForexData4Customer/forexDataReducer";
import { busSearchReducer } from "./busSearch/busSearchReducer";
import { visaRequestReducer } from "./visaRequest/visaRequestReducer";
import { visaDataReducer } from "./getVisa/visaDataReducer";
import { packageBookingReducer } from "./HolidayBookingRequest/bookingHolidayReducer";
import { updatePackageReducer } from "./Auth/updatePackage/packageUpdateReducer";
import { getPackageBookingReducer } from "./getHolidayBooking/packageBookingReducer";
import formReducer from "./HolidayPackageTravellerDetails/HolidayPackageTravellerDetailsReducer";
import { UserDataReducer } from "./Auth/UserDataById/userDataReducer";
import { subadminReducer } from "./SubAdminLogin/subadminReducer";
import { adminReducer } from "./AdminLogin/adminReducer";
import { agentProfileReducer } from "./AgentProfiltLogin/agentProfileReducer";
const appReducer = combineReducers({
  logIn: logInReducer,
  signUp: signUpReducer,
  ip: ipReducer,
  passengers: passengersReducer,
  oneWay: oneWayReducer,
  return:returnReducer,
  oneWayEMT: oneWayEMTReducer,
  flightFare: flightFareReducer,
  flightBook: flightBookReducer,
  userTableData: UserTableDataReducer,
  adminAuth: AdminAuthReducer,
  activeStatus: ActiveStatusReducer,
  addMarkUp: MarkUpReducer,
  vendorAmount: vendorReducer,
  createPackage: createPackageReducer,
  packageBookingRequest: packageBookingReducer,
  searchResult: searchPackageReducer,
  searchOneResult: searchOnePackageReducer,
  hotelSearchResult: hotelReducer,
  hotelSearchResultGRN: hotelReducerGRN,
  updatePackage: updatePackageReducer,
  packageBook: getPackageBookingReducer,
  createForex: createForexReducer,
  createForex4Customer: createForex4CustomerReducer,
  getForex: forexDataReducer,
  visaRequest: visaRequestReducer,
  getForex4Customer: forexData4CustomerReducer,
  getBusResult: busSearchReducer,
  getVisaData: visaDataReducer,
  form: formReducer,
  userData:UserDataReducer,
  subadminLogin:subadminReducer,
  adminLogin:adminReducer,
  agentProfileReducer:agentProfileReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_REQUEST || action.type == ADMIN_SIGN_OUT_REQUEST) {
    storage.removeItem("persist:root");
    sessionStorage.clear();
    localStorage.clear();
    return appReducer(undefined, action);
  } else if (action.type === "CLEAR_HOTEL_REDUCER") {
    return {
      ...state,
      hotelSearchResult: hotelReducer(undefined, action),
    };
  } else if (action.type === "CLEAR_ONEWAY_REDUCER") {
    return {
      ...state,
      oneWay: oneWayReducer(undefined, action),
    };
  }else if(action.type === "CLEAR_RETURN_REDUCER"){
    return {
      ...state,
      return:returnReducer(undefined, action)

    };
  } else if (action.type === "CLEAR_ONEWAY_EMT_REDUCER") {
    return {
      ...state,
      oneWayEMT: oneWayEMTReducer(undefined, action),
    };
    } else if (action.type === "CLEAR_PASSENGERS_REDUCER") {
      return {
        ...state,
        passengers: passengersReducer(undefined, action),
      };
  } else if (action.type === "CLEAR_BUS_SEARCH_REDUCER") {
    return {
      ...state,
      getBusResult: busSearchReducer(undefined, action),
    };
  } else if (action.type === "CLEAR_HOLIDAY_REDUCER") {
    return {
      ...state,
      searchResult: searchPackageReducer(undefined, action),
    };
  }else if(action.type === "CLEAR_USER_DATA_REDUCER"){
    return {
      ...state,
      search:UserDataReducer(undefined, action)
    }
  }
  return appReducer(state, action);
};
export default rootReducer;
