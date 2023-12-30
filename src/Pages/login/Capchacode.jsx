import { useEffect, useState } from "react";
import "./login.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Box } from "@mui/material";
import { useDispatch, useSelector, useReducer } from "react-redux";
import { loginAction } from "../../Redux/Auth/logIn/actionLogin";
import Alert from "@mui/material/Alert";
import color from "../../color/color";
export default function Demo(props) {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);

  // console.log("reducerState", reducerState);
  const [isDisabled, setIsDisabled] = useState(true);

  const [value, setValue] = useState(false);
  const [text, getText] = useState("");

  const handleText = (event) => {
    getText(event.target.value);
  };

  const [string, setString] = useState("");

  useEffect(() => {
    generateRandomString();
  }, []);

  useEffect(() => {
    handleValidate();
  }, [text]);

  const handleValidate = () => {
    if (string === text) {
      setIsDisabled(false);
      setValue(true);
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = () => {
    if (value == true) {
      const payload = {
        email: props.email,
        password: props.password,
      };
      dispatch(loginAction(payload));
    }
  };

  const generateRandomString = () => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setString(result);
  };

  return (
    <div>
      {/* <Box style={{ display: "flex" }} my={1}>
        <Box
          className="capt"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {string}
        </Box>
        <RefreshIcon
          style={{ color: "#006FFF" }}
          onClick={generateRandomString}
        />
        <input className="textinput" value={text} onChange={handleText}></input>
      </Box> */}
      <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
        <Button
          variant="contained"
          style={{
            backgroundColor: color.bluedark,
            color: "white",
            width: "100%",
            height: "50px",
            borderRadius: "8px",
          }}
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}
