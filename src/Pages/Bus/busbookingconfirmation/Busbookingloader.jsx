import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function Busbookingloader(props) {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      height:900,
      bgcolor: "background.paper",
      border: "1px solid #000",
      boxShadow: 24,
      p: 4,
    };
  return (
    <Modal open={true}>
      <Box sx={{ display: "flex", justifyContent: "center",...style ,alignItems:"center"}}>
        <CircularProgress />
      </Box>
    </Modal>
  );
}
