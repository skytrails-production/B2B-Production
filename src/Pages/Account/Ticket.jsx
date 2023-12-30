import React, { useState } from "react";
import BusTicket from "./BusTicket"; // Import the Account component
import FlightTicket from "./FlightTicket"; // Import the Queue component
import HotelTicket from "./HotelTicket"; // Import the Tickets component
import Stack from "@mui/material/Stack";
import { Button, Box   } from "@mui/material";
import color from "../../color/color";


const Ticket = () => {
  const [activeButton, setActiveButton] = useState("Bus");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    
      <>
        
    

      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: color.bluedark,
            borderRadius: "10px",
            color: "white",
            boxShadow: "0px 3px 6px #00000029",
          }}
          onClick={() => handleButtonClick("Bus")}
        >
          Bus
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: color.bluedark,
            borderRadius: "10px",
            color: "white",
            boxShadow: "0px 3px 6px #00000029",
          }}
          onClick={() => handleButtonClick("Flight")}
        >
          Flight
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: color.bluedark,
            borderRadius: "10px",
            color: "white",
            boxShadow: "0px 3px 6px #00000029",
          }}
          onClick={() => handleButtonClick("Hotel")}
        >
          Hotel
        </Button>
      </Stack>
            
      {activeButton === "Bus" && <BusTicket />}
      {activeButton === "Flight" && <FlightTicket />}
      {activeButton === "Hotel" && <HotelTicket />}
      </>
  );
};

export default Ticket;