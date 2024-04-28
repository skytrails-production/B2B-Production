import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Button, Box, Typography, Input } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import color from "../../color/color";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiURL } from "../../Constants/constant";
const Account = () => {
  const reducerState = useSelector((state) => state);
  const [user, setUser] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userId = reducerState?.logIn?.loginData?.data?.data?.id;
  useEffect(() => {
    // Make a GET request to the API endpoint
    axios
      .get(`${apiURL.baseURL}/skyTrails/user/${userId}`)
      .then((response) => {
        // Handle the response data
        const user = response.data.data;
        setUser(user);
        // console.log("user data", response?.data?.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors, e.g., display an error message
      });
  }, [userId]);

  //   console.log("users", user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(
        `${apiURL.baseURL}/skyTrails/user/changepassword`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: reducerState?.logIn?.loginData?.data?.data?.id,
            oldpassword: oldPassword,
            changepassword: newPassword,
            confirmpassword: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while changing the password");
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={2} sm={4} md={6}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: "10px",
              padding: "15px",
              margin: "0 auto",
              marginTop: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#071C2C",
              }}
              mb={2}
            >
              Change Password
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#071C2C",
                  fontWeight: "500",
                  width: "150px",
                  marginLeft: "10px",
                }}
              >
                Enter Old Password*
              </Typography>
              <Input
                type="password"
                border="none"
                name="oldpassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                sx={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#071C2C",
                  fontWeight: "500",
                  width: "150px",
                  marginLeft: "10px",
                }}
              >
                Enter New Password*
              </Typography>
              <Input
                type="password"
                border="none"
                name="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                sx={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#071C2C",
                  fontWeight: "500",
                  width: "150px",
                  marginLeft: "10px",
                }}
              >
                Confirm Password*
              </Typography>
              <Input
                type="password"
                border="none"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{
                  flexGrow: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "white",
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }} my={2}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "#E73C34",
                }}
              >
                Change Password
              </Button>
            </Box>
            <Box style={{ color: "red" }}>{errorMessage}</Box>
            {successMessage && (
              <Box style={{ color: "green" }}>{successMessage}</Box>
            )}
          </Box>
        </form>

        <Box
          sx={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "10px",
            padding: "20px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#071C2C",
              marginBottom: "15px",
            }}
          >
            Agency Detail
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  User Name:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#666666",
                    fontWeight: "500",
                  }}
                >
                  Agency:
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {`${user?.personal_details?.first_name} ${user?.personal_details?.last_name !== undefined ? user?.personal_details?.last_name : ""}`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {user?.agency_details?.agency_name}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "10px",
            padding: "20px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#071C2C",
              marginBottom: "15px",
            }}
          >
            Agency Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Address:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Pin Code:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  State:
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {`${user?.agency_details?.address} ${user?.agency_details?.address_2}`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {user?.agency_details?.pincode}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {user?.agency_details?.state}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "10px",
            padding: "20px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#071C2C",
              marginBottom: "15px",
            }}
          >
            Residence Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Address:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Pin Code:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  State:
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {`${user?.personal_details?.address_details?.residential_address} ${user?.personal_details?.address_details?.address_2}`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {user?.personal_details?.address_details?.pincode}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {user?.personal_details?.address_details?.state}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={2} sm={4} md={6}>
        <Box
          sx={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "10px",
            padding: "20px",
          }}
          my={2}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#071C2C",
              marginBottom: "15px",
            }}
          >
            Email Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Current Email:
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {user?.personal_details?.email}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#071C2C",
              fontWeight: "500",
              marginTop: "15px",
            }}
          >
            Please contact The Hawai Yatra if you want to change your EmailId
          </Typography>
        </Box>

        <Box
          sx={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "10px",
            padding: "20px",
          }}
          my={2}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#071C2C",
              marginBottom: "15px",
            }}
          >
            Mobile Number
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Mobile :
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Agency Phone :
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {`${user?.personal_details?.mobile?.country_code} ${user?.personal_details?.mobile?.mobile_number}`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  {`${user?.agency_details?.agency_mobile?.country_code} ${user?.agency_details?.agency_mobile?.mobile_number !== undefined ? user?.agency_details?.agency_mobile?.mobile_number : ""}`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#071C2C",
              fontWeight: "500",
              marginTop: "15px",
            }}
          >
            Please contact The Hawai Yatra if you want to change your Mobile Number
          </Typography>
        </Box>

        <Box
          sx={{
            boxShadow: "0px 3px 6px #00000029",
            borderRadius: "10px",
            padding: "20px",
          }}
          my={2}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#071C2C",
              marginBottom: "15px",
            }}
          >
            Threshold Balance
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#071C2C",
                    fontWeight: "500",
                  }}
                >
                  Cash Amount :
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }} my={1}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: color.red1,
                    fontWeight: "500",
                  }}
                >
                  ₹ {user?.balance?.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#071C2C",
              fontWeight: "500",
              marginTop: "15px",
            }}
          >
            Email me when my balance is below the threshold Limit
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Account;
