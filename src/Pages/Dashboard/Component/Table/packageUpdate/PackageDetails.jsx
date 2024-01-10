import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPackageAction } from "../../../../../Redux/SearchPackage/actionSearchPackage";

// new
import {
  Box,
  Button,
  FormControl,
  Grid,
  NativeSelect,
  Typography,
} from "@mui/material";
import "./packageUpdate.css";
//   import "./selectclickbutton.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CommitIcon from "@mui/icons-material/Commit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CancelIcon from "@mui/icons-material/Cancel";
import TramIcon from "@mui/icons-material/Tram";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CabinIcon from "@mui/icons-material/Cabin";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeckIcon from "@mui/icons-material/Deck";
import EngineeringIcon from "@mui/icons-material/Engineering";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ParaglidingIcon from "@mui/icons-material/Paragliding";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import LandslideIcon from "@mui/icons-material/Landslide";
import KitesurfingIcon from "@mui/icons-material/Kitesurfing";
import PoolIcon from "@mui/icons-material/Pool";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import ForestIcon from "@mui/icons-material/Forest";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import KayakingIcon from "@mui/icons-material/Kayaking";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import WifiPasswordIcon from "@mui/icons-material/WifiPassword";

// React-bootstrap
import Modal from "react-bootstrap/Modal";

import Accordion from "react-bootstrap/Accordion";
import { createPackageAction } from "../../../../../Redux/CreatePackage/actionCreatePackage";
import Loader from "../../../../Loader/Loader";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

function PackageDetails() {
  const reducerState = useSelector((state) => state);
  // console.log("holiday",reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage );
  const holidayPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
  // console.log(holidayPackage);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const payload = {
      destination: "",
      days: 0,
    };
    // console.log(payload);
    dispatch(searchPackageAction(payload));
  }, []);

  const [package_id, setPackage_id] = useState("");

  const handleEdit = (ele) => {
    // console.log("package_id", ele);
    setPackage_id(ele);
    sessionStorage.setItem("package_id", ele);
    navigate("/admin/dashboard/EditHolidayPackage");
  };

  // console.log("package_id", package_id);

  return (
    <>
      <Box height={100} />
      <h2>Package Details</h2>
      <Table
        striped
        bordered
        hover
        responsive
        style={{
          margin: "auto",
          textAlign: "center",
          width: "500px",
        }}
      >
        <thead>
          <tr style={{backgroundColor:"grey"}}>
            <th>IMG</th>
            <th>Package Title</th>
            <th>Days</th>
            <th>Package Amount</th>
            <th>Hotel Detail</th>
            <th>Inclusion Note</th>
            <th>Exclusion Note</th>
            <th>Overview</th>
            <th>Detailed Itinerary</th>
            <th>Select Tags</th>
            <th>Term And Condition</th>
            <th>Cancellation Policy</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {holidayPackage?.map((ele, index) => {
            return (
              <>
                <tr>
                  <td>
                    <img
                      style={{
                        width: "120px",
                        height: "90px",
                        border: "1px solid black",
                      }}
                      src={ele.pakage_img}
                    />{" "}
                  </td>
                  <td style={{color:"white"}}>{ele?.pakage_title}</td>
                  <td style={{color:"white"}}>{ele?.days}</td>
                  <td style={{color:"white"}}>{ele?.pakage_amount?.amount}</td>
                  <td style={{color:"white"}}>{ele?.hotel_details}</td>
                  <td style={{color:"white"}}>{ele?.insclusion_note}</td>
                  <td style={{color:"white"}}>{ele?.exclusion_note}</td>
                  <td style={{color:"white"}}>
                    <div style={{ width: "350px", color:"white" }}>{ele?.overview}</div>{" "}
                  </td>
                  <td style={{color:"white"}}>{ele?.detailed_ltinerary[0]?.slice(7, 55) + "..."}</td>
                  <td style={{color:"white"}}>
                    <div>
                      {ele?.select_tags?.map((tag, index) => {
                        // console.log("tag",tag);

                        return (
                          <>
                            {tag?.domestic && <span>Domestic</span>}
                            {tag?.anniversary && <span>Anniversary</span>}
                          </>
                        );
                      })}
                    </div>
                  </td>
                  <td style={{color:"white"}}>{ele?.term_Conditions}</td>
                  <td style={{color:"white"}} >{ele?.cancellation_Policy}</td>
                  <td style={{color:"white"}}>
                    <button onClick={(e) => handleEdit(ele._id)}>Edit</button>
                  </td>
                  <td style={{color:"white"}}>
                    <button>Delete</button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default PackageDetails;
// // export default PackageDetails
