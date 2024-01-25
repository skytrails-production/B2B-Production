import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

const RootContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));

const useStyles = {
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const AdminProfile = () => {
  const adminData = useSelector((state) => state?.adminAuth?.adminData);
  const username = adminData?.data?.username;
  const roles = adminData?.data?.roles;

  return (
    <RootContainer maxWidth="md">
      <StyledGrid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard elevation={3}>
            <StyledAvatar alt={username} src="/path/to/avatar.jpg" />
            <CardContent style={useStyles.cardContent}>
              <Typography variant="h5" component="div" gutterBottom>
                Welcome, {username}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Roles: {roles}
              </Typography>
              {/* You can add more profile information here */}
            </CardContent>
          </StyledCard>
        </Grid>
      </StyledGrid>
    </RootContainer>
  );
};

export default AdminProfile;
