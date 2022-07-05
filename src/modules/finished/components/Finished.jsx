import React from "react";
import * as PropTypes from "prop-types";
import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import InputTextBox from "../../interactive/components/InputTextBox";

const Finished = () => {
  const theme = useTheme();

  const notes = useSelector(selectors.getNotes);

  const dispatch = useDispatch();

  const handleNotesChanged = (event) => {
    dispatch(actions.acSetNotes(event.target.value));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(1),
        padding: theme.spacing(2),
        width: "60%",
        minWidth: 256,
        maxHeight: "-webkit-fill-available",
        // height: "-webkit-fill-available",
        // marginLeft: theme.spacing(1),
      }}
    >
      <Typography variant="h5">The session is now over!</Typography>
    </Paper>
  );
};

Finished.propTypes = {};
Finished.defaultProps = {};

export default React.memo(Finished);
