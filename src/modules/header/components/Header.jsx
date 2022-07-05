import React from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Slider,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import HEADER_TYPES from "../util/headerTypes";
import BODY_TYPES from "../../body/util/bodyTypes";
import actions from "../../../store/actions";
import { Brightness3, Brightness5 } from "@mui/icons-material";
import Stepper from "../../stepper/components/Stepper";

const Header = () => {
  const theme = useTheme();
  const reduxTheme = useSelector(selectors.getTheme);
  const headerType = useSelector(selectors.getHeaderType);
  const activeStep = useSelector(selectors.getActiveStep);
  const timeLeft = useSelector(selectors.getTimeLeft);

  const dispatch = useDispatch();

  const handleLogoClicked = () => {
    dispatch(actions.goToHome());
  };

  const renderDefault = () => (
    <>
      <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Button
          variant={activeStep ? undefined : "contained"}
          onClick={handleLogoClicked}
        >
          Beryl Songs
        </Button>
        {activeStep && <Stepper />}
      </Box>
      {activeStep && (
        <LinearProgress
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
          variant="determinate"
          value={((activeStep.time - timeLeft) * 100.0) / activeStep.time}
        />
        // <Slider
        //   sx={{
        //     position: "absolute",
        //     bottom: 0,
        //     left: 0,
        //     width: "100%",
        //     transform: "translateY(50%)",
        //   }}
        //   // variant="determinate"
        //   value={((activeStep.time - timeLeft) * 100.0) / activeStep.time}
        // />
      )}
      {/* <Box>
        <Button
          sx={{
            minWidth: 0,
            padding: theme.spacing(1),
            borderRadius: "50%",
          }}
          TouchRippleProps={{
            sx: {
              borderRadius: "50%",
            },
          }}
          onClick={handleThemeToggleClicked}
        >
          {reduxTheme === "lightTheme" ? <Brightness3 /> : <Brightness5 />}
        </Button>
      </Box> */}
    </>
  );

  const renderHeaderComponent = () => {
    switch (headerType) {
      case HEADER_TYPES.DEFAULT:
        return renderDefault();
      default:
        return null;
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        height: 96,
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        backgroundColor:
          theme.palette.mode === "light" && theme.palette.secondary.main,
        position: "relative",
      }}
    >
      {renderHeaderComponent()}
    </Paper>
  );
};

Header.propTypes = {};
Header.defaultProps = {};

export default React.memo(Header);
