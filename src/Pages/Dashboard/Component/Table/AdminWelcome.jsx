import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GroupsIcon from '@mui/icons-material/Groups';
import MoneyIcon from '@mui/icons-material/Money';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminWelcome = () => {
  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        width: "80%",
      }}
    >
      <Box height={100} />
      <Box height={100} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card
              sx={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Users
                    <AccountBoxIcon sx={{ position: 'absolute', top: 1, right: 1 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    25
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Bookings
                    <AccountBalanceIcon sx={{ position: 'absolute', top: 1, right: 1 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    50
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Agents
                    <GroupsIcon sx={{ position: 'absolute', top: 1, right: 1 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    30
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total Profit
                    <MoneyIcon sx={{ position: 'absolute', top: 1, right: 1 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    30
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography sx={{ position: 'relative' }} gutterBottom variant="h5" component="div">
                    Total Earning
                    <MoneyIcon sx={{ position: 'absolute', top: 0, right: 0 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    10000
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Total canceled
                    <TrendingDownIcon sx={{ position: 'absolute', top: 1, right: 1 }} />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    20
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdminWelcome;
