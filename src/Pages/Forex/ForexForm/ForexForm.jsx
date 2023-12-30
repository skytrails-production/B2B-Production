import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box,Button} from '@mui/material';
import color from "../../../color/color.js";
import CustomerDealForex from "./CustomerDealForex";
import DealForex from "./DealForex";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <Typography sx={{fontSize:'16px',fontWeight:'700'}}>Trip Type</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} display='flex'>
      
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{boxShadow:'0px 3px 6px #00000029',fontSize:'16px',textTransform:'capitalize'}} label=" Deal with Me" {...a11yProps(0)} />

          <Tab sx={{boxShadow:'0px 3px 6px #00000029',fontSize:'16px',textTransform:'capitalize'}} label="Deal with Customer" {...a11yProps(1)} />
         </Tabs>
         
         <Box display='flex' ml={5}>
          <Button variant="contained" style={{backgroundColor:color.bluedark,width:"60px",height:"40px"}}>Rent</Button>
         </Box>
         <Box display='flex' ml={5}>
          <Button variant="contained" style={{backgroundColor:color.bluedark,width:"60px",height:"40px"}}>Buy</Button>
         </Box>
      </Box>
      <TabPanel value={value} index={0}>
       <DealForex/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <CustomerDealForex/>
      </TabPanel>
     
    </Box>
  );
}
