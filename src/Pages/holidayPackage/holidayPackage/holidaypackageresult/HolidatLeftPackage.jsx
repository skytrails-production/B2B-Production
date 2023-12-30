import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import Divider from "@mui/material/Divider";
import { Grid, Radio, Typography, Button } from "@mui/material";
import HolidayRangeslider from "./HolidayRangeslider";
import building from "../../../Images/building.png";
import night from "../../../Images/night.png";
import beds from "../../../Images/beds.png";
import unitednations from "../../../Images/unitednations.png";
import addgroup from "../../../Images/addgroup.png";
import review from "../../../Images/review.png";
import HolidayRating from "./HolidayRating";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HolidatLeftPackage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", 
    mobile: "", 
    service: "", 
    amount: "", 
    currency: "", 
    commissionType: "", 
    myCommission: "", 
}); 

  // const Clickback = () => {
  //   navigate("HolidayPackage");
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateForex = (event) => {
    event.preventDefault();
    // console.log("formData", formData);

    const payload = {
        name: formData.name, 
        mobile: formData.mobile, 
        service: formData.service, 
        amount: formData.amount, 
        currency: formData.currency, 
        commissionType: formData.commissionType, 
        myCommission: formData.myCommission, 
    };

    // dispatch(createForex4CustomerAction(payload));
    // event.target.reset();
  };



  return (
    <div>
      <Box
        backgroundColor="#F5F5F5"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
      >
        <Typography justifyContent="center" display="flex" pt={3}>
          Your Hotel Search
        </Typography>
        <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />
        <Typography
          pt={1}
          paddingLeft="22px"
          justifyContent="start"
          display="flex"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          Popular Filter
        </Typography>
        <Box sx={{ display: "flex", marginY: "15px", marginX: "20px" }}>
          <img src={building} />
          <Typography className="list_text">New Delhi</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px", marginX: "20px" }}>
          <img src={night} style={{ width: "8%", height: "20%" }} />
          <Typography className="list_text">
            3 Night(s)(05 Feb-08 Feb, 2023)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px", marginX: "20px" }}>
          <img src={beds} />
          <Typography className="list_text">1 Room(s)</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px", marginX: "20px" }}>
          <img src={unitednations} />
          <Typography className="list_text">Indian</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px", marginX: "20px" }}>
          <img src={addgroup} />
          <Typography className="list_text">2 Adult(s)</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px", marginX: "20px" }}>
          <img src={review} />
          <Typography className="list_text">5 Star or more</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: "15px",
            marginX: "20px",
          }}
        >
          <Button
            variant="contained"
            onClick={Clickback}
            type="submit"
            className="btn_mod"
          >
            Modify Search
          </Button>
        </Box>
        <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />
        <Box display="flex" justifyContent="space-between" marginX="20px">
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "12px", fontWeight: "bold" }}
          >
            Flights
          </Typography>
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "10px", fontWeight: "bold" }}
          >
            Clear Filter
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-around" }}
          marginX="20px"
          my={2}
        >
          <Button
            variant="contained"
            href="#contained-buttons"
            size="small"
            className="Bton_filter"
            sx={{
              marginRight: "10px",
              background: "white",
              color: "gray",
              boxShadow: "2px 2px 8px gray",
              borderRadius: "20px",
              fontSize: "9px",
              width: "100%",
              height: "30px",
            }}
            mt={5}
          >
            With Flights
          </Button>
          <Button
            variant="contained"
            href="#contained-buttons"
            size="small"
            className="Bton_filter"
            sx={{
              background: "white",
              marginLeft: "10px",
              color: "gray",
              boxShadow: "2px 2px 8px gray",
              borderRadius: "20px",
              fontSize: "9px",
              width: "100%",
              height: "30px",
            }}
            mt={5}
          >
            Without Flights
          </Button>
        </Box>

        <Divider sx={{ backgroundColor: "gray" }} />
        <Typography
          pt={1}
          paddingLeft="22px"
          justifyContent="start"
          display="flex"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          Hot Deals
        </Typography>
        <Box sx={{ display: "flex", marginY: "15px", alignItems: "center" }}>
          <Checkbox
            {...label}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
          />
          <Typography className="list_text">Hot Deals</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: "15px",
            marginX: "20px",
          }}
        ></Box>
        <Divider sx={{ backgroundColor: "gray" }} />
        <Typography
          pt={1}
          paddingLeft="22px"
          justifyContent="start"
          display="flex"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          Budget (Per person)
        </Typography>
        <Box display="flex" justifyContent="center">
          <HolidayRangeslider />
        </Box>

        <Divider sx={{ backgroundColor: "gray" }} />
        <Box
          display="flex"
          justifyContent="space-between"
          marginX="20px"
          pt={2}
        >
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "12px", fontWeight: "bold" }}
          >
            Theme
          </Typography>
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "10px", fontWeight: "bold" }}
          >
            Clear Filter
          </Typography>
        </Box>
        <Box textAlign="left" pb={1}>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Bus Packages(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Honeymoon(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Luxury(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Adventure(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Beach(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Mountain(12)
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "gray" }} />
        <Box
          display="flex"
          justifyContent="space-between"
          marginX="20px"
          pt={2}
        >
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "12px", fontWeight: "bold" }}
          >
            Holiday Type
          </Typography>
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "10px", fontWeight: "bold" }}
          >
            Clear Filter
          </Typography>
        </Box>
        <Box textAlign="left" pb={1}>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Short Break(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Most Popular
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Experiential Stays
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Offbeat
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "gray" }} />
        <Box
          display="flex"
          justifyContent="space-between"
          marginX="20px"
          pt={2}
        >
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "12px", fontWeight: "bold" }}
          >
            Top Places
          </Typography>
          <Typography
            justifyContent="start"
            display="flex"
            sx={{ fontSize: "10px", fontWeight: "bold" }}
          >
            Clear Filter
          </Typography>
        </Box>
        <Box textAlign="left" pb={1}>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Top Places(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Hassan(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Mumbai(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Gokaran(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Panji(12)
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Chikmangalur(12)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default HolidatLeftPackage;
