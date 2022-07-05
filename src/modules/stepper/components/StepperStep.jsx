import React from "react";
import * as PropTypes from "prop-types";
import {
  alpha,
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import BODY_TYPES from "../../body/util/bodyTypes";
import actions from "../../../store/actions";

const StepperStep = ({ title, active }) => {
  const theme = useTheme();
  const timeLeft = useSelector(selectors.getTimeLeft);
  const activeStep = useSelector(selectors.getActiveStep);
  return (
    // <Button variant={active ? "contained" : undefined}>{title}</Button>
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
        borderRadius: theme.spacing(0.75),
        // cursor: "pointer",

        backgroundColor: active
          ? alpha(theme.palette.primary.light, 0.1)
          : "transparent",
        // border: `2px solid ${
        //   active ? alpha(theme.palette.primary.light, 0.1) : "transparent"
        // }`,
        color: theme.palette.primary.main,
        // "&:hover": {
        //   backgroundColor: active
        //     ? theme.palette.primary.dark
        //     : alpha(theme.palette.primary.light, 0.1),
        // },
      }}
    >
      {/* {active && (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: `${
              ((activeStep.time - timeLeft) * 100.0) / activeStep.time
            }%`,
            transition: "width 1s",
            backgroundColor: alpha(theme.palette.primary.light, 0.1),
            borderRadius: theme.spacing(0.75),
          }}
        />
      )} */}
      <Typography sx={{ zIndex: 1 }}>{title}</Typography>
    </Box>
  );
};

StepperStep.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
StepperStep.defaultProps = {};

export default React.memo(StepperStep);
