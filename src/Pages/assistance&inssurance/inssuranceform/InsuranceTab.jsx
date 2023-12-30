import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SingleTripForm from '../insurancefrom/SingleTripForm';
import AnnualMultitrimFrom from '../insurancefrom/AnnualMultiTrimFrom';

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Typography sx={{fontSize:'16px',fontWeight:'700'}}>Trip Type</Typography>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{boxShadow:'0px 3px 6px #00000029',borderRadius:'10px',fontSize:'16px',textTransform:'capitalize'}} label=" Single Trip" {...a11yProps(0)} />

          <Tab sx={{boxShadow:'0px 3px 6px #00000029',borderRadius:'10px',fontSize:'16px',textTransform:'capitalize'}} label="Annual Multi Trip" {...a11yProps(1)} />
         </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <SingleTripForm/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <AnnualMultitrimFrom/>
      </TabPanel>
     
    </Box>
  );
}
