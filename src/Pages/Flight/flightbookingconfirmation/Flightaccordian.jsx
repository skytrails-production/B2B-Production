import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import map from '../../../Images/map.png';
import picture from '../../../Images/picture.png';
import file from '../../../Images/file.png';
import Box from '@mui/material/Box';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0
    },
    "&:before": {
        display: "none"
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "white"
            : "white",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)"
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

export default function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ border: "none" }}
            >
                <AccordionSummary
                    sx={{ borderRadius: "20px", boxShadow: '0px 3px 6px #00000029', }}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                >
                    <Typography sx={{ fontsize: '16px', color: '#252525' }}>SSR Information</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        borderRadius: "20px",
                        boxShadow: '0px 3px 6px #00000029',
                        marginTop: "20px"
                    }}
                >
                    <Box display='flex' justifyContent='left'>
                        <Typography sx={{ fontsize: '14px', color: '#252525', textAlign: 'left' }} mb={1}>SSR Information</Typography>
                    </Box>
                    <Typography className="acc_para">
                        Taj Hotels is a chain of luxury hotels and a subsidiary of the Indian Hotels Company Limited, headquartered in Mumbai, India.
                        Incorporated by Jamsetji Tata in 1902, the company is a part of the Tata Group, one of India's largest business conglomerates.
                        The company employed over 20,000 people in the year 2010.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{ border: "none", marginTop: "20px" }}
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
            >
                <AccordionSummary
                    sx={{ borderRadius: "20px", boxShadow: '0px 3px 6px #00000029', }}
                    aria-controls="panel2d-content"
                    id="panel2d-header"
                >
                    <Typography sx={{ fontsize: '16px', color: '#252525' }}>Booking History</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        borderRadius: "20px",
                        boxShadow: '0px 3px 6px #00000029',
                        marginTop: "20px"
                    }}
                >
                    <Typography sx={{ fontsize: '16px', color: '#252525', textAlign: 'left' }} mb={1}>Hotel Map Details</Typography>
                    <Typography className="acc_para">
                        Taj Hotels is a chain of luxury hotels and a subsidiary of the Indian Hotels Company Limited, headquartered in Mumbai, India.
                        Incorporated by Jamsetji Tata in 1902, the company is a part of the Tata Group, one of India's largest business conglomerates.
                        The company employed over 20,000 people in the year 2010.
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
