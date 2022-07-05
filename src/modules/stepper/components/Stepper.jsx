import React from "react";
import * as PropTypes from "prop-types";
import {
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
import { Brightness3, Brightness5 } from "@mui/icons-material";
import StepperStep from "./StepperStep";

const Stepper = () => {
  const theme = useTheme();

  const steps = useSelector(selectors.getSteps);
  const activeStepId = useSelector(selectors.getActiveStepId);

  const renderSteps = () =>
    steps.map(({ id, title }) => (
      <StepperStep key={id} active={activeStepId === id} title={title} />
    ));

  return (
    <Box
      sx={{
        display: "flex",
        gap: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        alignItems: "center",
      }}
    >
      {renderSteps()}
    </Box>
  );
};

Stepper.propTypes = {};
Stepper.defaultProps = {};

export default React.memo(Stepper);
