import React, { useEffect } from "react";
import { InnerBarLogo } from "../data";
import { Link } from "react-router-dom";
import color from "../color/color";
import { useDispatch, useSelector } from "react-redux";
import "./maixBox.css";
import { motion } from "framer-motion";
import { ClearAllActionReturn } from "../Redux/FlightFareQuoteRule/actionFlightQuote";
import { flightReducerClear } from "../Redux/FlightBook/actionFlightBook";
import { clearOneWayReducer } from "../Redux/FlightSearch/OneWay/oneWay";
import { clearPassengersReducer } from "../Redux/Passengers/passenger";
import { clearHotelReducer } from "../Redux/Hotel/hotel";
function MainBoxNew() {
  const reducerState = useSelector((state) => state);
console.log(reducerState,"reducerState");
  const dispatch = useDispatch();
  function AllFlightCLEAR_Function() {
    dispatch(ClearAllActionReturn());

    dispatch(flightReducerClear());

    dispatch(clearOneWayReducer());
    dispatch(clearHotelReducer())
    // await dispatch(clearOneWayEMTReducer())
    dispatch(clearPassengersReducer());
    sessionStorage.removeItem("infants");
    sessionStorage.removeItem("ResultIndex");
    sessionStorage.removeItem("childs");
    sessionStorage.removeItem("adults");
    sessionStorage.removeItem("flightDetailsONGo");
    sessionStorage.removeItem("flightDetailsIncome");
  }
  useEffect(() => {
    AllFlightCLEAR_Function();
  }, []);
  return (
    <>
      <div className="mainbox-container">
        <div className="content-icon">
          <div className="icon-content">
            <Link to="/flights" style={{ textDecoration: "none" }}>
              <div className="icon-content-img-content">
                <div className="icon-content-img-content-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="81"
                    height="80"
                    viewBox="0 0 81 80"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_5_3977)">
                      <path
                        d="M26.9838 17.4075C29.2471 17.4288 31.0992 15.6113 31.1206 13.348C31.1419 11.0846 29.3244 9.23252 27.061 9.21118C24.7977 9.18984 22.9456 11.0073 22.9243 13.2707C22.9029 15.534 24.7204 17.3861 26.9838 17.4075Z"
                        fill="url(#paint0_linear_5_3977)"
                      />
                      <path
                        d="M26.9897 16.7295C28.8787 16.7473 30.4246 15.2303 30.4424 13.3413C30.4602 11.4523 28.9432 9.90646 27.0542 9.88865C25.1652 9.87084 23.6194 11.3878 23.6015 13.2768C23.5837 15.1659 25.1007 16.7117 26.9897 16.7295Z"
                        fill="url(#paint1_linear_5_3977)"
                      />
                      <path
                        d="M30.9307 12.0494C30.7305 12.633 30.3952 13.1803 29.925 13.642C28.3094 15.2274 25.7147 15.2029 24.1293 13.5873C23.6676 13.1168 23.343 12.5634 23.1538 11.9761C22.6665 13.3969 22.9812 15.0342 24.1049 16.1793C25.6903 17.7949 28.285 17.8193 29.9006 16.2339C31.0457 15.1102 31.3912 13.4795 30.9307 12.0494Z"
                        fill="url(#paint2_linear_5_3977)"
                      />
                      <path
                        d="M26.9838 17.4075C29.2471 17.4288 31.0992 15.6113 31.1206 13.348C31.1419 11.0846 29.3244 9.23252 27.061 9.21118C24.7977 9.18984 22.9456 11.0073 22.9243 13.2707C22.9029 15.534 24.7204 17.3861 26.9838 17.4075Z"
                        fill="url(#paint3_linear_5_3977)"
                      />
                      <path
                        d="M38.933 17.4262C37.3175 19.0116 34.7227 18.9871 33.1373 17.3716C31.5519 15.756 31.5764 13.1613 33.192 11.5759C34.8076 9.99045 37.4023 10.0149 38.9877 11.6305C40.5728 13.2461 40.5483 15.8411 38.933 17.4262Z"
                        fill="url(#paint4_linear_5_3977)"
                      />
                      <path
                        d="M36.0278 17.9211C37.9168 17.9389 39.4626 16.422 39.4804 14.5329C39.4983 12.6439 37.9813 11.0981 36.0923 11.0803C34.2032 11.0624 32.6574 12.5794 32.6396 14.4684C32.6218 16.3575 34.1388 17.9033 36.0278 17.9211Z"
                        fill="url(#paint5_linear_5_3977)"
                      />
                      <path
                        d="M39.9581 13.2408C39.7579 13.8243 39.4226 14.3716 38.9524 14.8333C37.3368 16.4187 34.7421 16.3942 33.1567 14.7787C32.695 14.3082 32.3703 13.7547 32.1812 13.1674C31.6938 14.5883 32.0085 16.2255 33.1322 17.3706C34.7176 18.9862 37.3124 19.0106 38.9279 17.4252C40.073 16.3013 40.4185 14.6705 39.9581 13.2408Z"
                        fill="url(#paint6_linear_5_3977)"
                      />
                      <path
                        d="M38.933 17.4262C37.3175 19.0116 34.7227 18.9871 33.1373 17.3716C31.5519 15.756 31.5764 13.1613 33.192 11.5759C34.8076 9.99045 37.4023 10.0149 38.9877 11.6305C40.5728 13.2461 40.5483 15.8411 38.933 17.4262Z"
                        fill="url(#paint7_linear_5_3977)"
                      />
                      <path
                        d="M66.5668 57.7427C68.8301 57.764 70.6822 55.9465 70.7036 53.6831C70.7249 51.4198 68.9074 49.5677 66.644 49.5463C64.3807 49.525 62.5286 51.3425 62.5073 53.6059C62.4859 55.8692 64.3034 57.7213 66.5668 57.7427Z"
                        fill="url(#paint8_linear_5_3977)"
                      />
                      <path
                        d="M66.5717 57.0646C68.4608 57.0824 70.0066 55.5655 70.0244 53.6765C70.0422 51.7874 68.5253 50.2416 66.6362 50.2238C64.7472 50.206 63.2014 51.7229 63.1836 53.612C63.1658 55.501 64.6827 57.0468 66.5717 57.0646Z"
                        fill="url(#paint9_linear_5_3977)"
                      />
                      <path
                        d="M67.9381 49.7679C67.3509 49.9571 66.7974 50.282 66.3269 50.7434C64.7113 52.3288 64.6868 54.9236 66.2723 56.5391C66.734 57.0096 67.2812 57.3446 67.8648 57.5448C66.435 58.0053 64.804 57.6598 63.6803 56.5147C62.0949 54.8991 62.1194 52.3044 63.735 50.719C64.88 49.5953 66.517 49.2809 67.9381 49.7679Z"
                        fill="url(#paint10_linear_5_3977)"
                      />
                      <path
                        d="M66.5668 57.7427C68.8301 57.764 70.6822 55.9465 70.7036 53.6831C70.7249 51.4198 68.9074 49.5677 66.644 49.5463C64.3807 49.525 62.5286 51.3425 62.5073 53.6059C62.4859 55.8692 64.3034 57.7213 66.5668 57.7427Z"
                        fill="url(#paint11_linear_5_3977)"
                      />
                      <path
                        d="M62.7096 41.6619C61.094 43.2473 61.0695 45.842 62.6549 47.4576C64.2403 49.0732 66.835 49.0976 68.4506 47.5122C70.0662 45.9268 70.0907 43.3321 68.5053 41.7165C66.9199 40.1009 64.3251 40.0765 62.7096 41.6619Z"
                        fill="url(#paint12_linear_5_3977)"
                      />
                      <path
                        d="M65.5551 48.0072C67.4442 48.025 68.99 46.5081 69.0078 44.619C69.0256 42.73 67.5087 41.1842 65.6196 41.1664C63.7306 41.1486 62.1848 42.6655 62.167 44.5545C62.1492 46.4436 63.6661 47.9894 65.5551 48.0072Z"
                        fill="url(#paint13_linear_5_3977)"
                      />
                      <path
                        d="M66.9127 40.7104C66.3255 40.8996 65.772 41.2245 65.3015 41.6859C63.6859 43.2713 63.6615 45.866 65.2469 47.4816C65.7086 47.9521 66.2558 48.2871 66.8394 48.4873C65.4097 48.9478 63.7786 48.6023 62.6549 47.4572C61.0695 45.8416 61.094 43.2469 62.7096 41.6615C63.8546 40.5378 65.4916 40.2234 66.9127 40.7104Z"
                        fill="url(#paint14_linear_5_3977)"
                      />
                      <path
                        d="M62.7096 41.6619C61.094 43.2473 61.0695 45.842 62.6549 47.4576C64.2403 49.0732 66.835 49.0976 68.4506 47.5122C70.0662 45.9268 70.0907 43.3321 68.5053 41.7165C66.9199 40.1009 64.3251 40.0765 62.7096 41.6619Z"
                        fill="url(#paint15_linear_5_3977)"
                      />
                      <path
                        d="M1.43125 60.1825L10.1614 65.9086L19.0272 57.2084L5.56332 55.2518C5.1945 55.1983 4.76636 55.362 4.44131 55.6809L1.55068 58.5176C0.992656 59.0652 0.935962 59.8575 1.43125 60.1825Z"
                        fill="url(#paint16_linear_5_3977)"
                      />
                      <path
                        d="M2.41474 57.6687L1.55019 58.5171C0.992159 59.0647 0.935184 59.8573 1.43075 60.1823L10.1609 65.9084L17.0006 59.1964L3.53675 57.2396C3.16793 57.186 2.73978 57.35 2.41474 57.6687Z"
                        fill="url(#paint17_linear_5_3977)"
                      />
                      <path
                        d="M19.2618 78.3444L13.7014 69.5079L22.5672 60.8077L24.2696 74.3061C24.3162 74.6758 24.1444 75.1011 23.8197 75.4198L20.9291 78.2564C20.3707 78.804 19.5775 78.8458 19.2618 78.3444Z"
                        fill="url(#paint18_linear_5_3977)"
                      />
                      <path
                        d="M21.7901 77.4075L20.9255 78.2559C20.3675 78.8035 19.574 78.8455 19.2583 78.3439L13.6978 69.5074L20.5376 62.7954L22.24 76.2937C22.2868 76.6635 22.1148 77.0888 21.7901 77.4075Z"
                        fill="url(#paint19_linear_5_3977)"
                      />
                      <path
                        d="M10.6977 20.7065L38.5341 33.0157L55.3378 16.5259L19.4896 11.7647C18.6358 11.6512 17.6511 12.033 16.9027 12.7676L10.7089 18.8458C10.0554 19.4868 10.0497 20.4197 10.6977 20.7065Z"
                        fill="url(#paint20_linear_5_3977)"
                      />
                      <path
                        d="M12.911 16.6851L10.7092 18.8458C10.0555 19.4873 10.0498 20.4203 10.6981 20.7067L38.5345 33.0159L51.3461 20.4436L15.4979 15.6825C14.6441 15.5687 13.6597 15.9505 12.911 16.6851Z"
                        fill="url(#paint21_linear_5_3977)"
                      />
                      <path
                        d="M28.8784 17.4596L15.4979 15.6824C14.6441 15.5689 13.6597 15.9507 12.911 16.6853L10.7092 18.846C10.0555 19.4875 10.0498 20.4205 10.6981 20.7069L20.9498 25.2401L28.8784 17.4596Z"
                        fill="url(#paint22_linear_5_3977)"
                      />
                      <path
                        d="M10.6989 20.7063L38.5354 33.0155L44.3138 27.345L13.4303 16.1762L10.7104 18.8453C10.0566 19.4866 10.0509 20.4196 10.6989 20.7063Z"
                        fill="url(#paint23_linear_5_3977)"
                      />
                      <path
                        d="M58.8984 69.8262L47.1165 41.7627L63.9202 25.2728L68.0046 61.2044C68.102 62.0602 67.7017 63.0376 66.9531 63.772L60.7595 69.8499C60.1058 70.4914 59.1729 70.4796 58.8984 69.8262Z"
                        fill="url(#paint24_linear_5_3977)"
                      />
                      <path
                        d="M62.9593 67.6897L60.7575 69.8504C60.1037 70.4919 59.1708 70.48 58.8966 69.8264L47.1147 41.7629L59.9263 29.1906L64.0108 65.1222C64.1081 65.978 63.7079 66.9551 62.9593 67.6897Z"
                        fill="url(#paint25_linear_5_3977)"
                      />
                      <path
                        d="M62.5 51.7107L64.0247 65.1223C64.122 65.9781 63.7218 66.9552 62.9732 67.6898L60.7714 69.8505C60.1176 70.492 59.1847 70.4801 58.9106 69.8265L54.5715 59.4912L62.5 51.7107Z"
                        fill="url(#paint26_linear_5_3977)"
                      />
                      <path
                        d="M58.9008 69.8266L47.1189 41.763L52.8973 36.0925L63.4816 67.1814L60.7616 69.8505C60.1082 70.4918 59.1752 70.4799 58.9008 69.8266Z"
                        fill="url(#paint27_linear_5_3977)"
                      />
                      <path
                        d="M58.9377 34.9392C39.2293 54.2794 11.2027 75.7993 7.51327 72.0397C3.82384 68.28 25.8684 40.6644 45.5767 21.3239C65.2851 1.98369 75.1943 -1.75761 78.8838 2.00205C82.5735 5.762 78.6463 15.5989 58.9377 34.9392Z"
                        fill="url(#paint28_linear_5_3977)"
                      />
                      <path
                        d="M57.5046 34.3547C38.7584 52.7507 12.4019 73.5269 9.26448 70.3294C6.12705 67.132 27.3965 41.1722 46.1423 22.7762C64.8885 4.38024 74.0124 0.514719 77.1498 3.71187C80.2875 6.9093 76.2504 15.9587 57.5046 34.3547Z"
                        fill="url(#paint29_linear_5_3977)"
                      />
                      <path
                        d="M58.9395 34.9387C78.6478 15.5982 82.5753 5.76157 78.8858 2.00191L7.51506 72.0395C11.2048 75.7992 39.2311 54.2792 58.9395 34.9387Z"
                        fill="url(#paint30_linear_5_3977)"
                      />
                      <path
                        d="M62.1925 9.08724C60.9868 10.1172 59.7214 11.2264 58.3941 12.4185C58.0547 12.7234 58.0807 13.2018 58.4442 13.2709C60.6916 13.6976 62.7147 14.7029 64.3012 16.3196C65.8877 17.9363 66.8547 19.9783 67.239 22.2331C67.3012 22.5977 67.7789 22.6328 68.0902 22.2992C69.3071 20.9946 70.44 19.7503 71.4925 18.5643C72.2088 17.757 72.5238 16.7359 72.3021 15.9072C71.8175 14.0967 70.9248 12.4587 69.6055 11.1143C68.286 9.76965 66.6651 8.84628 64.8644 8.32783C64.04 8.09032 63.0132 8.38603 62.1925 9.08724Z"
                        fill="url(#paint31_linear_5_3977)"
                      />
                      <path
                        d="M71.4968 18.564C70.5719 19.6094 69.5826 20.6986 68.5289 21.8346C68.3856 21.989 68.2423 22.1434 68.0962 22.3006C67.7844 22.6342 67.3063 22.5991 67.243 22.2341C66.861 19.9777 65.8929 17.9354 64.3061 16.3184C64.2124 16.223 64.1187 16.1303 64.0222 16.0432C62.8947 14.9784 61.567 14.2038 60.1087 13.7061C61.4354 12.5199 62.6947 11.4137 63.8975 10.3876C64.7191 9.68614 65.7454 9.38987 66.5692 9.62848C67.5483 9.91028 68.4735 10.3112 69.3279 10.8365C69.4244 10.9265 69.5181 11.0191 69.6118 11.1146C70.9314 12.4593 71.8226 14.0975 72.3062 15.9071C72.5292 16.7353 72.2137 17.7558 71.4968 18.564Z"
                        fill="url(#paint32_linear_5_3977)"
                      />
                      <path
                        d="M67.2408 22.2325C67.303 22.5972 67.7807 22.6323 68.092 22.2987C69.3089 20.9941 70.4418 19.7498 71.4943 18.5638C72.2106 17.7564 72.5256 16.7353 72.3039 15.9067C71.8193 14.0962 70.9266 12.4582 69.6073 11.1138L64.303 16.3191C65.8895 17.9358 66.8565 19.9777 67.2408 22.2325Z"
                        fill="url(#paint33_linear_5_3977)"
                      />
                      <path
                        d="M14.1377 66.1291L13.5556 65.5359C13.0688 65.0398 13.2463 64.0967 13.9415 63.4861L24.1766 54.4961C24.6262 54.1012 25.2178 54.0437 25.5326 54.3648C25.8475 54.6857 25.7791 55.2761 25.3755 55.7181L16.1941 65.7819C15.5708 66.4652 14.6245 66.6251 14.1377 66.1291Z"
                        fill="url(#paint34_linear_5_3977)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_5_3977"
                        x1="27.0871"
                        y1="11.1059"
                        x2="27.0164"
                        y2="18.6113"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F7FC" />
                        <stop offset="1" stop-color="#F0DDFC" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5_3977"
                        x1="27.0486"
                        y1="15.1672"
                        x2="27.098"
                        y2="9.92299"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E9EDF5" stop-opacity="0" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_5_3977"
                        x1="26.0533"
                        y1="14.4751"
                        x2="37.4756"
                        y2="11.158"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_5_3977"
                        x1="27.4571"
                        y1="11.205"
                        x2="26.7504"
                        y2="14.9521"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_5_3977"
                        x1="36.1262"
                        y1="12.2976"
                        x2="36.0552"
                        y2="19.8028"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F7FC" />
                        <stop offset="1" stop-color="#F0DDFC" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_5_3977"
                        x1="36.0854"
                        y1="16.3583"
                        x2="36.1347"
                        y2="11.1143"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E9EDF5" stop-opacity="0" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_5_3977"
                        x1="35.0794"
                        y1="15.6659"
                        x2="46.5015"
                        y2="12.349"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_5_3977"
                        x1="36.4959"
                        y1="12.3964"
                        x2="35.7891"
                        y2="16.1438"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_5_3977"
                        x1="68.8189"
                        y1="53.6305"
                        x2="61.3137"
                        y2="53.5599"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F7FC" />
                        <stop offset="1" stop-color="#F0DDFC" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_5_3977"
                        x1="64.7561"
                        y1="53.5919"
                        x2="70.0004"
                        y2="53.6414"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E9EDF5" stop-opacity="0" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_5_3977"
                        x1="65.4304"
                        y1="54.6084"
                        x2="68.9623"
                        y2="43.2507"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_5_3977"
                        x1="68.7271"
                        y1="53.259"
                        x2="64.9672"
                        y2="53.8948"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_5_3977"
                        x1="67.7938"
                        y1="44.5743"
                        x2="60.2884"
                        y2="44.5036"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F9F7FC" />
                        <stop offset="1" stop-color="#F0DDFC" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_5_3977"
                        x1="63.7397"
                        y1="44.5358"
                        x2="68.9838"
                        y2="44.5854"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E9EDF5" stop-opacity="0" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_5_3977"
                        x1="64.4052"
                        y1="45.5522"
                        x2="67.9369"
                        y2="34.1947"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_5_3977"
                        x1="67.702"
                        y1="44.2028"
                        x2="63.9417"
                        y2="44.8387"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_5_3977"
                        x1="10.2159"
                        y1="57.5918"
                        x2="9.19289"
                        y2="64.016"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" />
                        <stop offset="0.3043" stop-color="#FFCE3E" />
                        <stop offset="0.8558" stop-color="#FFAE2B" />
                        <stop offset="1" stop-color="#FFA425" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_5_3977"
                        x1="7.97498"
                        y1="60.1658"
                        x2="17.6158"
                        y2="50.5005"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_5_3977"
                        x1="22.0316"
                        y1="69.6242"
                        x2="15.5894"
                        y2="70.5261"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" />
                        <stop offset="0.3043" stop-color="#FFCE3E" />
                        <stop offset="0.8558" stop-color="#FFAE2B" />
                        <stop offset="1" stop-color="#FFA425" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_5_3977"
                        x1="19.412"
                        y1="71.8152"
                        x2="29.2574"
                        y2="62.3583"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint20_linear_5_3977"
                        x1="34.2863"
                        y1="15.6015"
                        x2="24.146"
                        y2="32.1944"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" />
                        <stop offset="0.3043" stop-color="#FFCE3E" />
                        <stop offset="0.8558" stop-color="#FFAE2B" />
                        <stop offset="1" stop-color="#FFA425" />
                      </linearGradient>
                      <linearGradient
                        id="paint21_linear_5_3977"
                        x1="26.3886"
                        y1="26.4166"
                        x2="47.199"
                        y2="-3.974"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint22_linear_5_3977"
                        x1="21.3524"
                        y1="21.0663"
                        x2="31.1518"
                        y2="33.5965"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F0DDFC" stop-opacity="0" />
                        <stop
                          offset="0.2889"
                          stop-color="#C8B7E0"
                          stop-opacity="0.289"
                        />
                        <stop
                          offset="0.5915"
                          stop-color="#A595C8"
                          stop-opacity="0.592"
                        />
                        <stop
                          offset="0.8395"
                          stop-color="#8F81B8"
                          stop-opacity="0.84"
                        />
                        <stop offset="1" stop-color="#8779B3" />
                      </linearGradient>
                      <linearGradient
                        id="paint23_linear_5_3977"
                        x1="26.861"
                        y1="24.2417"
                        x2="22.6429"
                        y2="31.9014"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint24_linear_5_3977"
                        x1="64.4564"
                        y1="46.3475"
                        x2="47.6755"
                        y2="56.1734"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" />
                        <stop offset="0.3043" stop-color="#FFCE3E" />
                        <stop offset="0.8558" stop-color="#FFAE2B" />
                        <stop offset="1" stop-color="#FFA425" />
                      </linearGradient>
                      <linearGradient
                        id="paint25_linear_5_3977"
                        x1="55.5125"
                        y1="52.7131"
                        x2="86.29"
                        y2="32.4793"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint26_linear_5_3977"
                        x1="59.9191"
                        y1="60.1183"
                        x2="47.5761"
                        y2="50.0846"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint27_linear_5_3977"
                        x1="55.68"
                        y1="53.6102"
                        x2="47.9423"
                        y2="57.6833"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDA45" stop-opacity="0" />
                        <stop offset="1" stop-color="#B53759" />
                      </linearGradient>
                      <linearGradient
                        id="paint28_linear_5_3977"
                        x1="40.4946"
                        y1="34.2732"
                        x2="48.8548"
                        y2="42.7926"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E5F3FF" />
                        <stop offset="1" stop-color="#B3CCFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint29_linear_5_3977"
                        x1="46.2992"
                        y1="39.8383"
                        x2="34.391"
                        y2="29.0023"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E5F3FF" stop-opacity="0" />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                      <linearGradient
                        id="paint30_linear_5_3977"
                        x1="42.4982"
                        y1="47.8737"
                        x2="62.4158"
                        y2="-82.4014"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#B3CCFF" stop-opacity="0" />
                        <stop offset="1" stop-color="#9FB0CB" />
                      </linearGradient>
                      <linearGradient
                        id="paint31_linear_5_3977"
                        x1="62.8684"
                        y1="10.1153"
                        x2="70.1101"
                        y2="21.7355"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8B788A" />
                        <stop offset="1" stop-color="#6E566E" />
                      </linearGradient>
                      <linearGradient
                        id="paint32_linear_5_3977"
                        x1="66.5287"
                        y1="15.9586"
                        x2="64.6455"
                        y2="9.19621"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8B788A" stop-opacity="0" />
                        <stop offset="1" stop-color="#9E8C92" />
                      </linearGradient>
                      <linearGradient
                        id="paint33_linear_5_3977"
                        x1="68.0203"
                        y1="17.4997"
                        x2="72.7522"
                        y2="5.65523"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#555A66" stop-opacity="0" />
                        <stop offset="1" stop-color="#555A66" />
                      </linearGradient>
                      <linearGradient
                        id="paint34_linear_5_3977"
                        x1="19.4674"
                        y1="59.8728"
                        x2="20.4587"
                        y2="60.883"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E5F3FF" />
                        <stop offset="1" stop-color="#B3CCFF" />
                      </linearGradient>
                      <clipPath id="clip0_5_3977">
                        <rect
                          width="79.2563"
                          height="79.2563"
                          fill="white"
                          transform="translate(1.5 -0.000244141) rotate(0.540154)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="icon-content-img-content-name"> Flights </div>
              </div>
            </Link>

            <Link to="/hotels" style={{ textDecoration: "none" }}>
              <div className="icon-content-img-content">
                <div className="icon-content-img-content-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="88"
                    height="88"
                    viewBox="0 0 88 88"
                    fill="none"
                  >
                    <path
                      d="M22.7959 12.5226H25.1556V17.4676H22.7959V12.5226Z"
                      fill="url(#paint0_linear_5_4018)"
                    />
                    <path
                      d="M30.3684 8.46588C30.3176 8.31482 30.184 8.18902 29.9921 8.16298L26.1142 7.62587L24.3916 4.24998C24.3069 4.08401 24.1399 4.00009 23.9731 4.00009C23.806 4.00009 23.6392 4.08401 23.5545 4.24998L21.8319 7.62587L17.954 8.16298C17.7621 8.18902 17.6283 8.31482 17.5778 8.46588C17.5262 8.61773 17.5587 8.79498 17.699 8.9222L20.4847 11.4509L19.8311 15.0821C19.7986 15.2602 19.8792 15.4183 20.0105 15.5116C20.1426 15.6058 20.3261 15.6351 20.4972 15.5535L23.9731 13.9036L27.4489 15.5535C27.6201 15.6349 27.8035 15.6058 27.9356 15.5116C28.0669 15.4183 28.1475 15.2602 28.115 15.0821L27.4614 11.4509L30.2471 8.9222C30.3875 8.79498 30.4199 8.61773 30.3684 8.46588ZM23.9731 10.3975L23.9673 10.3991L23.9698 10.3967L23.9731 10.392L23.9764 10.3967L23.9788 10.3991L23.9731 10.3975Z"
                      fill="url(#paint1_linear_5_4018)"
                    />
                    <path
                      d="M23.9698 10.3969L23.9673 10.3993L20.4847 11.4512L17.699 8.92254C17.5587 8.79516 17.5262 8.61806 17.5778 8.46622L23.9698 10.3969Z"
                      fill="url(#paint2_linear_5_4018)"
                    />
                    <path
                      d="M23.9666 10.3978L20.0098 15.5107C19.8785 15.4174 19.798 15.2592 19.8304 15.0812L20.484 11.4499L23.9666 10.3978Z"
                      fill="url(#paint3_linear_5_4018)"
                    />
                    <path
                      d="M27.9333 15.5121C27.8012 15.6062 27.6177 15.6356 27.4466 15.554L23.9707 13.9041V10.3978L23.9765 10.3994L27.9333 15.5121Z"
                      fill="url(#paint4_linear_5_4018)"
                    />
                    <path
                      d="M23.9743 10.3978V13.9042L20.4985 15.5541C20.3273 15.6356 20.1438 15.6064 20.0117 15.5123L23.9685 10.3994L23.9743 10.3978Z"
                      fill="url(#paint5_linear_5_4018)"
                    />
                    <path
                      d="M27.9334 15.5107L23.9766 10.3978L27.4592 11.4498L28.1128 15.081C28.1452 15.2592 28.0647 15.4174 27.9334 15.5107Z"
                      fill="url(#paint6_linear_5_4018)"
                    />
                    <path
                      d="M26.1119 7.62558L23.9707 10.3916V3.9998C24.1377 3.9998 24.3046 4.08372 24.3892 4.24969L26.1119 7.62558Z"
                      fill="url(#paint7_linear_5_4018)"
                    />
                    <path
                      d="M23.9751 3.9998V10.3916L21.834 7.62558L23.5566 4.24969C23.6413 4.08372 23.8081 3.9998 23.9751 3.9998Z"
                      fill="url(#paint8_linear_5_4018)"
                    />
                    <path
                      d="M30.366 8.4657L23.974 10.3964L23.9707 10.3917L26.1119 7.62569L29.9898 8.16279C30.1817 8.18883 30.3153 8.31464 30.366 8.4657Z"
                      fill="url(#paint9_linear_5_4018)"
                    />
                    <path
                      d="M30.2473 8.92254L27.4616 11.4512L23.979 10.3993L23.9766 10.3969L30.3686 8.46622C30.4201 8.61791 30.3877 8.79516 30.2473 8.92254Z"
                      fill="url(#paint10_linear_5_4018)"
                    />
                    <path
                      d="M35.9922 12.5226H38.3519V17.4676H35.9922V12.5226Z"
                      fill="url(#paint11_linear_5_4018)"
                    />
                    <path
                      d="M43.5646 8.46559C43.5139 8.31453 43.3803 8.18873 43.1884 8.16269L39.3105 7.62558L37.5879 4.24969C37.5032 4.08372 37.3362 3.9998 37.1694 3.9998C37.0023 3.9998 36.8355 4.08372 36.7508 4.24969L35.0282 7.62558L31.1503 8.16269C30.9584 8.18873 30.8246 8.31453 30.7741 8.46559C30.7225 8.61744 30.755 8.79469 30.8953 8.92191L33.681 11.4506L33.0274 15.0818C32.9949 15.2599 33.0755 15.418 33.2068 15.5113C33.3389 15.6055 33.5224 15.6348 33.6935 15.5532L37.1694 13.9033L40.6452 15.5532C40.8163 15.6346 40.9998 15.6055 41.1319 15.5113C41.2632 15.418 41.3438 15.2599 41.3113 15.0818L40.6577 11.4506L43.4434 8.92191C43.5837 8.79469 43.616 8.61744 43.5646 8.46559ZM37.1694 10.3972L37.1636 10.3988L37.1661 10.3964L37.1694 10.3917L37.1726 10.3964L37.1751 10.3988L37.1694 10.3972Z"
                      fill="url(#paint12_linear_5_4018)"
                    />
                    <path
                      d="M37.1661 10.3963L37.1636 10.3987L33.681 11.4506L30.8953 8.92193C30.755 8.79455 30.7225 8.61745 30.7741 8.46561L37.1661 10.3963Z"
                      fill="url(#paint13_linear_5_4018)"
                    />
                    <path
                      d="M37.1629 10.3978L33.2061 15.5107C33.0748 15.4174 32.9943 15.2592 33.0267 15.0812L33.6803 11.4499L37.1629 10.3978Z"
                      fill="url(#paint14_linear_5_4018)"
                    />
                    <path
                      d="M41.1296 15.5121C40.9975 15.6062 40.814 15.6356 40.6428 15.554L37.167 13.9041V10.3978L37.1728 10.3994L41.1296 15.5121Z"
                      fill="url(#paint15_linear_5_4018)"
                    />
                    <path
                      d="M37.1706 10.3981V13.9045L33.6947 15.5544C33.5236 15.6358 33.3401 15.6066 33.208 15.5125L37.1648 10.3996L37.1706 10.3981Z"
                      fill="url(#paint16_linear_5_4018)"
                    />
                    <path
                      d="M41.1297 15.5107L37.1729 10.3978L40.6555 11.4498L41.3091 15.081C41.3413 15.2592 41.2608 15.4174 41.1297 15.5107Z"
                      fill="url(#paint17_linear_5_4018)"
                    />
                    <path
                      d="M39.3081 7.62558L37.167 10.3916V3.9998C37.334 3.9998 37.5009 4.08372 37.5855 4.24969L39.3081 7.62558Z"
                      fill="url(#paint18_linear_5_4018)"
                    />
                    <path
                      d="M37.1714 3.9998V10.3916L35.0303 7.62558L36.7529 4.24969C36.8375 4.08372 37.0044 3.9998 37.1714 3.9998Z"
                      fill="url(#paint19_linear_5_4018)"
                    />
                    <path
                      d="M43.5623 8.4657L37.1703 10.3964L37.167 10.3917L39.3081 7.62569L43.1861 8.16279C43.3778 8.18883 43.5115 8.31464 43.5623 8.4657Z"
                      fill="url(#paint20_linear_5_4018)"
                    />
                    <path
                      d="M43.4436 8.92254L40.6579 11.4512L37.1753 10.3993L37.1729 10.3969L43.5648 8.46622C43.6162 8.61791 43.584 8.79516 43.4436 8.92254Z"
                      fill="url(#paint21_linear_5_4018)"
                    />
                    <path
                      d="M49.1719 12.5226H51.5316V17.4676H49.1719V12.5226Z"
                      fill="url(#paint22_linear_5_4018)"
                    />
                    <path
                      d="M56.7435 8.46559C56.6928 8.31453 56.5592 8.18873 56.3673 8.16269L52.4894 7.62558L50.7668 4.24969C50.6819 4.08372 50.5151 3.9998 50.3481 3.9998C50.181 3.9998 50.0142 4.08372 49.9295 4.24969L48.2069 7.62558L44.329 8.16269C44.1371 8.18873 44.0033 8.31453 43.9528 8.46559C43.9012 8.61744 43.9337 8.79469 44.074 8.92191L46.8597 11.4506L46.2061 15.0818C46.1736 15.2599 46.2542 15.418 46.3855 15.5113C46.5176 15.6055 46.7011 15.6348 46.8722 15.5532L50.3481 13.9033L53.8239 15.5532C53.9951 15.6346 54.1785 15.6055 54.3106 15.5113C54.4419 15.418 54.5225 15.2599 54.49 15.0818L53.8364 11.4506L56.6221 8.92191C56.7625 8.79469 56.7949 8.61744 56.7435 8.46559ZM50.3481 10.3972L50.3423 10.3988L50.3448 10.3964L50.3481 10.3917L50.3514 10.3964L50.3538 10.3988L50.3481 10.3972Z"
                      fill="url(#paint23_linear_5_4018)"
                    />
                    <path
                      d="M50.3448 10.3972L50.3423 10.3995L46.8597 11.4514L44.074 8.92278C43.9337 8.79541 43.9012 8.61831 43.9528 8.46646L50.3448 10.3972Z"
                      fill="url(#paint24_linear_5_4018)"
                    />
                    <path
                      d="M50.3416 10.3978L46.3848 15.5107C46.2535 15.4174 46.173 15.2592 46.2054 15.0812L46.859 11.4499L50.3416 10.3978Z"
                      fill="url(#paint25_linear_5_4018)"
                    />
                    <path
                      d="M54.3112 15.5121C54.1791 15.6062 53.9956 15.6356 53.8245 15.554L50.3486 13.9041V10.3978L50.3544 10.3994L54.3112 15.5121Z"
                      fill="url(#paint26_linear_5_4018)"
                    />
                    <path
                      d="M50.3493 10.3981V13.9045L46.8735 15.5544C46.7023 15.6358 46.5188 15.6066 46.3867 15.5125L50.3435 10.3996L50.3493 10.3981Z"
                      fill="url(#paint27_linear_5_4018)"
                    />
                    <path
                      d="M54.3084 15.5107L50.3516 10.3978L53.8342 11.4498L54.4878 15.081C54.5202 15.2592 54.4397 15.4174 54.3084 15.5107Z"
                      fill="url(#paint28_linear_5_4018)"
                    />
                    <path
                      d="M52.4898 7.62558L50.3486 10.3916V3.9998C50.5157 3.9998 50.6825 4.08372 50.7672 4.24969L52.4898 7.62558Z"
                      fill="url(#paint29_linear_5_4018)"
                    />
                    <path
                      d="M50.3501 3.9998V10.3916L48.209 7.62558L49.9316 4.24969C50.0163 4.08372 50.1833 3.9998 50.3501 3.9998Z"
                      fill="url(#paint30_linear_5_4018)"
                    />
                    <path
                      d="M56.7439 8.4657L50.3519 10.3964L50.3486 10.3917L52.4898 7.62569L56.3677 8.16279C56.5594 8.18883 56.6932 8.31464 56.7439 8.4657Z"
                      fill="url(#paint31_linear_5_4018)"
                    />
                    <path
                      d="M56.6223 8.92254L53.8366 11.4512L50.354 10.3993L50.3516 10.3969L56.7436 8.46622C56.7951 8.61791 56.7627 8.79516 56.6223 8.92254Z"
                      fill="url(#paint32_linear_5_4018)"
                    />
                    <path
                      d="M62.3672 12.5226H64.7269V17.4676H62.3672V12.5226Z"
                      fill="url(#paint33_linear_5_4018)"
                    />
                    <path
                      d="M69.9406 8.46559C69.8899 8.31453 69.7563 8.18873 69.5644 8.16269L65.6865 7.62558L63.964 4.24969C63.8792 4.08372 63.7124 3.9998 63.5453 3.9998C63.3783 3.9998 63.2114 4.08372 63.1268 4.24969L61.4042 7.62558L57.5262 8.16269C57.3344 8.18873 57.2006 8.31453 57.15 8.46559C57.0985 8.61744 57.1309 8.79469 57.2713 8.92191L60.057 11.4506L59.4034 15.0818C59.3709 15.2599 59.4515 15.418 59.5827 15.5113C59.7148 15.6055 59.8983 15.6348 60.0695 15.5532L63.5453 13.9033L67.0212 15.5532C67.1923 15.6346 67.3758 15.6055 67.5079 15.5113C67.6392 15.418 67.7197 15.2599 67.6873 15.0818L67.0337 11.4506L69.8194 8.92191C69.9597 8.79469 69.9922 8.61744 69.9406 8.46559ZM63.5453 10.3972L63.5396 10.3988L63.542 10.3964L63.5453 10.3917L63.5486 10.3964L63.5511 10.3988L63.5453 10.3972Z"
                      fill="url(#paint34_linear_5_4018)"
                    />
                    <path
                      d="M63.542 10.3969L63.5396 10.3993L60.057 11.4512L57.2713 8.92254C57.1309 8.79516 57.0985 8.61806 57.15 8.46622L63.542 10.3969Z"
                      fill="url(#paint35_linear_5_4018)"
                    />
                    <path
                      d="M63.5389 10.3981L59.5821 15.5109C59.4508 15.4176 59.3702 15.2595 59.4027 15.0814L60.0563 11.4502L63.5389 10.3981Z"
                      fill="url(#paint36_linear_5_4018)"
                    />
                    <path
                      d="M67.5085 15.5121C67.3764 15.6062 67.1929 15.6356 67.0217 15.554L63.5459 13.9041V10.3978L63.5517 10.3994L67.5085 15.5121Z"
                      fill="url(#paint37_linear_5_4018)"
                    />
                    <path
                      d="M63.5466 10.3978V13.9042L60.0707 15.5541C59.8996 15.6356 59.7161 15.6064 59.584 15.5123L63.5408 10.3994L63.5466 10.3978Z"
                      fill="url(#paint38_linear_5_4018)"
                    />
                    <path
                      d="M67.5086 15.5107L63.5518 10.3978L67.0344 11.4498L67.688 15.081C67.7204 15.2592 67.6399 15.4174 67.5086 15.5107Z"
                      fill="url(#paint39_linear_5_4018)"
                    />
                    <path
                      d="M65.687 7.62558L63.5459 10.3916V3.9998C63.7129 3.9998 63.8798 4.08372 63.9644 4.24969L65.687 7.62558Z"
                      fill="url(#paint40_linear_5_4018)"
                    />
                    <path
                      d="M63.5474 3.9998V10.3916L61.4062 7.62558L63.1289 4.24969C63.2135 4.08372 63.3805 3.9998 63.5474 3.9998Z"
                      fill="url(#paint41_linear_5_4018)"
                    />
                    <path
                      d="M69.9412 8.4657L63.5492 10.3964L63.5459 10.3917L65.687 7.62569L69.565 8.16279C69.7569 8.18883 69.8906 8.31464 69.9412 8.4657Z"
                      fill="url(#paint42_linear_5_4018)"
                    />
                    <path
                      d="M69.8225 8.92254L67.0368 11.4512L63.5542 10.3993L63.5518 10.3969L69.9438 8.46622C69.9953 8.61791 69.9629 8.79516 69.8225 8.92254Z"
                      fill="url(#paint43_linear_5_4018)"
                    />
                    <path
                      d="M19.4199 20.1134H68.1079V41.1413H19.4199V20.1134Z"
                      fill="url(#paint44_linear_5_4018)"
                    />
                    <path
                      d="M19.4199 20.1134V24.0626L37.3535 41.1414H68.1079V20.1134H19.4199Z"
                      fill="url(#paint45_linear_5_4018)"
                    />
                    <path
                      d="M68.1714 24.0042H19.3609C17.5042 24.0042 15.999 22.5707 15.999 20.8025V19.4239C15.999 17.6557 17.5042 16.2222 19.3609 16.2222H68.1712C70.0279 16.2222 71.5331 17.6557 71.5331 19.4239V20.8025C71.5331 22.5707 70.0281 24.0042 68.1714 24.0042Z"
                      fill="url(#paint46_linear_5_4018)"
                    />
                    <path
                      d="M33.2135 26.7602C32.7776 26.2949 32.1451 26.158 31.4388 26.158H26.3764C25.062 26.158 24.1621 27.0149 24.1621 28.2667V33.0878C24.1621 33.7604 24.3057 34.3628 24.7945 34.7778L30.8536 40.5481C31.2894 41.0134 31.9219 41.3081 32.6282 41.3081H37.6906C39.0051 41.3081 40.0706 40.2934 40.0706 39.0416V34.2205C40.0706 33.5479 39.7613 32.9455 39.2726 32.5304L33.2135 26.7602Z"
                      fill="url(#paint47_linear_5_4018)"
                    />
                    <path
                      d="M31.4424 35.3542H26.38C25.0656 35.3542 24 34.3394 24 33.0876V28.2665C24 27.0148 25.0656 26 26.38 26H31.4424C32.7568 26 33.8224 27.0148 33.8224 28.2665V33.0876C33.8224 34.3394 32.7568 35.3542 31.4424 35.3542Z"
                      fill="url(#paint48_linear_5_4018)"
                    />
                    <path
                      d="M47.5357 26.7592C47.0999 26.2939 46.4674 26.157 45.7611 26.157H40.6987C39.3842 26.157 38.4844 27.014 38.4844 28.2657V33.0868C38.4844 33.7595 38.628 34.3618 39.1167 34.7769L45.1758 40.5472C45.6117 41.0124 46.2442 41.3072 46.9505 41.3072H52.0129C53.3273 41.3072 54.3929 40.2924 54.3929 39.0406V34.2195C54.3929 33.5469 54.0835 32.9445 53.5948 32.5295L47.5357 26.7592Z"
                      fill="url(#paint49_linear_5_4018)"
                    />
                    <path
                      d="M45.7656 35.3542H40.7032C39.3888 35.3542 38.3232 34.3394 38.3232 33.0876V28.2665C38.3232 27.0148 39.3888 26 40.7032 26H45.7656C47.0801 26 48.1456 27.0148 48.1456 28.2665V33.0876C48.1456 34.3393 47.0801 35.3542 45.7656 35.3542Z"
                      fill="url(#paint50_linear_5_4018)"
                    />
                    <path
                      d="M60.8931 26.7594C60.4573 26.2942 59.8248 26.1572 59.1185 26.1572H54.0561C52.7416 26.1572 51.8418 27.0142 51.8418 28.266V33.0871C51.8418 33.7597 51.9854 34.3621 52.4741 34.7771L58.5332 40.5474C58.9691 41.0127 59.6016 41.3074 60.3079 41.3074H65.3703C66.6847 41.3074 67.7503 40.2926 67.7503 39.0409V34.2198C67.7503 33.5471 67.441 32.9448 66.9523 32.5297L60.8931 26.7594Z"
                      fill="url(#paint51_linear_5_4018)"
                    />
                    <path
                      d="M59.1162 35.3542H54.0538C52.7394 35.3542 51.6738 34.3394 51.6738 33.0876V28.2665C51.6738 27.0148 52.7394 26 54.0538 26H59.1162C60.4307 26 61.4962 27.0148 61.4962 28.2665V33.0876C61.4962 34.3393 60.4307 35.3542 59.1162 35.3542Z"
                      fill="url(#paint52_linear_5_4018)"
                    />
                    <path
                      d="M19.4199 41.5426H68.1079V62.5705H19.4199V41.5426Z"
                      fill="url(#paint53_linear_5_4018)"
                    />
                    <path
                      d="M19.4199 41.5426V45.4918L37.3535 62.5705H68.1079V41.5426H19.4199Z"
                      fill="url(#paint54_linear_5_4018)"
                    />
                    <path
                      d="M68.1714 45.4341H19.3609C17.5042 45.4341 15.999 44.0007 15.999 42.2325V40.8538C15.999 39.0857 17.5042 37.6522 19.3609 37.6522H68.1712C70.0279 37.6522 71.5331 39.0857 71.5331 40.8538V42.2325C71.5331 44.0007 70.0281 45.4341 68.1714 45.4341Z"
                      fill="url(#paint55_linear_5_4018)"
                    />
                    <path
                      d="M33.2135 47.7598C32.7776 47.2946 32.1451 47.1576 31.4388 47.1576H26.3764C25.062 47.1576 24.1621 48.0146 24.1621 49.2664V54.0875C24.1621 54.7601 24.3057 55.3625 24.7945 55.7775L30.8536 61.5478C31.2894 62.0131 31.9219 62.3078 32.6282 62.3078H37.6906C39.0051 62.3078 40.0706 61.2931 40.0706 60.0413V55.2202C40.0706 54.5475 39.7613 53.9452 39.2726 53.5301L33.2135 47.7598Z"
                      fill="url(#paint56_linear_5_4018)"
                    />
                    <path
                      d="M31.4424 47H26.38C25.0656 47 24 48.0148 24 49.2665V54.0876C24 55.3394 25.0656 56.3542 26.38 56.3542H31.4424C32.7568 56.3542 33.8224 55.3394 33.8224 54.0876V49.2665C33.8224 48.0149 32.7568 47 31.4424 47Z"
                      fill="url(#paint57_linear_5_4018)"
                    />
                    <path
                      d="M46.564 47.7603C46.1282 47.295 45.4957 47.1581 44.7894 47.1581H39.727C38.4125 47.1581 37.5127 48.015 37.5127 49.2668V54.0879C37.5127 54.7605 37.6563 55.3629 38.145 55.778L44.2041 61.5483C44.64 62.0135 45.2725 62.3083 45.9788 62.3083H51.0412C52.3557 62.3083 53.4212 61.2935 53.4212 60.0417V55.2206C53.4212 54.548 53.1119 53.9456 52.6231 53.5306L46.564 47.7603Z"
                      fill="url(#paint58_linear_5_4018)"
                    />
                    <path
                      d="M44.794 56.3542H39.7316C38.4171 56.3542 37.3516 55.3394 37.3516 54.0876V49.2665C37.3516 48.0148 38.4171 47 39.7316 47H44.794C46.1084 47 47.174 48.0148 47.174 49.2665V54.0876C47.174 55.3394 46.1084 56.3542 44.794 56.3542Z"
                      fill="url(#paint59_linear_5_4018)"
                    />
                    <path
                      d="M59.9215 47.7602C59.4856 47.2949 58.8531 47.158 58.1468 47.158H53.0844C51.77 47.158 50.8701 48.0149 50.8701 49.2667V54.0878C50.8701 54.7604 51.0137 55.3628 51.5025 55.7779L57.5616 61.5481C57.9974 62.0134 58.6299 62.3082 59.3362 62.3082H64.3986C65.7131 62.3082 66.7786 61.2934 66.7786 60.0416V55.2205C66.7786 54.5479 66.4693 53.9455 65.9806 53.5305L59.9215 47.7602Z"
                      fill="url(#paint60_linear_5_4018)"
                    />
                    <path
                      d="M58.1445 56.3542H53.0821C51.7677 56.3542 50.7021 55.3394 50.7021 54.0876V49.2665C50.7021 48.0148 51.7677 47 53.0821 47H58.1445C59.459 47 60.5245 48.0148 60.5245 49.2665V54.0876C60.5245 55.3394 59.459 56.3542 58.1445 56.3542Z"
                      fill="url(#paint61_linear_5_4018)"
                    />
                    <path
                      d="M19.4199 62.9704H68.1079V83.9983H19.4199V62.9704Z"
                      fill="url(#paint62_linear_5_4018)"
                    />
                    <path
                      d="M19.4199 62.9704V66.9196L37.3535 83.9983H68.1079V62.9704H19.4199Z"
                      fill="url(#paint63_linear_5_4018)"
                    />
                    <path
                      d="M68.1714 66.8621H19.3609C17.5042 66.8621 15.999 65.4287 15.999 63.6605V62.2818C15.999 60.5137 17.5042 59.0802 19.3609 59.0802H68.1712C70.0279 59.0802 71.5331 60.5137 71.5331 62.2818V63.6605C71.5331 65.4287 70.0281 66.8621 68.1714 66.8621Z"
                      fill="url(#paint64_linear_5_4018)"
                    />
                    <path
                      d="M50.7797 83.9999H36V69.9264C36 69.2392 36.5849 68.6822 37.3065 68.6822H49.4733C50.195 68.6822 50.7799 69.2392 50.7799 69.9264L50.7797 83.9999Z"
                      fill="url(#paint65_linear_5_4018)"
                    />
                    <path
                      d="M49.4749 68.6822H43.3916V83.9997H50.7815V69.9263C50.7815 69.2392 50.1965 68.6822 49.4749 68.6822Z"
                      fill="url(#paint66_linear_5_4018)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_5_4018"
                        x1="22.5788"
                        y1="14.9951"
                        x2="24.9991"
                        y2="14.9951"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8A7889" />
                        <stop offset="1" stop-color="#6E566E" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5_4018"
                        x1="21.4783"
                        y1="8.29819"
                        x2="30.7123"
                        y2="18.3436"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFD945" />
                        <stop offset="0.3043" stop-color="#FFCD3E" />
                        <stop offset="0.8558" stop-color="#FFAD2B" />
                        <stop offset="1" stop-color="#FFA325" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_5_4018"
                        x1="20.9935"
                        y1="9.822"
                        x2="26.7285"
                        y2="16.2456"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_5_4018"
                        x1="21.6402"
                        y1="12.9543"
                        x2="25.7835"
                        y2="12.9543"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_5_4018"
                        x1="23.2817"
                        y1="11.6606"
                        x2="33.2989"
                        y2="19.5025"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_5_4018"
                        x1="20.8139"
                        y1="13.0432"
                        x2="29.9075"
                        y2="12.7139"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_5_4018"
                        x1="26.4572"
                        y1="14.0517"
                        x2="24.3347"
                        y2="4.15126"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_5_4018"
                        x1="24.6561"
                        y1="7.43703"
                        x2="16.172"
                        y2="3.91076"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_5_4018"
                        x1="22.9198"
                        y1="7.016"
                        x2="23.0321"
                        y2="16.768"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_5_4018"
                        x1="26.3938"
                        y1="9.60234"
                        x2="18.5062"
                        y2="16.9395"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_5_4018"
                        x1="27.3089"
                        y1="9.19595"
                        x2="29.9359"
                        y2="1.26567"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_5_4018"
                        x1="35.7751"
                        y1="14.9951"
                        x2="38.1954"
                        y2="14.9951"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8A7889" />
                        <stop offset="1" stop-color="#6E566E" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_5_4018"
                        x1="34.6746"
                        y1="8.2979"
                        x2="43.9086"
                        y2="18.3433"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFD945" />
                        <stop offset="0.3043" stop-color="#FFCD3E" />
                        <stop offset="0.8558" stop-color="#FFAD2B" />
                        <stop offset="1" stop-color="#FFA325" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_5_4018"
                        x1="34.19"
                        y1="9.82139"
                        x2="39.925"
                        y2="16.245"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_5_4018"
                        x1="34.8365"
                        y1="12.9543"
                        x2="38.9797"
                        y2="12.9543"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_5_4018"
                        x1="36.478"
                        y1="11.6606"
                        x2="46.4952"
                        y2="19.5025"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_5_4018"
                        x1="34.01"
                        y1="13.0434"
                        x2="43.1037"
                        y2="12.7142"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_5_4018"
                        x1="39.6535"
                        y1="14.0517"
                        x2="37.531"
                        y2="4.15126"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_5_4018"
                        x1="37.8524"
                        y1="7.43703"
                        x2="29.3683"
                        y2="3.91076"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_5_4018"
                        x1="36.1161"
                        y1="7.016"
                        x2="36.2284"
                        y2="16.768"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint20_linear_5_4018"
                        x1="39.5901"
                        y1="9.60234"
                        x2="31.7024"
                        y2="16.9395"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint21_linear_5_4018"
                        x1="40.5052"
                        y1="9.19595"
                        x2="43.1322"
                        y2="1.26567"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint22_linear_5_4018"
                        x1="48.9549"
                        y1="14.9951"
                        x2="51.3753"
                        y2="14.9951"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8A7889" />
                        <stop offset="1" stop-color="#6E566E" />
                      </linearGradient>
                      <linearGradient
                        id="paint23_linear_5_4018"
                        x1="47.8534"
                        y1="8.2979"
                        x2="57.0873"
                        y2="18.3433"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFD945" />
                        <stop offset="0.3043" stop-color="#FFCD3E" />
                        <stop offset="0.8558" stop-color="#FFAD2B" />
                        <stop offset="1" stop-color="#FFA325" />
                      </linearGradient>
                      <linearGradient
                        id="paint24_linear_5_4018"
                        x1="47.3687"
                        y1="9.82225"
                        x2="53.1037"
                        y2="16.2458"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint25_linear_5_4018"
                        x1="48.015"
                        y1="12.9543"
                        x2="52.1585"
                        y2="12.9543"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint26_linear_5_4018"
                        x1="49.6598"
                        y1="11.6606"
                        x2="59.677"
                        y2="19.5025"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint27_linear_5_4018"
                        x1="47.1889"
                        y1="13.0434"
                        x2="56.2826"
                        y2="12.7142"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint28_linear_5_4018"
                        x1="52.8322"
                        y1="14.0517"
                        x2="50.7099"
                        y2="4.15126"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint29_linear_5_4018"
                        x1="51.0339"
                        y1="7.43703"
                        x2="42.5499"
                        y2="3.91075"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint30_linear_5_4018"
                        x1="49.295"
                        y1="7.016"
                        x2="49.4073"
                        y2="16.768"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint31_linear_5_4018"
                        x1="52.7718"
                        y1="9.60234"
                        x2="44.8841"
                        y2="16.9395"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint32_linear_5_4018"
                        x1="53.6841"
                        y1="9.19595"
                        x2="56.311"
                        y2="1.26567"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint33_linear_5_4018"
                        x1="62.1503"
                        y1="14.9951"
                        x2="64.5706"
                        y2="14.9951"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8A7889" />
                        <stop offset="1" stop-color="#6E566E" />
                      </linearGradient>
                      <linearGradient
                        id="paint34_linear_5_4018"
                        x1="61.0507"
                        y1="8.2979"
                        x2="70.2846"
                        y2="18.3433"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFD945" />
                        <stop offset="0.3043" stop-color="#FFCD3E" />
                        <stop offset="0.8558" stop-color="#FFAD2B" />
                        <stop offset="1" stop-color="#FFA325" />
                      </linearGradient>
                      <linearGradient
                        id="paint35_linear_5_4018"
                        x1="60.5659"
                        y1="9.822"
                        x2="66.301"
                        y2="16.2456"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint36_linear_5_4018"
                        x1="61.2123"
                        y1="12.9545"
                        x2="65.3557"
                        y2="12.9545"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint37_linear_5_4018"
                        x1="62.8571"
                        y1="11.6606"
                        x2="72.8742"
                        y2="19.5025"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint38_linear_5_4018"
                        x1="60.3862"
                        y1="13.0432"
                        x2="69.4799"
                        y2="12.7139"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint39_linear_5_4018"
                        x1="66.0324"
                        y1="14.0517"
                        x2="63.9101"
                        y2="4.15126"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint40_linear_5_4018"
                        x1="64.2313"
                        y1="7.43703"
                        x2="55.7474"
                        y2="3.91076"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint41_linear_5_4018"
                        x1="62.4921"
                        y1="7.016"
                        x2="62.6044"
                        y2="16.768"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint42_linear_5_4018"
                        x1="65.9692"
                        y1="9.60234"
                        x2="58.0815"
                        y2="16.9395"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint43_linear_5_4018"
                        x1="66.8843"
                        y1="9.19595"
                        x2="69.5111"
                        y2="1.26568"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E87264" stop-opacity="0" />
                        <stop
                          offset="0.6519"
                          stop-color="#F67150"
                          stop-opacity="0.652"
                        />
                        <stop offset="1" stop-color="#FF7044" />
                      </linearGradient>
                      <linearGradient
                        id="paint44_linear_5_4018"
                        x1="44"
                        y1="32"
                        x2="44"
                        y2="43.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.980228" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint45_linear_5_4018"
                        x1="44"
                        y1="41.1432"
                        x2="44"
                        y2="13.143"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop
                          offset="0.591"
                          stop-color="#B1DDF4"
                          stop-opacity="0.43"
                        />
                        <stop offset="1" stop-color="#D9EAF4" />
                      </linearGradient>
                      <linearGradient
                        id="paint46_linear_5_4018"
                        x1="43.7661"
                        y1="18.7994"
                        x2="43.7661"
                        y2="24.9544"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.4428" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint47_linear_5_4018"
                        x1="39.4727"
                        y1="40.3082"
                        x2="24.9727"
                        y2="26.8082"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.876599" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint48_linear_5_4018"
                        x1="25.3039"
                        y1="26.8742"
                        x2="31.7806"
                        y2="35.4667"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#DD0855" />
                        <stop offset="1" stop-color="#FF6F86" />
                      </linearGradient>
                      <linearGradient
                        id="paint49_linear_5_4018"
                        x1="54"
                        y1="38.167"
                        x2="39.5"
                        y2="25.167"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.862632" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint50_linear_5_4018"
                        x1="37.5693"
                        y1="25.282"
                        x2="44.4713"
                        y2="32.5293"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#18CEFB" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint51_linear_5_4018"
                        x1="67"
                        y1="37.1675"
                        x2="53"
                        y2="25.6675"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.863201" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint52_linear_5_4018"
                        x1="50.8298"
                        y1="25.1961"
                        x2="56.623"
                        y2="31.2792"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#18CEFB" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint53_linear_5_4018"
                        x1="43.5"
                        y1="56.5"
                        x2="43.764"
                        y2="65.1383"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.901927" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint54_linear_5_4018"
                        x1="44"
                        y1="62.5722"
                        x2="44"
                        y2="34.5722"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop
                          offset="0.591"
                          stop-color="#B1DDF4"
                          stop-opacity="0.43"
                        />
                        <stop offset="1" stop-color="#D9EAF4" />
                      </linearGradient>
                      <linearGradient
                        id="paint55_linear_5_4018"
                        x1="43.7661"
                        y1="40.2294"
                        x2="43.7661"
                        y2="46.3844"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.4428" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint56_linear_5_4018"
                        x1="39.5273"
                        y1="61.2376"
                        x2="23.0273"
                        y2="46.2376"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.865226" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint57_linear_5_4018"
                        x1="22.0519"
                        y1="45.1449"
                        x2="30.9931"
                        y2="54.5334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#18CEFB" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint58_linear_5_4018"
                        x1="51.5273"
                        y1="58.2379"
                        x2="38.0273"
                        y2="47.2379"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.77113" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint59_linear_5_4018"
                        x1="38.6554"
                        y1="47.8742"
                        x2="45.1322"
                        y2="56.4667"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#DD0855" />
                        <stop offset="1" stop-color="#FF6F86" />
                      </linearGradient>
                      <linearGradient
                        id="paint60_linear_5_4018"
                        x1="66.5273"
                        y1="58.2376"
                        x2="53.5273"
                        y2="49.2376"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.84763" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint61_linear_5_4018"
                        x1="49.8581"
                        y1="46.1962"
                        x2="55.6513"
                        y2="52.2792"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#18CEFB" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint62_linear_5_4018"
                        x1="44"
                        y1="84"
                        x2="44"
                        y2="56"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop
                          offset="0.591"
                          stop-color="#B1DDF4"
                          stop-opacity="0.43"
                        />
                        <stop offset="1" stop-color="#D9EAF4" />
                      </linearGradient>
                      <linearGradient
                        id="paint63_linear_5_4018"
                        x1="44"
                        y1="84"
                        x2="44"
                        y2="56"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop
                          offset="0.591"
                          stop-color="#B1DDF4"
                          stop-opacity="0.43"
                        />
                        <stop offset="1" stop-color="#D9EAF4" />
                      </linearGradient>
                      <linearGradient
                        id="paint64_linear_5_4018"
                        x1="43.7661"
                        y1="61.6574"
                        x2="43.7661"
                        y2="67.8124"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF7FF" />
                        <stop offset="0.4428" stop-color="#A9D9F2" />
                        <stop offset="1" stop-color="#C9DDFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint65_linear_5_4018"
                        x1="37.0575"
                        y1="68.7013"
                        x2="48.3469"
                        y2="84.5348"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4A97F6" />
                        <stop offset="1" stop-color="#27BEF9" />
                      </linearGradient>
                      <linearGradient
                        id="paint66_linear_5_4018"
                        x1="47.1205"
                        y1="76.5295"
                        x2="35.0218"
                        y2="72.1738"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#26BFF9" stop-opacity="0" />
                        <stop
                          offset="0.2944"
                          stop-color="#40A2F7"
                          stop-opacity="0.28"
                        />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="icon-content-img-content-name"> Hotel</div>
              </div>
            </Link>

            <Link to="/holidaypackage" style={{ textDecoration: "none" }}>
              <div className="icon-content-img-content">
                <div className="icon-content-img-content-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="97"
                    height="96"
                    viewBox="0 0 97 96"
                    fill="none"
                  >
                    <rect x="0.5" width="96" height="96" rx="4" />
                    <path
                      d="M76.3329 13.6159L73.5068 11.8073L74.5326 10.1507C75.0047 9.38815 75.9956 9.15898 76.7456 9.63898L76.8553 9.70925C77.6053 10.1893 77.8308 11.1966 77.3586 11.9591L76.3329 13.6159Z"
                      fill="url(#paint0_linear_5_4121)"
                    />
                    <path
                      d="M40.6951 71.92L37.1826 69.6721L62.1089 29.4422L65.6212 31.6901L40.6951 71.92Z"
                      fill="url(#paint1_linear_5_4121)"
                    />
                    <path
                      d="M58.6885 34.968L59.9899 40.7867L65.6221 31.6901L62.1098 29.4422L58.6885 34.968Z"
                      fill="url(#paint2_linear_5_4121)"
                    />
                    <path
                      d="M75.1507 12.3421C63.6944 5.01069 48.9913 7.24049 40.0827 16.9413C38.1896 19.0028 38.5964 22.3028 40.9442 23.8052C42.8613 25.032 45.385 24.5842 46.7707 22.7622C55.038 11.893 67.1582 7.22716 75.1507 12.3421Z"
                      fill="url(#paint3_linear_5_4121)"
                    />
                    <path
                      d="M75.1514 12.3421C83.1441 17.457 84.247 30.585 78.1822 42.8635C77.1655 44.9217 77.8597 47.4289 79.7768 48.6557C82.1245 50.1581 85.2272 49.104 86.2367 46.4772C90.9882 34.1158 86.6077 19.6734 75.1514 12.3421Z"
                      fill="url(#paint4_linear_5_4121)"
                    />
                    <path
                      d="M75.1517 12.3421C78.1496 14.2606 75.5346 24.1199 69.3131 35.4353C67.8271 38.1379 68.6726 41.5493 71.2501 43.1988L72.2746 43.8543C74.5029 45.2803 77.4699 44.4212 78.596 42.0014C84.1921 29.9757 82.9577 17.3374 75.1517 12.3421Z"
                      fill="url(#paint5_linear_5_4121)"
                    />
                    <path
                      d="M75.1527 12.3422C67.3468 7.34673 55.6042 11.6804 47.3586 22.0106C45.6994 24.0892 46.2205 27.1804 48.4488 28.6065L49.4733 29.262C52.0508 30.9114 55.442 30.2113 57.1963 27.6804C64.5415 17.0841 72.1549 10.4237 75.1527 12.3422Z"
                      fill="url(#paint6_linear_5_4121)"
                    />
                    <path
                      d="M75.1497 12.3422C72.2678 10.498 65.1202 16.5821 58.0461 26.4694C55.8456 29.5452 56.6794 33.8757 59.8455 35.9017L60.8729 36.5593C64.0391 38.5853 68.2403 37.4771 70.0165 34.1298C75.7265 23.3695 78.0318 14.1865 75.1497 12.3422Z"
                      fill="url(#paint7_linear_5_4121)"
                    />
                    <path
                      d="M72.5658 53.6171H37.9423C36.7797 53.6171 35.6647 53.1476 34.8426 52.3117L19.1272 36.3346C17.8998 35.0867 15.9097 35.0867 14.6823 36.3346C13.4549 37.5824 13.4549 39.6056 14.6823 40.8535L32.4313 58.8982C33.0076 59.5774 33.8597 60.0078 34.8113 60.0078H72.6411C74.415 60.0078 75.8456 58.5139 75.7821 56.696C75.7216 54.9644 74.2701 53.6171 72.5658 53.6171Z"
                      fill="url(#paint8_linear_5_4121)"
                    />
                    <path
                      d="M27.0086 73.4108L36.9192 63.3352C38.285 61.9467 38.285 59.6954 36.9192 58.3067C35.5534 56.9181 33.339 56.9181 31.973 58.3067L22.0624 68.3823C20.6966 69.7708 20.6966 72.0221 22.0624 73.4108C23.4284 74.7994 25.6428 74.7994 27.0086 73.4108Z"
                      fill="url(#paint9_linear_5_4121)"
                    />
                    <path
                      d="M24.5322 65.87L29.4784 70.8985L36.9178 63.3352C38.2836 61.9467 38.2836 59.6954 36.9178 58.3067C35.552 56.9181 33.3376 56.9181 31.9716 58.3067L24.5322 65.87Z"
                      fill="url(#paint10_linear_5_4121)"
                    />
                    <path
                      d="M79.7523 73.4108L69.8417 63.3352C68.4759 61.9467 68.4759 59.6954 69.8417 58.3067C71.2075 56.9181 73.422 56.9181 74.7879 58.3067L84.6985 68.3823C86.0643 69.7708 86.0643 72.0221 84.6985 73.4108C83.3325 74.7994 81.1181 74.7994 79.7523 73.4108Z"
                      fill="url(#paint11_linear_5_4121)"
                    />
                    <path
                      d="M82.2273 65.87L77.2812 70.8985L69.8417 63.3352C68.4759 61.9467 68.4759 59.6954 69.8417 58.3067C71.2075 56.9181 73.422 56.9181 74.7879 58.3067L82.2273 65.87Z"
                      fill="url(#paint12_linear_5_4121)"
                    />
                    <path
                      d="M74.9551 64.0631H32.8587C30.9271 64.0631 29.3613 62.4711 29.3613 60.5075C29.3613 58.5437 30.9273 56.9519 32.8587 56.9519H74.9549C76.8865 56.9519 78.4523 58.5439 78.4523 60.5075C78.4525 62.4711 76.8867 64.0631 74.9551 64.0631Z"
                      fill="url(#paint13_linear_5_4121)"
                    />
                    <path
                      d="M10.4609 42.7484L30.4019 63.0215C31.7677 64.41 33.9822 64.41 35.3481 63.0215C36.7139 61.6329 36.7139 59.3816 35.3481 57.9929L15.4071 37.72C14.0413 36.3315 11.8268 36.3315 10.4609 37.72C9.09507 39.1085 9.09507 41.3598 10.4609 42.7484Z"
                      fill="url(#paint14_linear_5_4121)"
                    />
                    <path
                      d="M88.1283 84.3521V74.3159C88.1283 71.1309 85.5888 68.5491 82.456 68.5491H72.0386C63.3452 68.5491 55.0475 72.2425 49.1507 78.7366L44.0518 84.3521H88.1283Z"
                      fill="url(#paint15_linear_5_4121)"
                    />
                    <path
                      d="M12.0615 70.3719C25.0939 67.1636 39.033 68.625 50.8532 74.4388L52.708 75.3511C61.1205 79.4889 70.5897 81.6606 80.2184 81.6606H84.538C86.5197 81.6606 88.1262 83.0798 88.1262 84.8302C88.1262 86.5806 86.5197 87.9998 84.538 87.9998H13.0248C11.043 87.9998 9.43652 86.5806 9.43652 84.8302V73.4252C9.43652 72.0023 10.5098 70.7538 12.0615 70.3719Z"
                      fill="url(#paint16_linear_5_4121)"
                    />
                    <path
                      d="M84.5379 81.6607H80.2183C70.5896 81.6607 61.1205 79.4889 52.7079 75.3512L50.853 74.4389C44.3511 71.2409 37.2081 69.3614 29.9274 68.8508C26.7948 68.631 24.1201 70.831 24.1201 73.607C24.1201 78.9845 29.0552 83.3437 35.1428 83.3437H87.7063C87.1032 82.3427 85.9113 81.6607 84.5379 81.6607Z"
                      fill="url(#paint17_linear_5_4121)"
                    />
                    <path
                      d="M9.43652 84.8302C9.43652 86.5808 11.043 87.9998 13.0248 87.9998H84.5382C86.5199 87.9998 88.1264 86.5808 88.1264 84.8302C88.1264 83.0796 86.5199 81.6606 84.5382 81.6606H80.2186C74.2886 81.6606 68.4194 80.8357 62.8199 79.2363H9.43652V84.8302Z"
                      fill="url(#paint18_linear_5_4121)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_5_4121"
                        x1="75.1392"
                        y1="11.0006"
                        x2="77.0289"
                        y2="12.1716"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#B5DBFF" />
                        <stop offset="1" stop-color="#48B2E3" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5_4121"
                        x1="50.5182"
                        y1="50.3791"
                        x2="52.8752"
                        y2="51.8398"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#B5DBFF" />
                        <stop offset="1" stop-color="#48B2E3" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_5_4121"
                        x1="62.8061"
                        y1="42.7469"
                        x2="61.9157"
                        y2="32.4701"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#B5DBFF" stop-opacity="0" />
                        <stop
                          offset="0.1734"
                          stop-color="#8FC5E9"
                          stop-opacity="0.173"
                        />
                        <stop
                          offset="0.4541"
                          stop-color="#56A4C8"
                          stop-opacity="0.454"
                        />
                        <stop
                          offset="0.6955"
                          stop-color="#2D8DB1"
                          stop-opacity="0.696"
                        />
                        <stop
                          offset="0.8853"
                          stop-color="#147EA2"
                          stop-opacity="0.885"
                        />
                        <stop offset="1" stop-color="#0B799D" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_5_4121"
                        x1="52.6621"
                        y1="10.0278"
                        x2="55.3494"
                        y2="14.3056"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF637B" />
                        <stop offset="1" stop-color="#E63950" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_5_4121"
                        x1="80.984"
                        y1="32.708"
                        x2="89.746"
                        y2="37.3836"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF637B" />
                        <stop offset="1" stop-color="#E63950" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_5_4121"
                        x1="73.0481"
                        y1="27.8614"
                        x2="79.6073"
                        y2="33.6989"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF5FF" />
                        <stop offset="1" stop-color="#D5E8FE" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_5_4121"
                        x1="57.6838"
                        y1="15.6603"
                        x2="63.6632"
                        y2="23.2144"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EDF5FF" />
                        <stop offset="1" stop-color="#D5E8FE" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_5_4121"
                        x1="64.8333"
                        y1="21.4354"
                        x2="70.314"
                        y2="27.7708"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF637B" />
                        <stop offset="1" stop-color="#E63950" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_5_4121"
                        x1="44.7729"
                        y1="31.0263"
                        x2="44.7729"
                        y2="60.9132"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#1B74B8" />
                        <stop offset="1" stop-color="#253F73" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_5_4121"
                        x1="26.1344"
                        y1="62.4441"
                        x2="32.2396"
                        y2="68.4493"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C59B6D" />
                        <stop offset="1" stop-color="#A57C52" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_5_4121"
                        x1="28.8978"
                        y1="66.4603"
                        x2="32.5243"
                        y2="62.8932"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8C6239" stop-opacity="0" />
                        <stop
                          offset="0.5198"
                          stop-color="#734A23"
                          stop-opacity="0.52"
                        />
                        <stop offset="1" stop-color="#603813" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_5_4121"
                        x1="80.6201"
                        y1="62.4441"
                        x2="74.5149"
                        y2="68.4493"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C59B6D" />
                        <stop offset="1" stop-color="#A57C52" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_5_4121"
                        x1="77.8618"
                        y1="66.4602"
                        x2="74.2353"
                        y2="62.8932"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8C6239" stop-opacity="0" />
                        <stop
                          offset="0.5198"
                          stop-color="#734A23"
                          stop-opacity="0.52"
                        />
                        <stop offset="1" stop-color="#603813" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_5_4121"
                        x1="53.9068"
                        y1="55.6882"
                        x2="53.9068"
                        y2="64.3247"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C59B6D" />
                        <stop offset="1" stop-color="#A57C52" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_5_4121"
                        x1="26.2661"
                        y1="46.9623"
                        x2="20.1609"
                        y2="52.9675"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C59B6D" />
                        <stop offset="1" stop-color="#A57C52" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_5_4121"
                        x1="64.5976"
                        y1="73.2365"
                        x2="67.5328"
                        y2="84.1182"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDECF" />
                        <stop offset="0.3591" stop-color="#FDC5B2" />
                        <stop offset="0.7611" stop-color="#FBAE98" />
                        <stop offset="1" stop-color="#FAA68E" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_5_4121"
                        x1="20.2536"
                        y1="67.3761"
                        x2="61.5994"
                        y2="91.8509"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFDECF" />
                        <stop offset="1" stop-color="#FAA68E" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_5_4121"
                        x1="47.8415"
                        y1="71.768"
                        x2="34.4122"
                        y2="58.1919"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FAA68E" stop-opacity="0" />
                        <stop offset="1" stop-color="#FAA68E" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_5_4121"
                        x1="48.7814"
                        y1="82.7116"
                        x2="48.7814"
                        y2="87.209"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FAA68E" stop-opacity="0" />
                        <stop offset="1" stop-color="#D07972" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="icon-content-img-content-name">
                  {" "}
                  Holiday Packages{" "}
                </div>
              </div>
            </Link>

            <Link to="/bus" style={{ textDecoration: "none" }}>
              <div className="icon-content-img-content">
                <div className="icon-content-img-content-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="89"
                    height="88"
                    viewBox="0 0 89 88"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_5_4150)">
                      <path
                        d="M4.43703 29.7174H3.05664V28.8121C3.05664 27.3956 4.2091 26.2432 5.62572 26.2432H14.2458V27.6236H5.62555C4.97021 27.6236 4.43686 28.1567 4.43686 28.8121V29.7174H4.43703Z"
                        fill="url(#paint0_linear_5_4150)"
                      />
                      <path
                        d="M3.74738 34.4375C3.14864 34.4375 2.66309 33.9521 2.66309 33.3532V29.1125C2.66309 28.5137 3.14847 28.0282 3.74738 28.0282C4.3463 28.0282 4.83168 28.5135 4.83168 29.1125V33.3532C4.83168 33.9521 4.34613 34.4375 3.74738 34.4375Z"
                        fill="url(#paint1_linear_5_4150)"
                      />
                      <path
                        d="M55.1785 25.2291H28.7871V23.3681C28.7871 22.5535 29.4475 21.8932 30.2621 21.8932H53.7035C54.5181 21.8932 55.1785 22.5535 55.1785 23.3681V25.2291Z"
                        fill="url(#paint2_linear_5_4150)"
                      />
                      <path
                        d="M81.395 23.3472H16.8803C10.7482 23.3472 5.71841 28.2285 5.56053 34.3585C5.51101 36.2774 5.3728 37.7204 4.45259 38.1123C3.36225 38.612 2.66309 39.7013 2.66309 40.9007V58.2249H85.4428V27.3951C85.4428 25.1595 83.6305 23.3472 81.395 23.3472Z"
                        fill="url(#paint3_linear_5_4150)"
                      />
                      <path
                        d="M2.66309 41.1927H85.4428V58.2248H2.66309V41.1927Z"
                        fill="url(#paint4_linear_5_4150)"
                      />
                      <path
                        d="M28.7871 44.2573H85.4401V47.3216H28.7871V44.2573Z"
                        fill="url(#paint5_linear_5_4150)"
                      />
                      <path
                        d="M28.7872 26.1098H19.5468C13.4146 26.1098 8.38497 30.991 8.22709 37.121C8.17757 39.0399 8.22709 58.2251 8.22709 58.2251H28.7872V26.1098Z"
                        fill="url(#paint6_linear_5_4150)"
                      />
                      <path
                        d="M28.7877 58.2243H6.98145C6.98145 52.2025 11.8629 47.3211 17.8846 47.3211C18.916 47.3211 19.915 47.464 20.8623 47.7337C25.4373 49.0288 28.7877 53.2354 28.7877 58.2243Z"
                        fill="url(#paint7_linear_5_4150)"
                      />
                      <path
                        d="M84.5924 58.2246H62.7861C62.7861 52.2028 67.6675 47.3214 73.6893 47.3214C74.7207 47.3214 75.7197 47.4643 76.667 47.734C81.242 49.0291 84.5924 53.2357 84.5924 58.2246Z"
                        fill="url(#paint8_linear_5_4150)"
                      />
                      <path
                        d="M5.17676 54.966H83.4179V58.6537H5.17676V54.966Z"
                        fill="url(#paint9_linear_5_4150)"
                      />
                      <path
                        d="M17.8848 66.107C22.2378 66.107 25.7667 62.5782 25.7667 58.2251C25.7667 53.8721 22.2378 50.3433 17.8848 50.3433C13.5318 50.3433 10.0029 53.8721 10.0029 58.2251C10.0029 62.5782 13.5318 66.107 17.8848 66.107Z"
                        fill="url(#paint10_radial_5_4150)"
                      />
                      <path
                        d="M17.8829 63.3228C20.6984 63.3228 22.9807 61.0405 22.9807 58.2251C22.9807 55.4096 20.6984 53.1273 17.8829 53.1273C15.0675 53.1273 12.7852 55.4096 12.7852 58.2251C12.7852 61.0405 15.0675 63.3228 17.8829 63.3228Z"
                        fill="url(#paint11_linear_5_4150)"
                      />
                      <path
                        d="M17.8831 62.8569C20.4413 62.8569 22.5151 60.7831 22.5151 58.2249C22.5151 55.6666 20.4413 53.5928 17.8831 53.5928C15.3248 53.5928 13.251 55.6666 13.251 58.2249C13.251 60.7831 15.3248 62.8569 17.8831 62.8569Z"
                        fill="url(#paint12_linear_5_4150)"
                      />
                      <path
                        d="M17.883 60.9167C19.3695 60.9167 20.5746 59.7116 20.5746 58.2251C20.5746 56.7386 19.3695 55.5335 17.883 55.5335C16.3965 55.5335 15.1914 56.7386 15.1914 58.2251C15.1914 59.7116 16.3965 60.9167 17.883 60.9167Z"
                        fill="url(#paint13_linear_5_4150)"
                      />
                      <path
                        d="M22.048 60.2577L19.0211 57.2309C18.7442 56.9146 18.3385 56.7139 17.885 56.7139C17.0504 56.7139 16.374 57.3905 16.374 58.2249C16.374 58.6784 16.5747 59.0841 16.891 59.361L19.9178 62.3879C20.8432 61.9353 21.5952 61.1831 22.048 60.2577Z"
                        fill="url(#paint14_linear_5_4150)"
                      />
                      <path
                        d="M17.885 59.7361C18.7195 59.7361 19.396 59.0596 19.396 58.2251C19.396 57.3906 18.7195 56.7141 17.885 56.7141C17.0505 56.7141 16.374 57.3906 16.374 58.2251C16.374 59.0596 17.0505 59.7361 17.885 59.7361Z"
                        fill="url(#paint15_linear_5_4150)"
                      />
                      <path
                        d="M17.8836 55.1212C18.1796 55.1212 18.4195 54.8812 18.4195 54.5853C18.4195 54.2893 18.1796 54.0493 17.8836 54.0493C17.5876 54.0493 17.3477 54.2893 17.3477 54.5853C17.3477 54.8812 17.5876 55.1212 17.8836 55.1212Z"
                        fill="url(#paint16_linear_5_4150)"
                      />
                      <path
                        d="M17.8836 62.4008C18.1796 62.4008 18.4195 62.1609 18.4195 61.8649C18.4195 61.5689 18.1796 61.3289 17.8836 61.3289C17.5876 61.3289 17.3477 61.5689 17.3477 61.8649C17.3477 62.1609 17.5876 62.4008 17.8836 62.4008Z"
                        fill="url(#paint17_linear_5_4150)"
                      />
                      <path
                        d="M21.5242 58.7611C21.8202 58.7611 22.0602 58.5211 22.0602 58.2251C22.0602 57.9291 21.8202 57.6892 21.5242 57.6892C21.2282 57.6892 20.9883 57.9291 20.9883 58.2251C20.9883 58.5211 21.2282 58.7611 21.5242 58.7611Z"
                        fill="url(#paint18_linear_5_4150)"
                      />
                      <path
                        d="M14.2449 58.761C14.5409 58.761 14.7809 58.5211 14.7809 58.2251C14.7809 57.9291 14.5409 57.6891 14.2449 57.6891C13.9489 57.6891 13.709 57.9291 13.709 58.2251C13.709 58.5211 13.9489 58.761 14.2449 58.761Z"
                        fill="url(#paint19_linear_5_4150)"
                      />
                      <path
                        d="M20.4578 56.1865C20.7538 56.1865 20.9937 55.9465 20.9937 55.6505C20.9937 55.3545 20.7538 55.1146 20.4578 55.1146C20.1618 55.1146 19.9219 55.3545 19.9219 55.6505C19.9219 55.9465 20.1618 56.1865 20.4578 56.1865Z"
                        fill="url(#paint20_linear_5_4150)"
                      />
                      <path
                        d="M15.3084 61.3355C15.6044 61.3355 15.8443 61.0956 15.8443 60.7996C15.8443 60.5036 15.6044 60.2637 15.3084 60.2637C15.0124 60.2637 14.7725 60.5036 14.7725 60.7996C14.7725 61.0956 15.0124 61.3355 15.3084 61.3355Z"
                        fill="url(#paint21_linear_5_4150)"
                      />
                      <path
                        d="M15.3084 56.1865C15.6044 56.1865 15.8443 55.9465 15.8443 55.6505C15.8443 55.3545 15.6044 55.1146 15.3084 55.1146C15.0124 55.1146 14.7725 55.3545 14.7725 55.6505C14.7725 55.9465 15.0124 56.1865 15.3084 56.1865Z"
                        fill="url(#paint22_linear_5_4150)"
                      />
                      <path
                        d="M20.4578 61.3355C20.7538 61.3355 20.9937 61.0956 20.9937 60.7996C20.9937 60.5036 20.7538 60.2637 20.4578 60.2637C20.1618 60.2637 19.9219 60.5036 19.9219 60.7996C19.9219 61.0956 20.1618 61.3355 20.4578 61.3355Z"
                        fill="url(#paint23_linear_5_4150)"
                      />
                      <path
                        d="M73.6905 66.107C78.0435 66.107 81.5723 62.5782 81.5723 58.2251C81.5723 53.8721 78.0435 50.3433 73.6905 50.3433C69.3374 50.3433 65.8086 53.8721 65.8086 58.2251C65.8086 62.5782 69.3374 66.107 73.6905 66.107Z"
                        fill="url(#paint24_radial_5_4150)"
                      />
                      <path
                        d="M73.6886 63.3228C76.504 63.3228 78.7864 61.0405 78.7864 58.2251C78.7864 55.4096 76.504 53.1273 73.6886 53.1273C70.8732 53.1273 68.5908 55.4096 68.5908 58.2251C68.5908 61.0405 70.8732 63.3228 73.6886 63.3228Z"
                        fill="url(#paint25_linear_5_4150)"
                      />
                      <path
                        d="M73.6887 62.8569C76.2469 62.8569 78.3208 60.7831 78.3208 58.2249C78.3208 55.6666 76.2469 53.5928 73.6887 53.5928C71.1305 53.5928 69.0566 55.6666 69.0566 58.2249C69.0566 60.7831 71.1305 62.8569 73.6887 62.8569Z"
                        fill="url(#paint26_linear_5_4150)"
                      />
                      <path
                        d="M73.6887 60.9167C75.1752 60.9167 76.3803 59.7116 76.3803 58.2251C76.3803 56.7386 75.1752 55.5335 73.6887 55.5335C72.2021 55.5335 70.9971 56.7386 70.9971 58.2251C70.9971 59.7116 72.2021 60.9167 73.6887 60.9167Z"
                        fill="url(#paint27_linear_5_4150)"
                      />
                      <path
                        d="M77.8528 60.2572L74.826 57.2303C74.549 56.914 74.1434 56.7134 73.6899 56.7134C72.8553 56.7134 72.1787 57.3899 72.1787 58.2244C72.1787 58.6778 72.3794 59.0835 72.6957 59.3604L75.7225 62.3873C76.6481 61.9347 77.4 61.1826 77.8528 60.2572Z"
                        fill="url(#paint28_linear_5_4150)"
                      />
                      <path
                        d="M73.6897 59.7363C74.5242 59.7363 75.2007 59.0598 75.2007 58.2253C75.2007 57.3908 74.5242 56.7143 73.6897 56.7143C72.8552 56.7143 72.1787 57.3908 72.1787 58.2253C72.1787 59.0598 72.8552 59.7363 73.6897 59.7363Z"
                        fill="url(#paint29_linear_5_4150)"
                      />
                      <path
                        d="M73.6893 55.1212C73.9852 55.1212 74.2252 54.8812 74.2252 54.5853C74.2252 54.2893 73.9852 54.0493 73.6893 54.0493C73.3933 54.0493 73.1533 54.2893 73.1533 54.5853C73.1533 54.8812 73.3933 55.1212 73.6893 55.1212Z"
                        fill="url(#paint30_linear_5_4150)"
                      />
                      <path
                        d="M73.6893 62.4008C73.9852 62.4008 74.2252 62.1609 74.2252 61.8649C74.2252 61.5689 73.9852 61.3289 73.6893 61.3289C73.3933 61.3289 73.1533 61.5689 73.1533 61.8649C73.1533 62.1609 73.3933 62.4008 73.6893 62.4008Z"
                        fill="url(#paint31_linear_5_4150)"
                      />
                      <path
                        d="M77.3299 58.7611C77.6259 58.7611 77.8658 58.5211 77.8658 58.2251C77.8658 57.9291 77.6259 57.6892 77.3299 57.6892C77.0339 57.6892 76.7939 57.9291 76.7939 58.2251C76.7939 58.5211 77.0339 58.7611 77.3299 58.7611Z"
                        fill="url(#paint32_linear_5_4150)"
                      />
                      <path
                        d="M70.0506 58.761C70.3466 58.761 70.5865 58.5211 70.5865 58.2251C70.5865 57.9291 70.3466 57.6891 70.0506 57.6891C69.7546 57.6891 69.5146 57.9291 69.5146 58.2251C69.5146 58.5211 69.7546 58.761 70.0506 58.761Z"
                        fill="url(#paint33_linear_5_4150)"
                      />
                      <path
                        d="M76.2635 56.187C76.5595 56.187 76.7994 55.947 76.7994 55.651C76.7994 55.355 76.5595 55.1151 76.2635 55.1151C75.9675 55.1151 75.7275 55.355 75.7275 55.651C75.7275 55.947 75.9675 56.187 76.2635 56.187Z"
                        fill="url(#paint34_linear_5_4150)"
                      />
                      <path
                        d="M71.1141 61.3355C71.4101 61.3355 71.65 61.0956 71.65 60.7996C71.65 60.5036 71.4101 60.2637 71.1141 60.2637C70.8181 60.2637 70.5781 60.5036 70.5781 60.7996C70.5781 61.0956 70.8181 61.3355 71.1141 61.3355Z"
                        fill="url(#paint35_linear_5_4150)"
                      />
                      <path
                        d="M71.1141 56.1865C71.4101 56.1865 71.65 55.9465 71.65 55.6505C71.65 55.3545 71.4101 55.1146 71.1141 55.1146C70.8181 55.1146 70.5781 55.3545 70.5781 55.6505C70.5781 55.9465 70.8181 56.1865 71.1141 56.1865Z"
                        fill="url(#paint36_linear_5_4150)"
                      />
                      <path
                        d="M76.2635 61.3351C76.5595 61.3351 76.7994 61.0952 76.7994 60.7992C76.7994 60.5032 76.5595 60.2632 76.2635 60.2632C75.9675 60.2632 75.7275 60.5032 75.7275 60.7992C75.7275 61.0952 75.9675 61.3351 76.2635 61.3351Z"
                        fill="url(#paint37_linear_5_4150)"
                      />
                      <path
                        d="M85.504 49.5564H84.2338C83.3959 49.5564 82.7168 50.2355 82.7168 51.0736V54.0487H85.504V49.5564Z"
                        fill="url(#paint38_linear_5_4150)"
                      />
                      <path
                        d="M3.81502 49.5564H2.66309V54.0487H5.33225V51.0736C5.33207 50.2357 4.65292 49.5564 3.81502 49.5564Z"
                        fill="url(#paint39_linear_5_4150)"
                      />
                      <path
                        d="M7.15125 59.5384H2.50778C1.39898 59.5384 0.5 58.6394 0.5 57.5306V55.1477C0.5 54.0387 1.39898 53.1399 2.50778 53.1399H7.15125C8.26005 53.1399 9.15903 54.0389 9.15903 55.1477V57.5306C9.15903 58.6394 8.26005 59.5384 7.15125 59.5384Z"
                        fill="url(#paint40_linear_5_4150)"
                      />
                      <path
                        d="M86.4906 59.5383H84.206C83.0972 59.5383 82.1982 58.6393 82.1982 57.5305V55.1476C82.1982 54.0386 83.0972 53.1398 84.206 53.1398H86.4906C87.5994 53.1398 88.4984 54.0388 88.4984 55.1476V57.5305C88.4984 58.6393 87.5994 59.5383 86.4906 59.5383Z"
                        fill="url(#paint41_linear_5_4150)"
                      />
                      <path
                        d="M81.5709 27.9036C81.5709 26.9128 80.7677 26.1098 79.7769 26.1098H28.7871H22.0468H19.5468C13.4146 26.1098 8.38493 30.991 8.22705 37.121C8.19633 38.315 8.20375 40.797 8.21393 42.5016C8.2198 43.4882 9.02112 44.2847 10.0078 44.2847H19.0592C21.5832 44.2847 24.0167 43.3441 25.8845 41.6464C27.7523 39.9487 30.1858 39.0082 32.7099 39.0082H79.7771C80.7679 39.0082 81.5711 38.2049 81.5711 37.2143L81.5709 27.9036Z"
                        fill="url(#paint42_linear_5_4150)"
                      />
                      <path
                        d="M8.22642 37.1217C8.21485 37.5736 8.20864 38.98 8.20605 40.8669C8.20761 41.4435 8.21037 42.0057 8.2133 42.5016C8.21917 43.4882 9.02049 44.2849 10.0071 44.2849H19.0585C21.5826 44.2849 24.016 43.3443 25.8839 41.6466C26.7461 40.8629 27.73 40.2429 28.7867 39.7998V26.1098H19.5463C15.1389 26.1098 11.3009 28.6314 9.43202 32.326C9.10693 32.9686 8.84155 33.6466 8.64295 34.353C8.54373 34.7062 8.46108 35.0665 8.3962 35.433C8.36376 35.6162 8.33581 35.801 8.31217 35.9872C8.26507 36.3597 8.23625 36.7379 8.22642 37.121V37.1217Z"
                        fill="url(#paint43_linear_5_4150)"
                      />
                      <path
                        d="M41.9837 26.1091V39.0088H32.7091C31.4478 39.0088 30.2089 39.2435 29.0511 39.6921C28.9631 39.7266 28.8734 39.7612 28.7871 39.7991V26.1091H41.9837Z"
                        fill="url(#paint44_linear_5_4150)"
                      />
                      <path
                        d="M41.9824 26.1089H55.1772V39.0087H41.9824V26.1089Z"
                        fill="url(#paint45_linear_5_4150)"
                      />
                      <path
                        d="M55.1777 26.1089H68.3743V39.0087H55.1777V26.1089Z"
                        fill="url(#paint46_linear_5_4150)"
                      />
                      <path
                        d="M81.5725 27.9034V37.2141C81.5725 38.2046 80.7685 39.0087 79.778 39.0087H68.376V26.1089H79.778C80.7685 26.1089 81.5725 26.913 81.5725 27.9034Z"
                        fill="url(#paint47_linear_5_4150)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_5_4150"
                        x1="6.61339"
                        y1="25.0163"
                        x2="10.2802"
                        y2="30.3497"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.2231" stop-color="#FB3F6C" />
                        <stop offset="0.6075" stop-color="#F12357" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5_4150"
                        x1="3.26287"
                        y1="31.2329"
                        x2="4.9906"
                        y2="31.2329"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_5_4150"
                        x1="40.8705"
                        y1="21.3286"
                        x2="43.3492"
                        y2="27.6346"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.2231" stop-color="#FB3F6C" />
                        <stop offset="0.6075" stop-color="#F12357" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_5_4150"
                        x1="39.6212"
                        y1="31.1501"
                        x2="51.3545"
                        y2="61.0011"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.2231" stop-color="#FB3F6C" />
                        <stop offset="0.6075" stop-color="#F12357" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_5_4150"
                        x1="42.1176"
                        y1="41.5806"
                        x2="47.2941"
                        y2="63.3218"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.2231" stop-color="#FB3F6C" />
                        <stop offset="0.6075" stop-color="#F12357" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_5_4150"
                        x1="56.2417"
                        y1="42.1273"
                        x2="58.5739"
                        y2="51.9224"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_5_4150"
                        x1="14.492"
                        y1="27.736"
                        x2="25.5296"
                        y2="67.4078"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.2231" stop-color="#FB3F6C" />
                        <stop offset="0.6075" stop-color="#F12357" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_5_4150"
                        x1="17.8846"
                        y1="45.148"
                        x2="17.8846"
                        y2="68.5189"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A34A9E" stop-opacity="0" />
                        <stop offset="1" stop-color="#343168" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_5_4150"
                        x1="73.6893"
                        y1="45.1483"
                        x2="73.6893"
                        y2="68.5192"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A34A9E" stop-opacity="0" />
                        <stop offset="1" stop-color="#343168" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_5_4150"
                        x1="44.2972"
                        y1="55.2157"
                        x2="44.2972"
                        y2="59.8857"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.2231" stop-color="#FB3F6C" />
                        <stop offset="0.6075" stop-color="#F12357" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <radialGradient
                        id="paint10_radial_5_4150"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(16.7869 55.9508) scale(9.79457)"
                      >
                        <stop stop-color="#A34A9E" />
                        <stop offset="0.1551" stop-color="#9B489A" />
                        <stop offset="0.4019" stop-color="#84438F" />
                        <stop offset="0.7073" stop-color="#5E3B7D" />
                        <stop offset="1" stop-color="#343168" />
                      </radialGradient>
                      <linearGradient
                        id="paint11_linear_5_4150"
                        x1="23.7196"
                        y1="64.0617"
                        x2="12.9063"
                        y2="53.2484"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A34A9E" />
                        <stop offset="1" stop-color="#343168" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_5_4150"
                        x1="12.5794"
                        y1="52.9212"
                        x2="22.4052"
                        y2="62.747"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_5_4150"
                        x1="20.9647"
                        y1="61.3068"
                        x2="15.2554"
                        y2="55.5974"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_5_4150"
                        x1="21.8195"
                        y1="62.1594"
                        x2="17.3909"
                        y2="57.7308"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A2E3E9" stop-opacity="0" />
                        <stop offset="1" stop-color="#518CD2" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_5_4150"
                        x1="17.5713"
                        y1="57.9114"
                        x2="19.1653"
                        y2="59.5054"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_5_4150"
                        x1="17.6025"
                        y1="54.3042"
                        x2="18.263"
                        y2="54.9645"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_5_4150"
                        x1="17.6025"
                        y1="61.5838"
                        x2="18.263"
                        y2="62.2443"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_5_4150"
                        x1="21.8053"
                        y1="57.944"
                        x2="21.145"
                        y2="58.6044"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_5_4150"
                        x1="14.526"
                        y1="57.944"
                        x2="13.8655"
                        y2="58.6043"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint20_linear_5_4150"
                        x1="20.4443"
                        y1="55.2572"
                        x2="20.4444"
                        y2="56.1911"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint21_linear_5_4150"
                        x1="15.2957"
                        y1="60.4055"
                        x2="15.2957"
                        y2="61.3395"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint22_linear_5_4150"
                        x1="15.2774"
                        y1="55.2572"
                        x2="15.2775"
                        y2="56.1911"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint23_linear_5_4150"
                        x1="20.4261"
                        y1="60.4056"
                        x2="20.4261"
                        y2="61.3393"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <radialGradient
                        id="paint24_radial_5_4150"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(72.5925 55.9508) scale(9.79457)"
                      >
                        <stop stop-color="#A34A9E" />
                        <stop offset="0.1551" stop-color="#9B489A" />
                        <stop offset="0.4019" stop-color="#84438F" />
                        <stop offset="0.7073" stop-color="#5E3B7D" />
                        <stop offset="1" stop-color="#343168" />
                      </radialGradient>
                      <linearGradient
                        id="paint25_linear_5_4150"
                        x1="79.5253"
                        y1="64.0617"
                        x2="68.7121"
                        y2="53.2484"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A34A9E" />
                        <stop offset="1" stop-color="#343168" />
                      </linearGradient>
                      <linearGradient
                        id="paint26_linear_5_4150"
                        x1="68.3853"
                        y1="52.9212"
                        x2="78.2109"
                        y2="62.747"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint27_linear_5_4150"
                        x1="76.7706"
                        y1="61.3068"
                        x2="71.0611"
                        y2="55.5974"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint28_linear_5_4150"
                        x1="77.6244"
                        y1="62.1589"
                        x2="73.1957"
                        y2="57.7302"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A2E3E9" stop-opacity="0" />
                        <stop offset="1" stop-color="#518CD2" />
                      </linearGradient>
                      <linearGradient
                        id="paint29_linear_5_4150"
                        x1="73.376"
                        y1="57.9116"
                        x2="74.9702"
                        y2="59.5056"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint30_linear_5_4150"
                        x1="73.4083"
                        y1="54.3042"
                        x2="74.0687"
                        y2="54.9645"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint31_linear_5_4150"
                        x1="73.4083"
                        y1="61.5838"
                        x2="74.0687"
                        y2="62.2443"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint32_linear_5_4150"
                        x1="77.6108"
                        y1="57.944"
                        x2="76.9504"
                        y2="58.6044"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint33_linear_5_4150"
                        x1="70.3317"
                        y1="57.944"
                        x2="69.6713"
                        y2="58.6043"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint34_linear_5_4150"
                        x1="76.2424"
                        y1="55.2577"
                        x2="76.2422"
                        y2="56.1916"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint35_linear_5_4150"
                        x1="71.0934"
                        y1="60.4055"
                        x2="71.0935"
                        y2="61.3393"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint36_linear_5_4150"
                        x1="71.075"
                        y1="55.2572"
                        x2="71.0751"
                        y2="56.1911"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint37_linear_5_4150"
                        x1="76.2239"
                        y1="60.4052"
                        x2="76.2239"
                        y2="61.3389"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint38_linear_5_4150"
                        x1="82.4804"
                        y1="49.8404"
                        x2="85.1325"
                        y2="53.0329"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFE548" />
                        <stop offset="0.1758" stop-color="#FFDE50" />
                        <stop offset="0.4446" stop-color="#FFCA65" />
                        <stop offset="0.7709" stop-color="#FFAA87" />
                        <stop offset="1" stop-color="#FF90A4" />
                      </linearGradient>
                      <linearGradient
                        id="paint39_linear_5_4150"
                        x1="3.60469"
                        y1="49.1883"
                        x2="4.29661"
                        y2="55.0479"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFE548" />
                        <stop offset="0.1758" stop-color="#FFDE50" />
                        <stop offset="0.4446" stop-color="#FFCA65" />
                        <stop offset="0.7709" stop-color="#FFAA87" />
                        <stop offset="1" stop-color="#FF90A4" />
                      </linearGradient>
                      <linearGradient
                        id="paint40_linear_5_4150"
                        x1="4.8296"
                        y1="53.1299"
                        x2="4.8296"
                        y2="57.7451"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint41_linear_5_4150"
                        x1="85.3483"
                        y1="53.1298"
                        x2="85.3483"
                        y2="57.745"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#D4F7FF" />
                        <stop offset="1" stop-color="#A2E3E9" />
                      </linearGradient>
                      <linearGradient
                        id="paint42_linear_5_4150"
                        x1="40.7575"
                        y1="20.3361"
                        x2="50.2358"
                        y2="54.4032"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint43_linear_5_4150"
                        x1="15.493"
                        y1="30.2058"
                        x2="24.3506"
                        y2="43.0893"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint44_linear_5_4150"
                        x1="33.911"
                        y1="30.2898"
                        x2="38.6471"
                        y2="38.8478"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint45_linear_5_4150"
                        x1="47.2728"
                        y1="30.1969"
                        x2="52.0087"
                        y2="38.7548"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint46_linear_5_4150"
                        x1="60.4689"
                        y1="30.1969"
                        x2="65.2051"
                        y2="38.755"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <linearGradient
                        id="paint47_linear_5_4150"
                        x1="73.2769"
                        y1="30.1571"
                        x2="77.8403"
                        y2="38.4032"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#4F4A72" />
                        <stop offset="1" stop-color="#3B395F" />
                      </linearGradient>
                      <clipPath id="clip0_5_4150">
                        <rect
                          width="88"
                          height="88"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="icon-content-img-content-name">Buses</div>
              </div>
            </Link>

            <Link to="/visa" style={{ textDecoration: "none" }}>
              <div className="icon-content-img-content">
                <div className="icon-content-img-content-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="89"
                    height="88"
                    viewBox="0 0 89 88"
                    fill="none"
                  >
                    <path
                      d="M36.7362 4.00011H58.4702C60.1889 4.00011 61.5952 5.40633 61.5952 7.12505V25.406C61.5952 27.1247 60.1889 28.5309 58.4702 28.5309C60.1889 28.5309 61.5952 29.9372 61.5952 31.6559V70.4521C61.5952 72.1708 60.1889 73.577 58.4702 73.577H36.7362L31.252 28.5309L36.7362 4.00011Z"
                      fill="url(#paint0_linear_5_4203)"
                    />
                    <path
                      d="M31.252 28.5155L33.3144 45.3902H61.6108V31.6404C61.6108 29.9217 60.2046 28.5155 58.4859 28.5155H58.5015H31.252Z"
                      fill="url(#paint1_linear_5_4203)"
                    />
                    <path
                      d="M36.7352 4.00029H31.2509C29.5322 4.00029 28.126 5.40652 28.126 7.12524V25.3905C28.126 27.1093 29.5322 28.5155 31.2509 28.5155C29.5322 28.5155 28.126 29.9217 28.126 31.6404V70.4366C28.126 72.1553 29.5322 73.5616 31.2509 73.5616H36.7352V4.00029Z"
                      fill="url(#paint2_linear_5_4203)"
                    />
                    <path
                      d="M36.7352 45.3902V28.5155H31.2509C29.5322 28.5155 28.126 29.9217 28.126 31.6404V45.3902H36.7352Z"
                      fill="url(#paint3_linear_5_4203)"
                    />
                    <path
                      d="M44.8545 73.5614H58.4636C60.1824 73.5614 61.5886 72.1552 61.5886 70.4364V31.6402C61.5886 29.9215 60.1824 28.5153 58.4636 28.5153C60.1824 28.5153 61.5886 27.1091 61.5886 25.3904V7.12505C61.5886 5.40633 60.1824 4.00011 58.4636 4.00011H44.8545V73.5614Z"
                      fill="url(#paint4_linear_5_4203)"
                    />
                    <path
                      d="M32.4209 28.5151C32.4209 28.062 32.7803 27.7026 33.2334 27.7026H34.749C35.2021 27.7026 35.5615 28.062 35.5615 28.5151C35.5615 28.9682 35.2021 29.3276 34.749 29.3276H33.2334C32.7959 29.3432 32.4209 28.9682 32.4209 28.5151Z"
                      fill="url(#paint5_linear_5_4203)"
                    />
                    <path
                      d="M37.8574 28.5151C37.8574 28.062 38.2168 27.7026 38.6699 27.7026H40.1855C40.6386 27.7026 40.998 28.062 40.998 28.5151C40.998 28.9682 40.6386 29.3276 40.1855 29.3276H38.6699C38.2168 29.3432 37.8574 28.9682 37.8574 28.5151Z"
                      fill="url(#paint6_linear_5_4203)"
                    />
                    <path
                      d="M43.2812 28.5151C43.2812 28.062 43.6406 27.7026 44.0937 27.7026H45.6093C46.0625 27.7026 46.4218 28.062 46.4218 28.5151C46.4218 28.9682 46.0625 29.3276 45.6093 29.3276H44.0937C43.6562 29.3432 43.2812 28.9682 43.2812 28.5151Z"
                      fill="url(#paint7_linear_5_4203)"
                    />
                    <path
                      d="M48.7139 28.5151C48.7139 28.062 49.0732 27.7026 49.5264 27.7026H51.042C51.4951 27.7026 51.8544 28.062 51.8544 28.5151C51.8544 28.9682 51.4951 29.3276 51.042 29.3276H49.5264C49.0732 29.3432 48.7139 28.9682 48.7139 28.5151Z"
                      fill="url(#paint8_linear_5_4203)"
                    />
                    <path
                      d="M54.1387 28.5151C54.1387 28.062 54.498 27.7026 54.9512 27.7026H56.4668C56.9199 27.7026 57.2792 28.062 57.2792 28.5151C57.2792 28.9682 56.9199 29.3276 56.4668 29.3276H54.9512C54.5137 29.3432 54.1387 28.9682 54.1387 28.5151Z"
                      fill="url(#paint9_linear_5_4203)"
                    />
                    <path
                      d="M41.001 22.9681V9.5465C41.001 8.92151 41.5166 8.4059 42.1416 8.4059C42.7666 8.4059 43.2822 8.92151 43.2822 9.5465V22.9681C43.2822 23.5931 42.7666 24.1087 42.1416 24.1087C41.5166 24.1087 41.001 23.6088 41.001 22.9681Z"
                      fill="url(#paint10_linear_5_4203)"
                    />
                    <path
                      d="M46.002 22.9681V9.5465C46.002 8.92151 46.5176 8.4059 47.1426 8.4059C47.7675 8.4059 48.2832 8.92151 48.2832 9.5465V22.9681C48.2832 23.5931 47.7675 24.1087 47.1426 24.1087C46.5176 24.1087 46.002 23.6088 46.002 22.9681Z"
                      fill="url(#paint11_linear_5_4203)"
                    />
                    <path
                      d="M51 22.9683V15.9841C51 15.3591 51.5156 14.8435 52.1406 14.8435C52.7656 14.8435 53.2812 15.3591 53.2812 15.9841V22.9683C53.2812 23.5933 52.7656 24.109 52.1406 24.109C51.5156 24.109 51 23.609 51 22.9683Z"
                      fill="url(#paint12_linear_5_4203)"
                    />
                    <path
                      d="M25.9208 11.2505H63.7951C66.7951 11.2505 69.2169 13.6723 69.2169 16.6723V78.5774C69.2169 81.5774 66.7951 83.9992 63.7951 83.9992H25.9208C22.9209 83.9992 20.499 81.5774 20.499 78.5774V16.6723C20.499 13.6723 22.9209 11.2505 25.9208 11.2505Z"
                      fill="url(#paint13_linear_5_4203)"
                    />
                    <path
                      d="M63.7916 11.2505H42.6514V83.9992H63.8072C66.8072 83.9992 69.229 81.5774 69.229 78.5774V16.6723C69.2134 13.6723 66.7916 11.2505 63.7916 11.2505Z"
                      fill="url(#paint14_linear_5_4203)"
                    />
                    <path
                      d="M57.0298 24.7815L32.6865 49.1404L66.7015 83.1555C68.2171 82.1867 69.2328 80.4993 69.2328 78.5774V36.9688L57.0298 24.7815Z"
                      fill="url(#paint15_linear_5_4203)"
                    />
                    <path
                      d="M31.5136 47.0004C27.9667 48.7816 24.873 47.7504 24.873 47.7504L39.3259 62.2033H47.357V47.0004H31.5136Z"
                      fill="url(#paint16_linear_5_4203)"
                    />
                    <path
                      d="M20.499 45.9851V78.5782C20.499 81.5782 22.9209 84 25.9208 84H63.7951C66.7951 84 69.2169 81.5782 69.2169 78.5782V45.9851H20.499Z"
                      fill="url(#paint17_linear_5_4203)"
                    />
                    <path
                      d="M26.6327 39.1245L30.9295 43.4213V47.14C30.9295 47.14 26.9296 48.9056 25.164 47.2963C23.3984 45.6869 26.6327 39.1245 26.6327 39.1245Z"
                      fill="url(#paint18_linear_5_4203)"
                    />
                    <path
                      d="M44.8757 54.1713C54.3852 54.1713 62.0941 46.4623 62.0941 36.9528C62.0941 27.4433 54.3852 19.7344 44.8757 19.7344C35.3662 19.7344 27.6572 27.4433 27.6572 36.9528C27.6572 46.4623 35.3662 54.1713 44.8757 54.1713Z"
                      fill="url(#paint19_linear_5_4203)"
                    />
                    <path
                      d="M44.8767 54.1712C51.6248 54.1712 57.0953 46.4622 57.0953 36.9527C57.0953 27.4432 51.6248 19.7343 44.8767 19.7343C38.1286 19.7343 32.6582 27.4432 32.6582 36.9527C32.6582 46.4622 38.1286 54.1712 44.8767 54.1712Z"
                      fill="url(#paint20_linear_5_4203)"
                    />
                    <path
                      d="M44.8769 54.1712C47.6124 54.1712 49.8299 46.4622 49.8299 36.9527C49.8299 27.4432 47.6124 19.7343 44.8769 19.7343C42.1414 19.7343 39.9238 27.4432 39.9238 36.9527C39.9238 46.4622 42.1414 54.1712 44.8769 54.1712Z"
                      fill="url(#paint21_linear_5_4203)"
                    />
                    <path
                      d="M44.8757 49.1714C54.3852 49.1714 62.0941 43.7009 62.0941 36.9528C62.0941 30.2047 54.3852 24.7343 44.8757 24.7343C35.3662 24.7343 27.6572 30.2047 27.6572 36.9528C27.6572 43.7009 35.3662 49.1714 44.8757 49.1714Z"
                      fill="url(#paint22_linear_5_4203)"
                    />
                    <path
                      d="M44.8757 41.9059C54.3852 41.9059 62.0941 39.6883 62.0941 36.9528C62.0941 34.2173 54.3852 31.9998 44.8757 31.9998C35.3662 31.9998 27.6572 34.2173 27.6572 36.9528C27.6572 39.6883 35.3662 41.9059 44.8757 41.9059Z"
                      fill="url(#paint23_linear_5_4203)"
                    />
                    <path
                      d="M27.6572 36.9528C27.6572 46.4683 35.3758 54.1713 44.8757 54.1713C54.3911 54.1713 62.0941 46.4527 62.0941 36.9528C62.0941 35.7185 61.9535 34.4997 61.7191 33.3435H28.0322C27.7822 34.5154 27.6572 35.7185 27.6572 36.9528Z"
                      fill="url(#paint24_linear_5_4203)"
                    />
                    <path
                      d="M44.872 54.1864C54.3875 54.1864 62.0905 46.4677 62.0905 36.9679C62.0905 27.4525 54.3718 19.7495 44.872 19.7495C43.6377 19.7495 42.4189 19.8901 41.2627 20.1245V53.8114C42.4189 54.0457 43.6377 54.1864 44.872 54.1864Z"
                      fill="url(#paint25_linear_5_4203)"
                    />
                    <path
                      d="M32.6992 49.1395C39.4178 55.8582 50.3239 55.8582 57.0581 49.1395C63.7768 42.4209 63.7768 31.5149 57.0581 24.7806C56.1831 23.9056 55.23 23.14 54.2301 22.4994L30.4023 46.3115C31.0586 47.3115 31.8086 48.2646 32.6992 49.1395Z"
                      fill="url(#paint26_linear_5_4203)"
                    />
                    <path
                      d="M27.3457 60.7968H62.3763C63.0951 60.7968 63.6888 61.3906 63.6888 62.1093C63.6888 62.8281 63.0951 63.4218 62.3763 63.4218H27.3457C26.6269 63.4218 26.0332 62.8281 26.0332 62.1093C26.0332 61.3906 26.6269 60.7968 27.3457 60.7968Z"
                      fill="url(#paint27_linear_5_4203)"
                    />
                    <path
                      d="M40.8506 66.5465H48.8817C49.6004 66.5465 50.1942 67.1403 50.1942 67.859C50.1942 68.5778 49.6004 69.1715 48.8817 69.1715H40.8506C40.1318 69.1715 39.5381 68.5778 39.5381 67.859C39.5381 67.1403 40.1162 66.5465 40.8506 66.5465Z"
                      fill="url(#paint28_linear_5_4203)"
                    />
                    <path
                      d="M40.5822 40.9532C40.7384 41.1094 40.7384 41.3907 40.5509 41.5313C37.9728 43.6719 35.4104 45.4375 33.0667 46.6718C30.7073 47.9218 28.723 48.5468 27.2074 48.5468C26.223 48.5468 25.4262 48.2812 24.8949 47.7343C23.4731 46.3125 23.9106 43.3281 26.098 39.2813C26.2074 39.0938 26.4418 39.0157 26.6293 39.1251C26.7543 39.2032 26.8324 39.3282 26.8324 39.4688C26.8324 39.5313 26.8168 39.5938 26.7855 39.6563C24.8324 43.2656 24.3324 46.0625 25.4418 47.1874C26.5355 48.2812 29.1917 47.8437 32.7073 45.9843C35.0198 44.7656 37.5353 43.0313 40.0665 40.9375C40.2072 40.7969 40.4415 40.8125 40.5822 40.9532Z"
                      fill="url(#paint29_linear_5_4203)"
                    />
                    <path
                      d="M48.6309 35.7194C48.8497 35.5163 49.0528 35.3288 49.2715 35.1256C50.2715 34.1882 50.5059 32.7976 49.7872 32.0632C49.7715 32.0476 49.7715 32.0476 49.7559 32.0319C49.0215 31.3132 47.631 31.5476 46.6935 32.5476C46.4903 32.7507 46.3028 32.9694 46.0997 33.1882L42.5217 31.9382C41.8342 31.7038 41.0842 31.9851 40.7248 32.6101C40.5998 32.8288 40.6623 33.0944 40.8811 33.2351L44.1935 35.3913C43.506 36.2194 42.8498 37.0475 42.2717 37.8287L40.3186 37.1412C40.1155 37.0631 39.8811 37.1569 39.7561 37.3444L39.5998 37.6256C39.4748 37.8443 39.5373 38.11 39.7561 38.2506L41.3029 39.2506C41.2404 39.3443 41.1936 39.4381 41.1311 39.5162C40.8654 39.9381 40.8811 40.4068 41.1467 40.688C41.1467 40.688 41.1467 40.688 41.1623 40.7037C41.4279 40.9693 41.8967 40.9849 42.3342 40.7193C42.4279 40.6568 42.5217 40.6099 42.5998 40.5474L43.5998 42.0943C43.7404 42.2974 44.006 42.3599 44.2248 42.2505L44.506 42.0943C44.6935 41.9849 44.7872 41.7505 44.7091 41.5318L44.0216 39.5787C44.8185 39.0006 45.631 38.3443 46.4591 37.6568L48.6153 40.9693C48.7559 41.1724 49.0216 41.2505 49.2403 41.1255C49.8653 40.7662 50.1465 40.0006 49.9122 39.3287L48.6309 35.7194Z"
                      fill="url(#paint30_linear_5_4203)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_5_4203"
                        x1="28.2028"
                        y1="27.4602"
                        x2="48.0849"
                        y2="38.8214"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EAF6FF" />
                        <stop offset="0.2651" stop-color="#E5F3FE" />
                        <stop offset="0.5398" stop-color="#D9EDFE" />
                        <stop offset="0.8179" stop-color="#C4E3FE" />
                        <stop offset="1" stop-color="#B3DAFE" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5_4203"
                        x1="46.4236"
                        y1="32.7359"
                        x2="46.4236"
                        y2="26.5417"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8AC9FE" stop-opacity="0" />
                        <stop
                          offset="0.1291"
                          stop-color="#89C8FD"
                          stop-opacity="0.019"
                        />
                        <stop
                          offset="0.2629"
                          stop-color="#88C6FB"
                          stop-opacity="0.075"
                        />
                        <stop
                          offset="0.3989"
                          stop-color="#87C4F8"
                          stop-opacity="0.168"
                        />
                        <stop
                          offset="0.5365"
                          stop-color="#85C0F4"
                          stop-opacity="0.298"
                        />
                        <stop
                          offset="0.6753"
                          stop-color="#83BBEF"
                          stop-opacity="0.466"
                        />
                        <stop
                          offset="0.8151"
                          stop-color="#7FB5E9"
                          stop-opacity="0.672"
                        />
                        <stop
                          offset="0.9532"
                          stop-color="#7CAEE1"
                          stop-opacity="0.911"
                        />
                        <stop offset="1" stop-color="#7BACDF" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_5_4203"
                        x1="18.0312"
                        y1="32.2239"
                        x2="28.3899"
                        y2="36.5678"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4565" />
                        <stop offset="0.2377" stop-color="#F53A60" />
                        <stop offset="0.6488" stop-color="#DB1E54" />
                        <stop offset="1" stop-color="#C00148" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_5_4203"
                        x1="32.429"
                        y1="33.4413"
                        x2="32.429"
                        y2="27.6847"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#C41926" stop-opacity="0" />
                        <stop
                          offset="0.1865"
                          stop-color="#C01926"
                          stop-opacity="0.038"
                        />
                        <stop
                          offset="0.3798"
                          stop-color="#B61C26"
                          stop-opacity="0.152"
                        />
                        <stop
                          offset="0.5761"
                          stop-color="#A62126"
                          stop-opacity="0.343"
                        />
                        <stop
                          offset="0.7747"
                          stop-color="#8F2826"
                          stop-opacity="0.609"
                        />
                        <stop
                          offset="0.9732"
                          stop-color="#713126"
                          stop-opacity="0.949"
                        />
                        <stop offset="1" stop-color="#6D3326" />
                      </linearGradient>
                      <linearGradient
                        id="paint4_linear_5_4203"
                        x1="58.2314"
                        y1="38.7845"
                        x2="61.7958"
                        y2="38.7845"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8AC9FE" stop-opacity="0" />
                        <stop
                          offset="0.1291"
                          stop-color="#89C8FD"
                          stop-opacity="0.019"
                        />
                        <stop
                          offset="0.2629"
                          stop-color="#88C6FB"
                          stop-opacity="0.075"
                        />
                        <stop
                          offset="0.3989"
                          stop-color="#87C4F8"
                          stop-opacity="0.168"
                        />
                        <stop
                          offset="0.5365"
                          stop-color="#85C0F4"
                          stop-opacity="0.298"
                        />
                        <stop
                          offset="0.6753"
                          stop-color="#83BBEF"
                          stop-opacity="0.466"
                        />
                        <stop
                          offset="0.8151"
                          stop-color="#7FB5E9"
                          stop-opacity="0.672"
                        />
                        <stop
                          offset="0.9532"
                          stop-color="#7CAEE1"
                          stop-opacity="0.911"
                        />
                        <stop offset="1" stop-color="#7BACDF" />
                      </linearGradient>
                      <linearGradient
                        id="paint5_linear_5_4203"
                        x1="33.9996"
                        y1="27.7232"
                        x2="33.9996"
                        y2="29.2915"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4565" />
                        <stop offset="0.2377" stop-color="#F53A60" />
                        <stop offset="0.6488" stop-color="#DB1E54" />
                        <stop offset="1" stop-color="#C00148" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_5_4203"
                        x1="39.428"
                        y1="27.8346"
                        x2="39.428"
                        y2="29.0612"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EAF6FF" />
                        <stop offset="0.2651" stop-color="#E5F3FE" />
                        <stop offset="0.5398" stop-color="#D9EDFE" />
                        <stop offset="0.8179" stop-color="#C4E3FE" />
                        <stop offset="1" stop-color="#B3DAFE" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_5_4203"
                        x1="44.8593"
                        y1="27.8346"
                        x2="44.8593"
                        y2="29.0612"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EAF6FF" />
                        <stop offset="0.2651" stop-color="#E5F3FE" />
                        <stop offset="0.5398" stop-color="#D9EDFE" />
                        <stop offset="0.8179" stop-color="#C4E3FE" />
                        <stop offset="1" stop-color="#B3DAFE" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_5_4203"
                        x1="50.284"
                        y1="27.8346"
                        x2="50.284"
                        y2="29.0612"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EAF6FF" />
                        <stop offset="0.2651" stop-color="#E5F3FE" />
                        <stop offset="0.5398" stop-color="#D9EDFE" />
                        <stop offset="0.8179" stop-color="#C4E3FE" />
                        <stop offset="1" stop-color="#B3DAFE" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_5_4203"
                        x1="55.7163"
                        y1="27.8346"
                        x2="55.7163"
                        y2="29.0612"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#EAF6FF" />
                        <stop offset="0.2651" stop-color="#E5F3FE" />
                        <stop offset="0.5398" stop-color="#D9EDFE" />
                        <stop offset="0.8179" stop-color="#C4E3FE" />
                        <stop offset="1" stop-color="#B3DAFE" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_5_4203"
                        x1="15.2911"
                        y1="37.6893"
                        x2="58.2854"
                        y2="3.38304"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8AC9FE" stop-opacity="0" />
                        <stop
                          offset="0.1291"
                          stop-color="#89C8FD"
                          stop-opacity="0.019"
                        />
                        <stop
                          offset="0.2629"
                          stop-color="#88C6FB"
                          stop-opacity="0.075"
                        />
                        <stop
                          offset="0.3989"
                          stop-color="#87C4F8"
                          stop-opacity="0.168"
                        />
                        <stop
                          offset="0.5365"
                          stop-color="#85C0F4"
                          stop-opacity="0.298"
                        />
                        <stop
                          offset="0.6753"
                          stop-color="#83BBEF"
                          stop-opacity="0.466"
                        />
                        <stop
                          offset="0.8151"
                          stop-color="#7FB5E9"
                          stop-opacity="0.672"
                        />
                        <stop
                          offset="0.9532"
                          stop-color="#7CAEE1"
                          stop-opacity="0.911"
                        />
                        <stop offset="1" stop-color="#7BACDF" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_5_4203"
                        x1="17.237"
                        y1="40.1266"
                        x2="60.2312"
                        y2="5.8203"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8AC9FE" stop-opacity="0" />
                        <stop
                          offset="0.1291"
                          stop-color="#89C8FD"
                          stop-opacity="0.019"
                        />
                        <stop
                          offset="0.2629"
                          stop-color="#88C6FB"
                          stop-opacity="0.075"
                        />
                        <stop
                          offset="0.3989"
                          stop-color="#87C4F8"
                          stop-opacity="0.168"
                        />
                        <stop
                          offset="0.5365"
                          stop-color="#85C0F4"
                          stop-opacity="0.298"
                        />
                        <stop
                          offset="0.6753"
                          stop-color="#83BBEF"
                          stop-opacity="0.466"
                        />
                        <stop
                          offset="0.8151"
                          stop-color="#7FB5E9"
                          stop-opacity="0.672"
                        />
                        <stop
                          offset="0.9532"
                          stop-color="#7CAEE1"
                          stop-opacity="0.911"
                        />
                        <stop offset="1" stop-color="#7BACDF" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_5_4203"
                        x1="20.7477"
                        y1="44.5291"
                        x2="63.742"
                        y2="10.2226"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#8AC9FE" stop-opacity="0" />
                        <stop
                          offset="0.1291"
                          stop-color="#89C8FD"
                          stop-opacity="0.019"
                        />
                        <stop
                          offset="0.2629"
                          stop-color="#88C6FB"
                          stop-opacity="0.075"
                        />
                        <stop
                          offset="0.3989"
                          stop-color="#87C4F8"
                          stop-opacity="0.168"
                        />
                        <stop
                          offset="0.5365"
                          stop-color="#85C0F4"
                          stop-opacity="0.298"
                        />
                        <stop
                          offset="0.6753"
                          stop-color="#83BBEF"
                          stop-opacity="0.466"
                        />
                        <stop
                          offset="0.8151"
                          stop-color="#7FB5E9"
                          stop-opacity="0.672"
                        />
                        <stop
                          offset="0.9532"
                          stop-color="#7CAEE1"
                          stop-opacity="0.911"
                        />
                        <stop offset="1" stop-color="#7BACDF" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_5_4203"
                        x1="22.1959"
                        y1="33.3876"
                        x2="61.7566"
                        y2="58.2373"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#00F2A6" />
                        <stop offset="0.2453" stop-color="#00EDA3" />
                        <stop offset="0.4994" stop-color="#01E19A" />
                        <stop offset="0.7566" stop-color="#04CC8C" />
                        <stop offset="1" stop-color="#07B27B" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_5_4203"
                        x1="60.4443"
                        y1="47.6226"
                        x2="69.7251"
                        y2="47.6226"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_5_4203"
                        x1="59.1903"
                        y1="53.5057"
                        x2="44.2649"
                        y2="34.5704"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint16_linear_5_4203"
                        x1="36.6683"
                        y1="50.4563"
                        x2="35.4802"
                        y2="43.8105"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint17_linear_5_4203"
                        x1="44.858"
                        y1="75.1681"
                        x2="44.858"
                        y2="82.9491"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint18_linear_5_4203"
                        x1="28.6669"
                        y1="44.0774"
                        x2="23.5293"
                        y2="42.7268"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint19_linear_5_4203"
                        x1="33.8273"
                        y1="25.9111"
                        x2="55.1486"
                        y2="47.2325"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#26A6FE" />
                        <stop offset="0.2729" stop-color="#23A1FD" />
                        <stop offset="0.5557" stop-color="#1A95FD" />
                        <stop offset="0.8419" stop-color="#0B80FB" />
                        <stop offset="1" stop-color="#0172FB" />
                      </linearGradient>
                      <linearGradient
                        id="paint20_linear_5_4203"
                        x1="55.0539"
                        y1="40.9843"
                        x2="18.4086"
                        y2="26.4918"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F5FBFF" stop-opacity="0" />
                        <stop
                          offset="0.1205"
                          stop-color="#F5FBFF"
                          stop-opacity="0.016"
                        />
                        <stop
                          offset="0.2454"
                          stop-color="#F5FBFF"
                          stop-opacity="0.065"
                        />
                        <stop
                          offset="0.3724"
                          stop-color="#F5FBFF"
                          stop-opacity="0.147"
                        />
                        <stop
                          offset="0.5008"
                          stop-color="#F5FBFF"
                          stop-opacity="0.261"
                        />
                        <stop
                          offset="0.6304"
                          stop-color="#F5FBFF"
                          stop-opacity="0.408"
                        />
                        <stop
                          offset="0.761"
                          stop-color="#F5FBFF"
                          stop-opacity="0.588"
                        />
                        <stop
                          offset="0.8898"
                          stop-color="#F5FBFF"
                          stop-opacity="0.797"
                        />
                        <stop offset="1" stop-color="#F5FBFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint21_linear_5_4203"
                        x1="51.0014"
                        y1="39.3816"
                        x2="28.9486"
                        y2="30.6602"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F5FBFF" stop-opacity="0" />
                        <stop
                          offset="0.1205"
                          stop-color="#F5FBFF"
                          stop-opacity="0.016"
                        />
                        <stop
                          offset="0.2454"
                          stop-color="#F5FBFF"
                          stop-opacity="0.065"
                        />
                        <stop
                          offset="0.3724"
                          stop-color="#F5FBFF"
                          stop-opacity="0.147"
                        />
                        <stop
                          offset="0.5008"
                          stop-color="#F5FBFF"
                          stop-opacity="0.261"
                        />
                        <stop
                          offset="0.6304"
                          stop-color="#F5FBFF"
                          stop-opacity="0.408"
                        />
                        <stop
                          offset="0.761"
                          stop-color="#F5FBFF"
                          stop-opacity="0.588"
                        />
                        <stop
                          offset="0.8898"
                          stop-color="#F5FBFF"
                          stop-opacity="0.797"
                        />
                        <stop offset="1" stop-color="#F5FBFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint22_linear_5_4203"
                        x1="60.5246"
                        y1="50.9259"
                        x2="7.79961"
                        y2="3.87027"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F5FBFF" stop-opacity="0" />
                        <stop
                          offset="0.1205"
                          stop-color="#F5FBFF"
                          stop-opacity="0.016"
                        />
                        <stop
                          offset="0.2454"
                          stop-color="#F5FBFF"
                          stop-opacity="0.065"
                        />
                        <stop
                          offset="0.3724"
                          stop-color="#F5FBFF"
                          stop-opacity="0.147"
                        />
                        <stop
                          offset="0.5008"
                          stop-color="#F5FBFF"
                          stop-opacity="0.261"
                        />
                        <stop
                          offset="0.6304"
                          stop-color="#F5FBFF"
                          stop-opacity="0.408"
                        />
                        <stop
                          offset="0.761"
                          stop-color="#F5FBFF"
                          stop-opacity="0.588"
                        />
                        <stop
                          offset="0.8898"
                          stop-color="#F5FBFF"
                          stop-opacity="0.797"
                        />
                        <stop offset="1" stop-color="#F5FBFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint23_linear_5_4203"
                        x1="47.2978"
                        y1="43.0841"
                        x2="38.5763"
                        y2="21.0312"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F5FBFF" stop-opacity="0" />
                        <stop
                          offset="0.1205"
                          stop-color="#F5FBFF"
                          stop-opacity="0.016"
                        />
                        <stop
                          offset="0.2454"
                          stop-color="#F5FBFF"
                          stop-opacity="0.065"
                        />
                        <stop
                          offset="0.3724"
                          stop-color="#F5FBFF"
                          stop-opacity="0.147"
                        />
                        <stop
                          offset="0.5008"
                          stop-color="#F5FBFF"
                          stop-opacity="0.261"
                        />
                        <stop
                          offset="0.6304"
                          stop-color="#F5FBFF"
                          stop-opacity="0.408"
                        />
                        <stop
                          offset="0.761"
                          stop-color="#F5FBFF"
                          stop-opacity="0.588"
                        />
                        <stop
                          offset="0.8898"
                          stop-color="#F5FBFF"
                          stop-opacity="0.797"
                        />
                        <stop offset="1" stop-color="#F5FBFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint24_linear_5_4203"
                        x1="44.8757"
                        y1="39.6384"
                        x2="44.8757"
                        y2="55.3534"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#0182FC" stop-opacity="0" />
                        <stop
                          offset="0.192"
                          stop-color="#017FF5"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.391"
                          stop-color="#0179E3"
                          stop-opacity="0.161"
                        />
                        <stop
                          offset="0.5932"
                          stop-color="#016EC6"
                          stop-opacity="0.362"
                        />
                        <stop
                          offset="0.7966"
                          stop-color="#015F9C"
                          stop-opacity="0.643"
                        />
                        <stop offset="1" stop-color="#024C67" />
                      </linearGradient>
                      <linearGradient
                        id="paint25_linear_5_4203"
                        x1="47.5507"
                        y1="36.9592"
                        x2="63.2659"
                        y2="36.9592"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#0182FC" stop-opacity="0" />
                        <stop
                          offset="0.192"
                          stop-color="#017FF5"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.391"
                          stop-color="#0179E3"
                          stop-opacity="0.161"
                        />
                        <stop
                          offset="0.5932"
                          stop-color="#016EC6"
                          stop-opacity="0.362"
                        />
                        <stop
                          offset="0.7966"
                          stop-color="#015F9C"
                          stop-opacity="0.643"
                        />
                        <stop offset="1" stop-color="#024C67" />
                      </linearGradient>
                      <linearGradient
                        id="paint26_linear_5_4203"
                        x1="47.2375"
                        y1="39.3257"
                        x2="65.0597"
                        y2="57.1478"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#F5FBFF" stop-opacity="0" />
                        <stop
                          offset="0.1205"
                          stop-color="#F5FBFF"
                          stop-opacity="0.016"
                        />
                        <stop
                          offset="0.2454"
                          stop-color="#F5FBFF"
                          stop-opacity="0.065"
                        />
                        <stop
                          offset="0.3724"
                          stop-color="#F5FBFF"
                          stop-opacity="0.147"
                        />
                        <stop
                          offset="0.5008"
                          stop-color="#F5FBFF"
                          stop-opacity="0.261"
                        />
                        <stop
                          offset="0.6304"
                          stop-color="#F5FBFF"
                          stop-opacity="0.408"
                        />
                        <stop
                          offset="0.761"
                          stop-color="#F5FBFF"
                          stop-opacity="0.588"
                        />
                        <stop
                          offset="0.8898"
                          stop-color="#F5FBFF"
                          stop-opacity="0.797"
                        />
                        <stop offset="1" stop-color="#F5FBFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint27_linear_5_4203"
                        x1="-4.3522"
                        y1="0.441694"
                        x2="74.4382"
                        y2="99.1856"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint28_linear_5_4203"
                        x1="16.059"
                        y1="31.7638"
                        x2="55.5083"
                        y2="81.2038"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#07B27B" stop-opacity="0" />
                        <stop
                          offset="0.1911"
                          stop-color="#06AF78"
                          stop-opacity="0.04"
                        />
                        <stop
                          offset="0.389"
                          stop-color="#06A671"
                          stop-opacity="0.16"
                        />
                        <stop
                          offset="0.5902"
                          stop-color="#059766"
                          stop-opacity="0.359"
                        />
                        <stop
                          offset="0.7936"
                          stop-color="#038255"
                          stop-opacity="0.638"
                        />
                        <stop
                          offset="0.9969"
                          stop-color="#026841"
                          stop-opacity="0.994"
                        />
                        <stop offset="1" stop-color="#026841" />
                      </linearGradient>
                      <linearGradient
                        id="paint29_linear_5_4203"
                        x1="30.498"
                        y1="35.8634"
                        x2="33.5424"
                        y2="48.3384"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FEF0AE" />
                        <stop offset="0.1466" stop-color="#FDEEA9" />
                        <stop offset="0.2986" stop-color="#FDEB9D" />
                        <stop offset="0.4531" stop-color="#FDE688" />
                        <stop offset="0.6093" stop-color="#FCDF6B" />
                        <stop offset="0.7669" stop-color="#FBD646" />
                        <stop offset="0.9233" stop-color="#FACC18" />
                        <stop offset="1" stop-color="#FAC600" />
                      </linearGradient>
                      <linearGradient
                        id="paint30_linear_5_4203"
                        x1="56.4336"
                        y1="47.3575"
                        x2="41.017"
                        y2="31.9409"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="white" stop-opacity="0" />
                        <stop
                          offset="0.1205"
                          stop-color="white"
                          stop-opacity="0.016"
                        />
                        <stop
                          offset="0.2454"
                          stop-color="white"
                          stop-opacity="0.065"
                        />
                        <stop
                          offset="0.3724"
                          stop-color="white"
                          stop-opacity="0.147"
                        />
                        <stop
                          offset="0.5008"
                          stop-color="white"
                          stop-opacity="0.261"
                        />
                        <stop
                          offset="0.6304"
                          stop-color="white"
                          stop-opacity="0.408"
                        />
                        <stop
                          offset="0.761"
                          stop-color="white"
                          stop-opacity="0.588"
                        />
                        <stop
                          offset="0.8898"
                          stop-color="white"
                          stop-opacity="0.797"
                        />
                        <stop offset="1" stop-color="white" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="icon-content-img-content-name"> Visa </div>
              </div>
            </Link>

            <Link to="/Administration" style={{ textDecoration: "none" }}>
              <div className="icon-content-img-content">
                <div className="icon-content-img-content-img">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="81"
                    height="81"
                    viewBox="0 0 81 81"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_5_4247)">
                      <path
                        d="M67.1331 40.3332C67.1331 55.1336 55.1348 67.1325 40.3338 67.1325C25.5334 67.1325 13.5352 55.1336 13.5352 40.3332C13.5352 25.5328 25.5334 13.5339 40.3338 13.5339C55.1348 13.5339 67.1331 25.5328 67.1331 40.3332Z"
                        fill="url(#paint0_linear_5_4247)"
                      />
                      <path
                        d="M59.3456 56.2707C58.2727 57.5488 57.0745 58.7158 55.7678 59.7576L34.6539 38.6438C32.9895 37.11 31.9482 34.9121 31.9482 32.4731C31.9482 27.8424 35.7019 24.0857 40.3326 24.0857C42.7734 24.0857 44.9695 25.1288 46.5033 26.7944L64.7027 44.9939C63.8976 49.2334 62.0123 53.0908 59.3456 56.2707Z"
                        fill="url(#paint1_linear_5_4247)"
                      />
                      <path
                        d="M59.3444 56.2708C58.2714 57.5489 57.0733 58.7159 55.7666 59.7577C51.9372 62.8021 47.1875 64.7394 42.0019 65.0849L28.5742 51.6669C29.6332 46.8885 33.5309 43.1818 38.4064 42.3975C39.0368 42.2986 39.6783 42.2455 40.3314 42.2455C43.6584 42.2455 46.6699 43.5962 48.8501 45.7734L59.3444 56.2708Z"
                        fill="url(#paint2_linear_5_4247)"
                      />
                      <path
                        d="M76.8121 29.1418H75.8551C72.7167 29.1418 71.1462 25.3491 73.3642 23.1286L74.0405 22.453C75.4168 21.0766 75.4168 18.8476 74.0405 17.4713L63.1952 6.62657C61.8195 5.25023 59.5905 5.25023 58.2141 6.62657L57.5385 7.30223C55.318 9.52086 51.5253 7.95042 51.5253 4.812V3.85497C51.5259 1.9104 49.9481 0.333252 48.0036 0.333252H32.6642C30.7197 0.333252 29.1425 1.9104 29.1425 3.85558V4.812C29.1425 7.95103 25.3498 9.52086 23.1293 7.30284L22.4537 6.62657C21.0774 5.25084 18.8484 5.25084 17.4726 6.62657L6.62731 17.4719C5.25097 18.8476 5.25097 21.0766 6.62731 22.453L7.30358 23.1292C9.52159 25.3491 7.95116 29.1418 4.81274 29.1418H3.85571C1.91113 29.1418 0.333984 30.7189 0.333984 32.6635V48.0028C0.333984 49.9474 1.91113 51.5246 3.85632 51.5246H4.81274C7.95177 51.5246 9.5222 55.3173 7.30358 57.5377L6.62731 58.2134C5.25158 59.5897 5.25158 61.8187 6.62731 63.1951L17.4726 74.0398C18.849 75.4161 21.078 75.4161 22.4537 74.0398L23.13 73.3641C25.3498 71.1455 29.1425 72.7153 29.1425 75.8543V76.8114C29.1425 78.7559 30.7197 80.3331 32.6642 80.3331H48.0036C49.4611 80.3331 50.7086 79.4469 51.2433 78.1853C51.247 78.1767 51.25 78.1682 51.2537 78.1596C51.2793 78.098 51.3043 78.0363 51.3263 77.9729C51.3532 77.8978 51.3776 77.8215 51.3989 77.744C51.4093 77.7074 51.4179 77.6695 51.4289 77.6311C51.4478 77.5566 51.463 77.4803 51.4752 77.404C51.482 77.3643 51.4874 77.3259 51.4929 77.2881C51.5033 77.2166 51.51 77.1458 51.5155 77.0732C51.5186 77.047 51.5204 77.0177 51.5204 76.9896C51.5241 76.931 51.5259 76.8706 51.5259 76.8114V75.8549C51.5259 72.7159 55.318 71.1455 57.5385 73.3641L58.2141 74.0398C59.5905 75.4161 61.8195 75.4161 63.1958 74.0398L74.0405 63.1951C75.4168 61.8187 75.4168 59.5897 74.0405 58.2134L73.3648 57.5377C71.1462 55.3173 72.7167 51.5252 75.8551 51.5252H76.8121C76.8713 51.5252 76.9317 51.5233 76.9903 51.5197C77.0184 51.5197 77.0477 51.5178 77.0739 51.5148C77.1466 51.5093 77.2174 51.5026 77.2888 51.4922C77.3266 51.4867 77.3651 51.4818 77.4048 51.4745C77.481 51.4623 77.5573 51.447 77.6318 51.4281C77.6696 51.4177 77.7081 51.4086 77.7447 51.3982C77.8222 51.3769 77.8985 51.3524 77.9736 51.3256C78.0371 51.3036 78.0987 51.2786 78.1604 51.2529C78.1689 51.2493 78.1775 51.2462 78.186 51.2426C79.4476 50.7073 80.3338 49.4597 80.3338 48.0028V32.6635C80.3338 30.7189 78.7567 29.1418 76.8121 29.1418ZM15.5287 40.3332C15.5287 26.632 26.6328 15.5273 40.3339 15.5273C54.035 15.5273 65.1398 26.632 65.1398 40.3332C65.1398 54.0343 54.035 65.139 40.3339 65.139C26.6328 65.139 15.5287 54.0343 15.5287 40.3332Z"
                        fill="url(#paint3_radial_5_4247)"
                      />
                      <path
                        d="M40.3332 69.3774C56.3744 69.3774 69.3773 56.3745 69.3773 40.3333C69.3773 24.292 56.3744 11.2891 40.3332 11.2891C39.8413 11.2891 39.3505 11.3013 38.8653 11.3257C23.9923 12.0655 12.0654 23.9923 11.3257 38.8654C11.3013 39.3506 11.2891 39.8413 11.2891 40.3333C11.2891 56.3745 24.292 69.3774 40.3332 69.3774ZM40.3332 65.1391C26.6321 65.1391 15.5279 54.0344 15.5279 40.3333C15.5279 26.6321 26.6321 15.5274 40.3332 15.5274C54.0343 15.5274 65.1391 26.6321 65.1391 40.3333C65.1391 54.0344 54.0343 65.1391 40.3332 65.1391Z"
                        fill="url(#paint4_radial_5_4247)"
                      />
                      <path
                        d="M40.3339 62.3845C28.1752 62.3845 18.2832 52.4919 18.2832 40.3331C18.2832 28.1744 28.1752 18.2818 40.3339 18.2818C52.4933 18.2818 62.3853 28.1744 62.3853 40.3331C62.3853 52.4919 52.4933 62.3845 40.3339 62.3845ZM40.3339 20.6347C29.4721 20.6347 20.6361 29.4714 20.6361 40.3331C20.6361 51.1949 29.4721 60.0316 40.3339 60.0316C51.1957 60.0316 60.0324 51.1949 60.0324 40.3331C60.0324 29.4714 51.1957 20.6347 40.3339 20.6347Z"
                        fill="url(#paint5_linear_5_4247)"
                      />
                      <path
                        d="M39.1572 17.4311H41.5101V21.1573H39.1572V17.4311Z"
                        fill="url(#paint6_linear_5_4247)"
                      />
                      <path
                        d="M39.1572 59.5092H41.5101V63.2354H39.1572V59.5092Z"
                        fill="url(#paint7_linear_5_4247)"
                      />
                      <path
                        d="M59.5098 39.1565H63.236V41.51H59.5098V39.1565Z"
                        fill="url(#paint8_linear_5_4247)"
                      />
                      <path
                        d="M17.4307 39.1565H21.1562V41.51H17.4307V39.1565Z"
                        fill="url(#paint9_linear_5_4247)"
                      />
                      <path
                        d="M48.7213 32.4719C48.7213 37.1039 44.9664 40.8581 40.3345 40.8581C35.7025 40.8581 31.9482 37.1039 31.9482 32.4719C31.9482 27.84 35.7025 24.0857 40.3345 24.0857C44.9664 24.0857 48.7213 27.84 48.7213 32.4719Z"
                        fill="url(#paint10_linear_5_4247)"
                      />
                      <path
                        d="M52.0917 51.6662C49.0974 54.7015 44.9348 56.5807 40.334 56.5807C35.7331 56.5807 31.5706 54.7015 28.5762 51.6662C29.7725 46.2743 34.5814 42.2442 40.334 42.2442C43.661 42.2442 46.6718 43.5937 48.8508 45.7726C50.4408 47.3608 51.5888 49.3932 52.0917 51.6662Z"
                        fill="url(#paint11_linear_5_4247)"
                      />
                      <path
                        d="M52.0908 51.6662C52.0444 51.715 51.9949 51.762 51.9461 51.809C49.1147 54.6117 45.2719 56.3933 41.016 56.5649L38.8895 54.4347L38.8572 54.4079C38.4818 54.0984 38.2865 53.623 38.331 53.1377L39.0714 45.4449C39.0854 45.31 39.1428 45.1898 39.2282 45.0939C39.2203 45.0842 39.2142 45.0738 39.2057 45.0616C39.0854 44.9841 38.9835 44.8736 38.9225 44.7375L38.0704 42.8497C38.0112 42.7215 38.0051 42.5848 38.0399 42.4627C38.1479 42.442 38.256 42.4218 38.3658 42.4053C38.4433 42.3913 38.5233 42.3791 38.6008 42.3687C38.6618 42.3583 38.7247 42.3504 38.7882 42.3419C38.8596 42.3339 38.931 42.3235 39.0042 42.3174C39.0915 42.3077 39.1794 42.2991 39.2673 42.2912C39.3528 42.2833 39.4406 42.2772 39.5279 42.2711C39.6176 42.2643 39.7074 42.2607 39.7971 42.2564C39.9747 42.2485 40.1535 42.2442 40.333 42.2442C40.6613 42.2442 40.9879 42.2564 41.3095 42.2833C41.3956 42.2912 41.481 42.2973 41.5647 42.3077C41.738 42.3235 41.9113 42.3461 42.0822 42.3705C42.1659 42.3828 42.2513 42.3974 42.3349 42.4114C42.4332 42.4255 42.5309 42.4444 42.6267 42.4645C45.0339 42.9272 47.1848 44.1076 48.8498 45.7732C50.4398 47.3608 51.5872 49.3932 52.0908 51.6662Z"
                        fill="url(#paint12_linear_5_4247)"
                      />
                      <path
                        d="M41.8094 54.4086L40.9714 55.1025C40.6015 55.4083 40.0663 55.4083 39.6964 55.1025L38.8578 54.4086C38.483 54.0985 38.2865 53.623 38.3329 53.1384L39.0732 45.4456C39.1037 45.1239 39.3735 44.8792 39.6958 44.8792H40.972C41.2943 44.8792 41.5641 45.1239 41.5952 45.4456L42.3349 53.1384C42.3813 53.623 42.1848 54.0985 41.8094 54.4086Z"
                        fill="url(#paint13_linear_5_4247)"
                      />
                      <path
                        d="M41.5936 45.4456C41.5631 45.1239 41.2933 44.8792 40.9705 44.8792H39.6948C39.5044 44.8792 39.3341 44.9658 39.2188 45.1013L41.8097 47.6923L41.5936 45.4456Z"
                        fill="url(#paint14_linear_5_4247)"
                      />
                      <path
                        d="M42.5955 42.8497L41.7435 44.7375C41.6196 45.0128 41.3462 45.1879 41.0428 45.1879H39.6238C39.3198 45.1879 39.047 45.0128 38.9225 44.7375L38.0704 42.8497C38.0112 42.7215 38.0051 42.5848 38.0399 42.4627C38.7821 42.3199 39.5487 42.2442 40.333 42.2442C41.1179 42.2442 41.8845 42.3199 42.6267 42.4645C42.6609 42.5866 42.6529 42.7215 42.5955 42.8497Z"
                        fill="url(#paint15_linear_5_4247)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_5_4247"
                        x1="20.4961"
                        y1="21.5002"
                        x2="59.1768"
                        y2="59.1761"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#26A7FD" />
                        <stop offset="0.181667" stop-color="#73B6E3" />
                        <stop offset="0.356667" stop-color="#6AABDB" />
                        <stop offset="0.56307" stop-color="#73B5F6" />
                        <stop offset="0.8632" stop-color="#3199F8" />
                        <stop offset="1" stop-color="#1D6C9F" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_5_4247"
                        x1="61.999"
                        y1="52.5002"
                        x2="46.499"
                        y2="37.0002"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset="0.0178633"
                          stop-color="#134E5D"
                          stop-opacity="0.31"
                        />
                        <stop
                          offset="0.413096"
                          stop-color="#2594C8"
                          stop-opacity="0.69"
                        />
                        <stop
                          offset="0.979756"
                          stop-color="#1C64F2"
                          stop-opacity="0.65"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_5_4247"
                        x1="48.3486"
                        y1="58.6066"
                        x2="33.5148"
                        y2="42.9321"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF9517" stop-opacity="0" />
                        <stop
                          offset="0.3074"
                          stop-color="#EE8421"
                          stop-opacity="0.305882"
                        />
                        <stop
                          offset="0.6784"
                          stop-color="#E07728"
                          stop-opacity="0.678431"
                        />
                        <stop offset="1" stop-color="#DB722B" />
                      </linearGradient>
                      <radialGradient
                        id="paint3_radial_5_4247"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(27.5084 16.5998) scale(63.6804)"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.4073" stop-color="#FE4772" />
                        <stop offset="0.5963" stop-color="#FB3F6D" />
                        <stop offset="0.7403" stop-color="#F73363" />
                        <stop offset="0.8615" stop-color="#F02055" />
                        <stop offset="0.9673" stop-color="#E70944" />
                        <stop offset="1" stop-color="#E4003D" />
                      </radialGradient>
                      <radialGradient
                        id="paint4_radial_5_4247"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(49.6457 57.566) rotate(180) scale(46.2385)"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.4073" stop-color="#FE4772" />
                        <stop offset="0.5963" stop-color="#FB3F6D" />
                        <stop offset="0.7403" stop-color="#F73363" />
                        <stop offset="0.8615" stop-color="#F02055" />
                        <stop offset="0.9673" stop-color="#E70944" />
                        <stop offset="1" stop-color="#E4003D" />
                      </radialGradient>
                      <linearGradient
                        id="paint5_linear_5_4247"
                        x1="40.3343"
                        y1="61.3696"
                        x2="40.3343"
                        y2="20.0283"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#294DA9" />
                        <stop offset="0.541667" stop-color="#1847C2" />
                        <stop offset="1" stop-color="#5F8BFF" />
                      </linearGradient>
                      <linearGradient
                        id="paint6_linear_5_4247"
                        x1="39.157"
                        y1="19.2943"
                        x2="41.5099"
                        y2="19.2943"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#22C2FA" />
                        <stop offset="0.3216" stop-color="#449DF6" />
                        <stop offset="0.6926" stop-color="#4A97F6" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint7_linear_5_4247"
                        x1="39.157"
                        y1="61.3724"
                        x2="41.5099"
                        y2="61.3724"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#22C2FA" />
                        <stop offset="0.3216" stop-color="#449DF6" />
                        <stop offset="0.6926" stop-color="#4A97F6" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint8_linear_5_4247"
                        x1="59.5094"
                        y1="40.3333"
                        x2="63.2357"
                        y2="40.3333"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#22C2FA" />
                        <stop offset="0.3216" stop-color="#449DF6" />
                        <stop offset="0.6926" stop-color="#4A97F6" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint9_linear_5_4247"
                        x1="17.4303"
                        y1="40.3333"
                        x2="21.1559"
                        y2="40.3333"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#22C2FA" />
                        <stop offset="0.3216" stop-color="#449DF6" />
                        <stop offset="0.6926" stop-color="#4A97F6" />
                        <stop offset="1" stop-color="#4A97F6" />
                      </linearGradient>
                      <linearGradient
                        id="paint10_linear_5_4247"
                        x1="40.3346"
                        y1="28.6061"
                        x2="40.3346"
                        y2="43.157"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFFCF8" />
                        <stop offset="0.1875" stop-color="#FAF8F6" />
                        <stop offset="0.4041" stop-color="#ECEEF2" />
                        <stop offset="0.6353" stop-color="#D5DCEA" />
                        <stop offset="0.875" stop-color="#B5C4DF" />
                        <stop offset="1" stop-color="#A1B5D8" />
                      </linearGradient>
                      <linearGradient
                        id="paint11_linear_5_4247"
                        x1="40.3341"
                        y1="46.1083"
                        x2="40.3341"
                        y2="58.5457"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FFFCF8" />
                        <stop offset="0.1875" stop-color="#FAF8F6" />
                        <stop offset="0.4041" stop-color="#ECEEF2" />
                        <stop offset="0.6353" stop-color="#D5DCEA" />
                        <stop offset="0.875" stop-color="#B5C4DF" />
                        <stop offset="1" stop-color="#A1B5D8" />
                      </linearGradient>
                      <linearGradient
                        id="paint12_linear_5_4247"
                        x1="46.971"
                        y1="51.2697"
                        x2="37.492"
                        y2="47.9062"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A1B5D8" stop-opacity="0" />
                        <stop
                          offset="0.2564"
                          stop-color="#98ABCA"
                          stop-opacity="0.254902"
                        />
                        <stop
                          offset="0.7358"
                          stop-color="#8292A6"
                          stop-opacity="0.737255"
                        />
                        <stop offset="1" stop-color="#748290" />
                      </linearGradient>
                      <linearGradient
                        id="paint13_linear_5_4247"
                        x1="38.3261"
                        y1="50.1056"
                        x2="42.3413"
                        y2="50.1056"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.3262" stop-color="#FE4672" />
                        <stop offset="0.5324" stop-color="#FB3E6C" />
                        <stop offset="0.7054" stop-color="#F52F60" />
                        <stop offset="0.8591" stop-color="#EE1A51" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <linearGradient
                        id="paint14_linear_5_4247"
                        x1="42.6612"
                        y1="47.427"
                        x2="39.1784"
                        y2="43.9442"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#E4003D" stop-opacity="0" />
                        <stop
                          offset="0.2234"
                          stop-color="#CD1845"
                          stop-opacity="0.223529"
                        />
                        <stop
                          offset="0.5034"
                          stop-color="#B82E4D"
                          stop-opacity="0.501961"
                        />
                        <stop
                          offset="0.7682"
                          stop-color="#AB3C51"
                          stop-opacity="0.768627"
                        />
                        <stop offset="1" stop-color="#A64153" />
                      </linearGradient>
                      <linearGradient
                        id="paint15_linear_5_4247"
                        x1="38.0186"
                        y1="43.716"
                        x2="42.647"
                        y2="43.716"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF4974" />
                        <stop offset="0.3262" stop-color="#FE4672" />
                        <stop offset="0.5324" stop-color="#FB3E6C" />
                        <stop offset="0.7054" stop-color="#F52F60" />
                        <stop offset="0.8591" stop-color="#EE1A51" />
                        <stop offset="1" stop-color="#E4003D" />
                      </linearGradient>
                      <clipPath id="clip0_5_4247">
                        <rect
                          width="80"
                          height="80"
                          fill="white"
                          transform="translate(0.333984 0.333252)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="icon-content-img-content-name">
                  {" "}
                  Administration{" "}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainBoxNew;
