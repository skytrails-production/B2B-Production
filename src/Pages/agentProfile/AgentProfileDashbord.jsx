import React, { useEffect, useState,useRef } from "react";
import "./AgentProfileDashbord.css";
import MenuIcon from "@mui/icons-material/Menu";
import newlogo from "../../Images/whitelogo1.png";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Agent_ProfileLogout } from "../../Redux/AgentProfiltLogin/actionAgentProfiltLogin";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
import AgentProfileLeft from "./AgentProfileLeft";
import AgentHome from "./AgentHome";
// import { IoMdHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import AgentList from "./AgentList";
import { MdAccountBalanceWallet } from "react-icons/md";

const AgentProfileDashbord = () => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfile, setIsProfile] = useState(false);
  const prams = useParams();
  const [tab, setTab] = useState("home");
  const [menu, setMenu] = useState(true);
  const leftPath = [
    { name: "home", icon: <IoMdHome size={30} /> },
    { name: "Agent List", icon: <FaUserFriends size={30} /> },
  ];
  const dropDwonRef=useRef(null);

  const handleLogout = () => {
    dispatch(Agent_ProfileLogout());
  };
  const agentData = reducerState?.agentProfileReducer;
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log(tab, leftPath, "/////////////////////////");
  }, [tab]);

  const [routeData, setRouteData] = useState([]);
  const fetchData = async () => {
    // const Data = await axios.get(`${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/${reducerState?.
    //     agentProfileReducer?.agentProfileloginData?.
    //     data?.data?.
    //     id}`)
    const Data = await axios.get(
      `${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/65e959e675e669a23dfd9bb7`
    );
    setData(Data?.data);
    console.log(Data?.data, "data");
  };
  useEffect(() => {
    if (!agentData.isLogin) {
      navigate("/agentProfile/Login");
    } else {
      fetchData();
    }
  }, [agentData.isLogin]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDwonRef.current]);

  const handleClickOutside = (event) => {
    // alert(dropDwonRef.current)
    console.log(dropDwonRef.current ,!dropDwonRef.current.contains(event.target))
    if (dropDwonRef.current && !dropDwonRef.current.contains(event.target)) {
      setIsProfile(false);
    }
  };
  const toggleChangeTab = () => {
    // setTab("hhhh");
    console.log("weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  };

  return (
    <div className="agentProfileDasbordContainer">
      <div className="agentProfileDasbordNavBar">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {" "}
            <MenuIcon
              sx={{ color: "white" }}
              size={40}
              onClick={() => setMenu((pre) => !pre)}
            />
            <img
              src={newlogo}
              height="50px"
              alt="logo"
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "200px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: "25px" }}>2000</p>
              {/* <MdAccountBalanceWallet size={30} /> */}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <p style={{ fontSize: "25px" }}>2000</p> */}
              <MdAccountBalanceWallet size={30} />
            </div>
            <div
              onClick={() => setIsProfile((pre) => !pre)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <FaCircleUser size={30} />

              {/* <IoLogOutOutline size={30} onClick={() => handleLogout()} /> */}
            </div>
          </div>
        </div>
        {isProfile && (
          <div ref={dropDwonRef} className="AgentProfileDropDwon">
            <div className="AgentProfileDropDwonAgentDiv">
              {" "}
              <FaCircleUser size={30} /> <span>My Account</span>
            </div>
            <div>
              <div
                className="AgentProfileDropDwonAgentDivItem"
                onClick={() => handleLogout()}
              >
                {/* <FaCircleUser size={30} /> */}
                <div>
                  <IoLogOutOutline size={30} />
                </div>
                <div>Logout</div>
              </div>
              <div
                className="AgentProfileDropDwonAgentDivItem"
                onClick={() => handleLogout()}
              >
                {/* <FaCircleUser size={30} /> */}
                <div>
                  <IoSettingsOutline size={30} />
                </div>
                <div>Settings</div>
              </div>
              {/* <div className='AgentProfileDropDwonAgentDivItem' onClick={() => handleLogout()} >
                            
                            <div >

                                <IoLogOutOutline size={30} />
                            </div>
                            <div>Logout</div>
                        </div> */}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <AgentProfileLeft
          leftPath={leftPath}
          pathName={location.pathname}
          toggle={setTab}
          tab={tab}
          data={data}
          menu={menu}
        />
        <div className="agentProfileRight" style={{ width: "100%" }}>
          {tab === leftPath[0].name && (
            <AgentHome data={data} toggle={setTab} tab={tab} />
          )}
          {tab === leftPath[1].name && (
            <AgentList data={data} toggle={setTab} tab={tab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentProfileDashbord;
