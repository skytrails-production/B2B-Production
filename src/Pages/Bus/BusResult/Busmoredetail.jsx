import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Bustabs from './Bustabs';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '70%',
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  pb: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Link
        onClick={handleOpen}
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
         
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          textDecoration:"none",
          color: "#000",
          fontFamily:"Montserrat",


        }}
      >
        Bus Details
      </Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box display='flex'>
            <Box sx={{ boxShadow: "0px 3px 6px #00000029", width:'100%',textAlign:'center' }} px={1}>
              <Typography  sx={{color:'#006FFF',fontWeight:'bold', fontSize:'16px' }} py={1}>Delhi to Mumbai, Wed, 12 Jan 2023</Typography>
            </Box>
            <Box sx={{ boxShadow: "0px 3px 6px #00000029", width:'100%',textAlign:'center'}} px={1}>
              <Typography sx={{color:'#006FFF',fontWeight:'bold', fontSize:'16px' }} py={1}>Delhi to Mumbai, Wed, 12 Jan 2023</Typography>
            </Box>
            <Box sx={{ boxShadow: "0px 3px 6px #00000029", width:'100%',textAlign:'center'}} px={1}>
              <Typography sx={{color:'#006FFF',fontWeight:'bold', fontSize:'16px' }} py={1}>Delhi to Mumbai, Wed, 12 Jan 2023</Typography>
            </Box>
            </Box>
            <Box>
                <Bustabs/>
                
            </Box>
            <Box display='flex' justifyContent='space-around'>
                <Button variant="contained" type="submit" >Cancle</Button>
                <Button variant="contained" type="submit">Continue</Button>

            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
