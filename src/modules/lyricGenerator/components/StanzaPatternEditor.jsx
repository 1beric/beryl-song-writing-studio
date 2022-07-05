import React from "react";
import * as PropTypes from "prop-types";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import { useDispatch } from "react-redux";
import actions from "../../../store/actions";
import CornerX from "../../interactive/components/CornerX";
import { Add } from "@mui/icons-material";

const StanzaPatternEditor = ({ showTitle, sx, centerItems }) => {
  const theme = useTheme();

  const stanzaOptions = useSelector(selectors.getStanzaOptions);
  const stanzaPattern = useSelector(selectors.getStanzaPattern);

  const dispatch = useDispatch();

  const handleAddStanza = (event) => {
    const newStanzaPattern = [...stanzaPattern, "_"];
    if (!stanzaOptions._) {
      dispatch(
        actions.acSetStanzaOptions({
          ...stanzaOptions,
          _: {
            id: "_",
            lines: [
              {
                syllables: 1,
                accents: [true],
                rhyme: null,
                endsSentence: true,
              },
            ],
          },
        })
      );
    }
    dispatch(actions.acSetStanzaPattern(newStanzaPattern));
  };

  const createHandleRemoveStanza = (index) => (event) => {
    const newStanzaPattern = [...stanzaPattern];
    newStanzaPattern.splice(index, 1);
    dispatch(actions.acSetStanzaPattern(newStanzaPattern));
  };

  const createHandleStanzaPatternChange = (index) => (event) => {
    const { value: newId } = event.target;
    const newStanzaPattern = [...stanzaPattern];
    const prevId = newStanzaPattern.splice(index, 1, newId);
    if (!stanzaOptions[newId]) {
      dispatch(
        actions.acSetStanzaOptions({
          ...stanzaOptions,
          [newId]: {
            id: newId,
            lines: stanzaOptions[prevId].lines,
          },
        })
      );
    }
    dispatch(actions.acSetStanzaPattern(newStanzaPattern));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: theme.spacing(2),
        alignItems: "center",
        marginTop: theme.spacing(1),
        ...sx,
      }}
    >
      {showTitle && (
        <Typography variant="body1" sx={{ width: 256, minWidth: 256 }}>
          Stanza Pattern:
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: centerItems ? "center" : "flex-start",
        }}
      >
        {stanzaPattern.map((stanzaId, index) => (
          <CornerX key={index} onClose={createHandleRemoveStanza(index)}>
            <TextField
              value={stanzaId}
              onChange={createHandleStanzaPatternChange(index)}
              size="small"
              InputProps={{
                sx: {
                  minWidth: 0,
                  "& > input": {
                    width: 32,
                    minWidth: 32,
                  },
                },
              }}
            />
          </CornerX>
        ))}
        <Button
          size="small"
          sx={{ minWidth: 0, padding: theme.spacing(1) }}
          variant="contained"
          onClick={handleAddStanza}
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
};

StanzaPatternEditor.propTypes = {
  showTitle: PropTypes.bool,
  centerItems: PropTypes.bool,
  sx: PropTypes.object,
};
StanzaPatternEditor.defaultProps = {
  showTitle: false,
  centerItems: false,
  sx: {},
};

export default React.memo(StanzaPatternEditor);
