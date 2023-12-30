import React from 'react'
import "./sightseeingresult.css";
import { Button, Box, Grid, Typography,Link} from '@mui/material';
import building from "../../../Images/building.png";
import schedule from "../../../Images/schedule.png";
import unitednations from "../../../Images/unitednations.png";
import search from "../../../Images/search.png";
import { Divider } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import color from "../../../color/color"

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const SightseeingsearchLeft = () => {
  return (
    <div  className='sight_header'>
      <Box p={2}>
        <Typography sx={{fontSize:'16px',fontWeight:'bold',color:'#252525',}} textAlign='center'>Your Sightseeing Search</Typography>
        <Box sx={{ display: "flex", marginY: "15px" }}>
          <img src={building} />
          <Typography className="list_text">New Delhi</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px" }}>
          <img src={schedule} />
          <Typography className="list_text">(05 Feb, 2023)</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px" }}>
          <img src={unitednations} />
          <Typography className="list_text">Indian</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px" ,justifyContent:'center'}}>
          <Button variant='contained' type='submit' sx={{background:color.bluedark,borderRadius:'10px'}}>Modify Search</Button>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px",justifyContent:'space-between' }}>
          <Box display='flex'>
          <img src={search} />
          <Typography sx={{fontSize:'12px',fontWeight:'bold',color:'#252525',}} ml={1}>Filter Search</Typography>
          </Box>
          <Box display='flex'>
          <Link sx={{fontSize:'10px',fontWeight:'bold',}} textAlign='right'>Clear Filter</Link>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />
        <Box sx={{ display: "flex", marginY: "15px",justifyContent:'space-between' }}>
          <Typography sx={{fontSize:'12px',fontWeight:'bold',color:'#252525',}} ml={1}>FHotel Name Contains:</Typography>
          <Link sx={{fontSize:'10px',fontWeight:'bold',color:'#252525'}} textAlign='right'>Clear Filter</Link>
        </Box>
        <Box className='input_field'>
            <input type='text' name='hotel_name' placeholder='Enter Hotel Name' style={{border:'none'}} className='home_name' />
        </Box>
        <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />
        <Box sx={{ display: "flex", marginY: "15px",justifyContent:'space-between' }}>
          <Typography sx={{fontSize:'12px',fontWeight:'bold',color:'#252525',}} ml={1}>Sightseeing Type</Typography>
          <Link sx={{fontSize:'10px',fontWeight:'bold',color:'#252525'}} textAlign='right'>Clear Filter</Link>
        </Box>
        <Box display="flex" alignItems="center">
            <Checkbox
              {...label}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
              Walking Tours
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
              Cultural Tours
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
              Luxury Tours
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
              Private Sightseeing Tours
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
              City Tour
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
              Audio Guided Tours
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
              Cultural Tours
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
              Luxury Tours
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
              Private Sightseeing Tours
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
              City Tour
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
              Audio Guided Tours
              </Typography>
            </Box>
          </Box>
      </Box>
    </div>
  )
}

export default SightseeingsearchLeft;
