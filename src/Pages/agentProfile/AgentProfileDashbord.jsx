import React, { useEffect, useState } from 'react'
import "./AgentProfileDashbord.css";
import MenuIcon from "@mui/icons-material/Menu";
import newlogo from "../../Images/whitelogo1.png";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { Agent_ProfileLogout } from '../../Redux/AgentProfiltLogin/actionAgentProfiltLogin';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import AgentProfileLeft from './AgentProfileLeft';


const AgentProfileDashbord = () => {
    const dispatch = useDispatch();
    const reducerState = useSelector((state) => state);
    const navigate = useNavigate()
    const location = useLocation();
    const [isProfile, setIsProfile] = useState(false)
    const prams = useParams()
    const handleLogout = () => {
        dispatch(Agent_ProfileLogout());
    }
    const agentData = reducerState?.
        agentProfileReducer

    const [routeData, setRouteData] = useState([])
    const fetchData = async () => {
        const data = await axios.get(`${apiURL.baseURL}/skyTrails/agent/getAllInvitesBooking/${reducerState?.
            agentProfileReducer?.agentProfileloginData?.
            data?.data?.
            id}`)
        console.log(location.pathname, "data")
    }
    useEffect(() => {

        if (!agentData.isLogin) {
            navigate("/agentProfile/Login")
        }
        else {
            fetchData()
        }
    }, [agentData.isLogin])


    return (
        <div className='agentProfileDasbordContainer'>
            <div className='agentProfileDasbordNavBar'>
                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", width: "100%" }} >
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}> <MenuIcon sx={{ color: "white", }} size={30} /><img
                            src={newlogo}
                            height="50px"
                            alt="logo"
                            style={{ width: "100%" }}
                        /></div>
                    <div onClick={() => setIsProfile((pre) => !pre)} style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center", }}>
                        <FaCircleUser size={30} />

                        {/* <IoLogOutOutline size={30} onClick={() => handleLogout()} /> */}
                    </div>
                </div>{
                    isProfile &&

                    <div className='AgentProfileDropDwon'>
                        <div className='AgentProfileDropDwonAgentDiv'>   <FaCircleUser size={30} /> <span>My Account</span></div>
                        <div>
                            <div className='AgentProfileDropDwonAgentDivItem' onClick={() => handleLogout()} >
                                {/* <FaCircleUser size={30} /> */}
                                <div >

                                    <IoLogOutOutline size={30} />
                                </div>
                                <div>Logout</div>
                            </div>
                            <div className='AgentProfileDropDwonAgentDivItem' onClick={() => handleLogout()} >
                                {/* <FaCircleUser size={30} /> */}
                                <div >

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
                }
            </div>


            <div>
                <AgentProfileLeft pathName={location.pathname} />

            </div>

        </div>
    )
}

export default AgentProfileDashbord
