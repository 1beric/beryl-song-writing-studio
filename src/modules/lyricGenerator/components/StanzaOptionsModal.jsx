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
import CornerX from "../../interactive/components/CornerX";
import { Add, CheckBox } from "@mui/icons-material";
import _ from "lodash";
import StanzaPatternEditor from "./StanzaPatternEditor";

const StanzaOptionsModal = ({ open, onClose }) => {
  const theme = useTheme();

  const stanzaOptions = useSelector(selectors.getStanzaOptions);
  const stanzaPattern = useSelector(selectors.getStanzaPattern);

  const [stanzasShowing, setStanzasShowing] = useState([]);
  const createHandleToggleStanza = (value) => (event) => {
    if (stanzasShowing.includes(value))
      setStanzasShowing(stanzasShowing.filter((val) => val !== value));
    else setStanzasShowing([...stanzasShowing, value]);
  };

  const [linesShowing, setLinesShowing] = useState([]);
  const createHandleToggleLine = (value, lineIndex) => (event) => {
    const key = `${value} - ${lineIndex}`;
    if (linesShowing.includes(key))
      setLinesShowing(linesShowing.filter((val) => val !== key));
    else setLinesShowing([...linesShowing, key]);
  };

  const dispatch = useDispatch();

  const handleUploadOptionsClicked = () => {
    dispatch(actions.uploadStanzaOptions());
  };

  const handleDownloadOptionsClicked = () => {
    dispatch(actions.downloadStanzaOptions());
  };

  const createHandleStanzaAddLine = (stanzaId) => (event) => {
    const newLine = {
      syllables: 1,
      accents: [true],
      rhyme: null,
      endsSentence: true,
    };
    dispatch(
      actions.acSetStanzaOptions({
        ...stanzaOptions,
        [stanzaId]: {
          ...stanzaOptions[stanzaId],
          lines: [...stanzaOptions[stanzaId].lines, newLine],
        },
      })
    );
  };
  const createHandleStanzaRemoveLine = (stanzaId, lineIndex) => (event) => {
    const stanza = stanzaOptions[stanzaId];
    const newLines = [...stanza.lines];
    newLines.splice(lineIndex, 1);

    dispatch(
      actions.acSetStanzaOptions({
        ...stanzaOptions,
        [stanzaId]: {
          ...stanzaOptions[stanzaId],
          lines: newLines,
        },
      })
    );
  };

  const createHandleStanzaLineSyllablesChanged =
    (stanzaId, lineIndex) => (event, newSyllables) => {
      // const newSyllables = event.target.value;

      const stanza = stanzaOptions[stanzaId];
      const line = stanza.lines[lineIndex];
      const newAccents = [...line.accents];

      while (newAccents.length < newSyllables) {
        newAccents.push(false);
      }

      const newLine = {
        ...line,
        syllables: newSyllables,
        accents: newAccents,
      };
      const newLines = [...stanza.lines];
      newLines.splice(lineIndex, 1, newLine);

      dispatch(
        actions.acSetStanzaOptions({
          ...stanzaOptions,
          [stanzaId]: {
            ...stanzaOptions[stanzaId],
            lines: newLines,
          },
        })
      );
    };
  const createHandleStanzaLineAccentChanged =
    (stanzaId, lineIndex, accentIndex) => (event) => {
      const newAccent = event.target.checked;

      const stanza = stanzaOptions[stanzaId];
      const line = stanza.lines[lineIndex];
      const newAccents = [...line.accents];
      newAccents.splice(accentIndex, 1, newAccent);
      const newLine = {
        ...line,
        accents: newAccents,
      };
      const newLines = [...stanza.lines];
      newLines.splice(lineIndex, 1, newLine);

      dispatch(
        actions.acSetStanzaOptions({
          ...stanzaOptions,
          [stanzaId]: {
            ...stanzaOptions[stanzaId],
            lines: newLines,
          },
        })
      );
    };
  const createHandleStanzaLineRhymeChange =
    (stanzaId, lineIndex) => (event) => {
      const newRhyme =
        event.target.value === "" ? null : event.target.value.toUpperCase();

      const stanza = stanzaOptions[stanzaId];
      const line = stanza.lines[lineIndex];
      const newLine = {
        ...line,
        rhyme: newRhyme,
      };
      const newLines = [...stanza.lines];
      newLines.splice(lineIndex, 1, newLine);

      dispatch(
        actions.acSetStanzaOptions({
          ...stanzaOptions,
          [stanzaId]: {
            ...stanzaOptions[stanzaId],
            lines: newLines,
          },
        })
      );
    };
  const createHandleStanzaLineEndsSentenceChange =
    (stanzaId, lineIndex) => (event) => {
      const newValue = event.target.checked;

      const stanza = stanzaOptions[stanzaId];
      const line = stanza.lines[lineIndex];
      const newLine = {
        ...line,
        endsSentence: newValue,
      };
      const newLines = [...stanza.lines];
      newLines.splice(lineIndex, 1, newLine);

      dispatch(
        actions.acSetStanzaOptions({
          ...stanzaOptions,
          [stanzaId]: {
            ...stanzaOptions[stanzaId],
            lines: newLines,
          },
        })
      );
    };

  const renderStanzaOptions = () =>
    _.uniq(stanzaPattern).map((stanzaId, stanzaIndex) => (
      <Box
        key={stanzaIndex}
        sx={{
          display: "flex",
          flexDirection: "column",
          // gap: theme.spacing(1),
          // overflowX: "auto",
        }}
      >
        <Button
          variant="contained"
          onClick={createHandleToggleStanza(stanzaId)}
          fullWidth
          // sx={{ width: 256, minWidth: 256 }}
        >
          {stanzaId} Options
        </Button>
        <Collapse
          in={stanzasShowing.includes(stanzaId)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(1),
          }}
        >
          {stanzaOptions[stanzaId].lines.map((line, lineIndex) => (
            <Box
              key={lineIndex}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(1),
                paddingTop: lineIndex === 0 ? theme.spacing(1) : 0,
              }}
            >
              <CornerX
                key={stanzaIndex}
                onClose={createHandleStanzaRemoveLine(stanzaId, lineIndex)}
              >
                <Button
                  variant="contained"
                  onClick={createHandleToggleLine(stanzaId, lineIndex)}
                  fullWidth
                  // sx={{ width: 256, minWidth: 256 }}
                >
                  Line {lineIndex + 1}
                </Button>
              </CornerX>
              <Collapse
                in={linesShowing.includes(`${stanzaId} - ${lineIndex}`)}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: theme.spacing(2),
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ width: 256, minWidth: 256 }}
                  >
                    Syllables:
                  </Typography>
                  <Slider
                    min={1}
                    max={50}
                    value={line.syllables}
                    valueLabelDisplay="auto"
                    onChangeCommitted={createHandleStanzaLineSyllablesChanged(
                      stanzaId,
                      lineIndex
                    )}
                  />
                  {/* <TextField
                    value={line.syllables}
                    onChange={createHandleStanzaLineSyllablesChanged(
                      stanzaId,
                      lineIndex
                    )}
                    size="small"
                    type="number"
                    InputProps={{
                      sx: {
                        minWidth: 0,
                        "& > input": {
                          width: 64,
                          minWidth: 0,
                        },
                      },
                    }}
                  /> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: theme.spacing(2),
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ width: 256, minWidth: 256 }}
                  >
                    Accents:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: theme.spacing(2),
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {line.accents
                      .filter(
                        (accent, accentIndex) => accentIndex < line.syllables
                      )
                      .map((accent, accentIndex) => (
                        <Checkbox
                          checked={accent}
                          key={accentIndex}
                          onChange={createHandleStanzaLineAccentChanged(
                            stanzaId,
                            lineIndex,
                            accentIndex
                          )}
                          size="small"
                        />
                      ))}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: theme.spacing(2),
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ width: 256, minWidth: 256 }}
                  >
                    Rhyme:
                  </Typography>
                  <TextField
                    value={line.rhyme || ""}
                    onChange={createHandleStanzaLineRhymeChange(
                      stanzaId,
                      lineIndex
                    )}
                    size="small"
                    InputProps={{
                      sx: {
                        flexGrow: 0,
                        flexShrink: 0,
                        "& > input": {
                          width: 32,
                          minWidth: 32,
                        },
                      },
                    }}
                    sx={{
                      flexGrow: 0,
                      flexShrink: 0,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: theme.spacing(2),
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ width: 256, minWidth: 256 }}
                  >
                    Ends Sentence:
                  </Typography>
                  <Checkbox
                    checked={line.endsSentence}
                    onChange={createHandleStanzaLineEndsSentenceChange(
                      stanzaId,
                      lineIndex
                    )}
                    size="small"
                  />
                </Box>
              </Collapse>
            </Box>
          ))}
          <Button
            size="small"
            sx={{
              minWidth: 0,
              padding: theme.spacing(1),
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
            variant="contained"
            onClick={createHandleStanzaAddLine(stanzaId)}
          >
            <Add />
          </Button>
        </Collapse>
      </Box>
    ));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          marginLeft: theme.spacing(1),
        }}
      >
        Stanza Options
        <ButtonGroup variant="contained" sx={{ alignSelf: "flex-end" }}>
          <Button variant="contained" onClick={handleUploadOptionsClicked}>
            Upload Options
          </Button>
          <Button variant="contained" onClick={handleDownloadOptionsClicked}>
            Download Options
          </Button>
        </ButtonGroup>
      </DialogTitle>
      <DialogContent
        sx={{
          // width: `calc(100% - ${theme.spacing(2)})`,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
          // maxHeight: "30vh",
          overflowY: "auto",
          overflowX: "hidden",
          flexGrow: 1,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(1),
        }}
      >
        <StanzaPatternEditor showTitle />
        {renderStanzaOptions()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

StanzaOptionsModal.propTypes = {};
StanzaOptionsModal.defaultProps = {};

export default React.memo(StanzaOptionsModal);
