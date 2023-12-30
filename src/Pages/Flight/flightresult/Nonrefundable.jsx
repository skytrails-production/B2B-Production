import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function PositionedTooltips() {
  return (
    <Tooltip title="Refundable">
      <MonetizationOnIcon style={{ color: "gray", marginTop: "4px" }} />
    </Tooltip>
  );
}
