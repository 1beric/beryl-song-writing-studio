import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  InputBase,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import { useDispatch } from "react-redux";
import actions from "../../../store/actions";
import InputTextBox from "../../interactive/components/InputTextBox";
import useRightClickInformation from "../../../util/hooks/useRightClickInformation";

const SimpleEditor = () => {
  const theme = useTheme();

  const generatedLyrics = useSelector(selectors.getGeneratedLyrics);
  const [openRightClickMenu, rightClickMenu] = useRightClickInformation();
  const dispatch = useDispatch();

  const handleGenerateLyricsClicked = (event) => {
    dispatch(actions.generateLyrics());
  };

  const handleGeneratedLyricsChanged = (event) => {
    dispatch(actions.acSetGeneratedLyrics(event.target.value));
  };

  return (
    <>
      <Button variant="contained" onClick={handleGenerateLyricsClicked}>
        Generate Lyrics
      </Button>
      <InputTextBox
        value={generatedLyrics}
        onChange={handleGeneratedLyricsChanged}
        onRightClick={openRightClickMenu}
        elevation={2}
      />
      {rightClickMenu}
    </>
  );
};

SimpleEditor.propTypes = {};
SimpleEditor.defaultProps = {};

export default React.memo(SimpleEditor);
