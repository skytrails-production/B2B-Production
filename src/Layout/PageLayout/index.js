import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
// import MDBox from "../../Components/MDBox";
import { Box } from "@mui/material";
// Update the import statement
import { createCascade, createContext, useMaterialUIController, setLayout } from 'context';

function PageLayout({ background, children }) {
  const [, dispatch] = useMaterialUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </Box>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
