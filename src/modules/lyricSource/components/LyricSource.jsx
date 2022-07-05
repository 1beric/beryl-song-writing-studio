import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  InputBase,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import { useDispatch } from "react-redux";
import actions from "../../../store/actions";
import InputTextBox from "../../interactive/components/InputTextBox";
import useRightClickInformation from "../../../util/hooks/useRightClickInformation";

const LyricSource = () => {
  const theme = useTheme();

  const lyricSource = useSelector(selectors.getLyricSource);

  const [openRightClickMenu, rightClickMenu] = useRightClickInformation();

  const dispatch = useDispatch();

  const handleLyricSourceChange = (event) => {
    dispatch(actions.acSetLyricSource(event.target.value));
  };

  const handleSubmitClicked = () => {
    dispatch(actions.calculateLyricSchema());
  };

  const handleDownloadSourceClicked = () => {
    dispatch(actions.downloadSource());
  };

  const handleUploadSourceClicked = () => {
    dispatch(actions.uploadSource());
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        width: "60%",
        minWidth: 256,
        maxHeight: `calc(100% - ${theme.spacing(2)})`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          marginLeft: theme.spacing(1),
        }}
      >
        <Typography variant="h5">Lyric Source</Typography>
        <ButtonGroup variant="contained" sx={{ alignSelf: "flex-end" }}>
          <Button variant="contained" onClick={handleUploadSourceClicked}>
            Upload Source
          </Button>
          <Button variant="contained" onClick={handleDownloadSourceClicked}>
            Download Source
          </Button>
        </ButtonGroup>
      </Box>
      <InputTextBox
        value={lyricSource}
        onChange={handleLyricSourceChange}
        onRightClick={openRightClickMenu}
        elevation={2}
      />
      <Button
        sx={{ alignSelf: "flex-end" }}
        variant="contained"
        onClick={handleSubmitClicked}
      >
        Submit
      </Button>
      {rightClickMenu}
    </Paper>
  );
};

LyricSource.propTypes = {};
LyricSource.defaultProps = {};

export default React.memo(LyricSource);
