import React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const MuiCard = styled(Card)(({ theme }) => ({
  border: '1px solid ' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    border: 'none',
    borderBottom: '1px solid ' + theme.palette.background.default,
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid ' + theme.palette.background.default,
  },
  padding: '25px',
}));

const MuiCardContent = styled(CardContent)(({ theme }) => ({
  p: '0 !important',
}));

const MuiLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '10px',
  borderRadius: '5px',
}));

const MuiTypography = styled(Typography)(({ theme }) => ({
  variant: 'subtitle2',
  textAlign: 'left',
}));

const MuiGridItem = styled(Grid)(({ theme }) => ({
  borderRight: '1px solid ' + theme.palette.background.default,
  padding: '0px 15px',
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    borderBottom: '1px solid ' + theme.palette.background.default,
  },
}));

const MuiGridItemNoBorder = styled(Grid)(({ theme }) => ({
  padding: '0px 15px',
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid ' + theme.palette.background.default,
  },
}));

const MuiLinearProgressContainer = styled(Grid)(({ theme }) => ({
  padding: '10px 0px',
}));

const Default = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3} style={{border:"red"}}>
          <MuiGridItem lg={3} sm={6} xs={12}>
            <MuiCard>
              <CardHeader title={<Typography component="div">200</Typography>} />
              <Divider />
              <MuiCardContent>
                <MuiTypography align="left">Flight</MuiTypography>
                <MuiLinearProgressContainer container alignItems="center" spacing={1}>
                  <MuiGridItem>
                    <MuiTypography variant="body2">Direct</MuiTypography>
                  </MuiGridItem>
                  <MuiGridItem>
                    <Typography variant="body2" align="right">
                      80%
                    </Typography>
                  </MuiGridItem>
                  <MuiGridItem xs={12}>
                    <MuiLinearProgress variant="determinate" aria-label="direct" value={80} color="primary" />
                  </MuiGridItem>
                </MuiLinearProgressContainer>
              </MuiCardContent>
            </MuiCard>
          </MuiGridItem>

          {/* Repeat similar structure for other cards */}
          <MuiGridItem lg={3} sm={6} xs={12}>
            <MuiCard>
              <CardHeader title={<Typography component="div">145</Typography>} />
              <Divider />
              <MuiCardContent>
                <MuiTypography align="left">Hotel</MuiTypography>
                <MuiLinearProgressContainer container alignItems="center" spacing={1}>
                  <MuiGridItem>
                    <MuiTypography variant="body2">Social</MuiTypography>
                  </MuiGridItem>
                  <MuiGridItem>
                    <Typography variant="body2" align="right">
                      50%
                    </Typography>
                  </MuiGridItem>
                  <MuiGridItem xs={12}>
                    <MuiLinearProgress variant="determinate" aria-label="Social" value={50} color="secondary" />
                  </MuiGridItem>
                </MuiLinearProgressContainer>
              </MuiCardContent>
            </MuiCard>
          </MuiGridItem>

          <MuiGridItem lg={3} sm={6} xs={12}>
            <MuiCard>
              <CardHeader title={<Typography component="div">290</Typography>} />
              <Divider />
              <MuiCardContent>
                <MuiTypography align="left">Bus</MuiTypography>
                <MuiLinearProgressContainer container alignItems="center" spacing={1}>
                  <MuiGridItem>
                    <MuiTypography variant="body2">Referral</MuiTypography>
                  </MuiGridItem>
                  <MuiGridItem>
                    <Typography variant="body2" align="right">
                      20%
                    </Typography>
                  </MuiGridItem>
                  <MuiGridItem xs={12}>
                    <MuiLinearProgress variant="determinate" aria-label="Referral" value={20} color="primary" />
                  </MuiGridItem>
                </MuiLinearProgressContainer>
              </MuiCardContent>
            </MuiCard>
          </MuiGridItem>

          <MuiGridItem lg={3} sm={6} xs={12}>
            <MuiCard>
              <CardHeader title={<Typography component="div">500</Typography>} />
              <Divider />
              <MuiCardContent>
                <MuiTypography align="left">Package</MuiTypography>
                <MuiLinearProgressContainer container alignItems="center" spacing={1}>
                  <MuiGridItem>
                    <MuiTypography variant="body2">Bounce</MuiTypography>
                  </MuiGridItem>
                  <MuiGridItem>
                    <Typography variant="body2" align="right">
                      60%
                    </Typography>
                  </MuiGridItem>
                  <MuiGridItem xs={12}>
                    <MuiLinearProgress variant="determinate" aria-label="Bounce" value={60} color="secondary" />
                  </MuiGridItem>
                </MuiLinearProgressContainer>
              </MuiCardContent>
            </MuiCard>
          </MuiGridItem>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Default;
