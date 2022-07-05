import React, { useEffect, useState } from "react";
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
import _ from "lodash";
import StanzaPatternEditor from "./StanzaPatternEditor";
import useRightClickInformation from "../../../util/hooks/useRightClickInformation";

const PatternEditor = ({ stanzaLyrics, setStanzaLyrics }) => {
  const theme = useTheme();

  // const stanzaOptions = useSelector(selectors.getStanzaOptions);
  const stanzaPattern = useSelector(selectors.getStanzaPattern);
  const [openRightClickMenu, rightClickMenu] = useRightClickInformation();
  const dispatch = useDispatch();

  const createHandleStanzaLyricsChanged = (stanzaId) => (event) => {
    setStanzaLyrics((prev) => ({
      ...prev,
      [stanzaId]: event.target.value,
    }));
    dispatch(
      actions.acSetGeneratedLyrics(
        stanzaPattern.map((id) => stanzaLyrics[id]).join("\n\n")
      )
    );
  };

  const renderBox = (stanzaId, index) => (
    <Box key={index}>
      <Typography variant="h6">{stanzaId}:</Typography>
      <InputTextBox
        value={stanzaLyrics[stanzaId]}
        onChange={createHandleStanzaLyricsChanged(stanzaId)}
        elevation={2}
        onRightClick={openRightClickMenu}
      />
      {rightClickMenu}
    </Box>
  );

  const renderStanzas = () => stanzaPattern.map(renderBox);

  return (
    <>
      <StanzaPatternEditor
        sx={{
          alignSelf: "center",
        }}
        centerItems
      />
      <Box
        sx={{
          maxHeight: "-webkit-fill-available",
          overflow: "auto",
          paddingBottom: 2,
        }}
      >
        {renderStanzas()}
      </Box>
    </>
  );
};

PatternEditor.propTypes = {};
PatternEditor.defaultProps = {};

export default React.memo(PatternEditor);
