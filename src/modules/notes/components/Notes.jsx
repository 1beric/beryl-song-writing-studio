import React from "react";
import * as PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import InputTextBox from "../../interactive/components/InputTextBox";

const Notes = () => {
  const theme = useTheme();

  const notes = useSelector(selectors.getNotes);

  const dispatch = useDispatch();

  const handleNotesChanged = (event) => {
    dispatch(actions.acSetNotes(event.target.value));
  };

  const handleDownloadNotesClicked = () => {
    dispatch(actions.downloadNotes());
  };

  const handleCopyNotesClicked = () => {
    dispatch(actions.copyNotes());
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
      <Typography variant="h5">Notes</Typography>
      <InputTextBox value={notes} onChange={handleNotesChanged} elevation={2} />
      <ButtonGroup variant="contained" sx={{ alignSelf: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleDownloadNotesClicked}
          // size="small"
        >
          Download Notes
        </Button>
        <Button
          variant="contained"
          onClick={handleCopyNotesClicked}
          // size="small"
        >
          Copy Notes
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

Notes.propTypes = {};
Notes.defaultProps = {};

export default React.memo(Notes);
