import React, { useEffect, useState, useRef } from "react";
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
import UploadAgent from "./UploadAgent";
// import { IoMdHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import AgentList from "./AgentList";
import { MdAccountBalanceWallet } from "react-icons/md";
import StaticContent from "./StaticContent";
import Social from "./Social";
import DisplayAgentCont from "./DisplayAgentCont";
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
    { name: "Upload Agent", icon: <FaUserFriends size={30} /> },
    {name: "Upload Static", icon: <FaUserFriends size={30}/>},
    {name: "Social Account", icon: <FaUserFriends size={30}/>},
    {name: "Static Content", icon: <FaUserFriends size={30}/>},
    
  ];
  const dropDwonRef = useRef(null);

  const handleLogout = () => {
    dispatch(Agent_ProfileLogout());
  };
  const agentData = reducerState?.agentProfileReducer;
  const [data, setData] = useState(null);
  // useEffect(() => {
  //   console.log(reducerState?.agentProfileReducer?.
  //     agentProfileloginData?.data?.data?.id


  //     , "/////////////////////////");
  // }, [tab]);

  const [routeData, setRouteData] = useState([]);
  const fetchData = async () => {
    // const Data = await axios.get(`${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/${reducerState?.
    //     agentProfileReducer?.agentProfileloginData?.
    //     data?.data?.
    //     id}`)
    const Data = await axios.get(
      `${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/${reducerState?.agentProfileReducer?.
        agentProfileloginData?.data?.data?.id}`
    );
    setData(Data?.data);
    // console.log(Data?.data, "data");
  };
  useEffect(() => {
    if (!agentData.isLogin) {
      navigate("/agentProfile/Login");
    } else {
      fetchData();
    }
  }, [agentData.isLogin,]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDwonRef.current]);

  const handleClickOutside = (event) => {
    // alert(dropDwonRef.current)
    // console.log(dropDwonRef.current, !dropDwonRef.current.contains(event.target))
    if (dropDwonRef.current && !dropDwonRef.current.contains(event.target)) {
      setIsProfile(false);
    }
  };

  // console.log(data?.agentDetails, "///////////////////////////////////")

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

            <div className={`MenuIconAgentProfile ${!menu ? "rotate0" : "rotate180"}`}>

              <MenuIcon
                sx={{ color: "white" }}
                size={40}
                onClick={() => setMenu((pre) => !pre)}
              />
            </div>
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
              gap: "15px",
              paddingRight: "15px "
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: "1",
                justifyContent: "end"
              }}
            >
              <p style={{ fontSize: "25px" }}>{data?.agentDetails[0]?.balance}</p>
              {/* <MdAccountBalanceWallet size={30} /> */}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer"
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
                cursor: "pointer"
              }}
            >
              <FaCircleUser size={30} />

              {/* <IoLogOutOutline size={30} onClick={() => handleLogout()} /> */}
            </div>
          </div>
        </div>
        {/* {isProfile && ( */}
        <div ref={dropDwonRef} className={`AgentProfileDropDwon ${!isProfile && "AgentProfileDropDwonRemove"}`}>
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
        {/* // )} */}
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
          {tab === leftPath[2].name &&(
            <UploadAgent data={data} toggle={setTab} tab={tab}/>
          )

          }
          { tab === leftPath[3].name &&(
            <StaticContent data={data} toggle={setTab} tab={tab}/>
          )

          }
          {tab === leftPath[4].name &&(
            <Social data={data} toggle={setTab} tab={tab}/>
          )}
          {
            tab === leftPath[5].name &&(
              <DisplayAgentCont data={data} toggle={setTab} tab={tab}/>
            )
          }
         
        </div>
      </div>
    </div>
  );
};

export default AgentProfileDashbord;
