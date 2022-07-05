import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  Paper,
  Slider,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import { useDispatch } from "react-redux";
import actions from "../../../store/actions";

const ContinueModal = ({ open }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleClose = (event) => {
    dispatch(actions.acSetModal(null));
  };

  const handleContinueClicked = (event) => {
    dispatch(actions.continueStep());
    handleClose(event);
  };

  const createHanldeAddTimeClicked = (amt) => (event) => {
    dispatch(actions.acSetTimeLeft(amt * 60 * 1000));
    dispatch(actions.playTimer());
    handleClose(event);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          justifyContent: "center",
          paddingBottom: 0,
          // marginLeft: theme.spacing(1),
        }}
      >
        This step is over. Continue?
      </DialogTitle>
      <DialogActions>
        <Button onClick={createHanldeAddTimeClicked(5)} variant="contained">
          Five More Minutes
        </Button>
        <Button onClick={createHanldeAddTimeClicked(2)} variant="contained">
          Two More Minutes
        </Button>
        <Button onClick={handleContinueClicked} variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ContinueModal.propTypes = {};
ContinueModal.defaultProps = {};

export default React.memo(ContinueModal);
