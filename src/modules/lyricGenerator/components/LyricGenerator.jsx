import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  InputBase,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import { useDispatch } from "react-redux";
import actions from "../../../store/actions";
import StanzaOptionsModal from "./StanzaOptionsModal";
import SimpleEditor from "./SimpleEditor";
import PatternEditor from "./PatternEditor";
import _ from "lodash";
import InformationPanel from "../../informationPanel/components/InformationPanel";

const LyricGenerator = () => {
  const theme = useTheme();

  const stanzaPattern = useSelector(selectors.getStanzaPattern);
  const [stanzaLyrics, setStanzaLyrics] = useState(
    _.uniq(stanzaPattern).reduce(
      (result, stanzaId) => ({
        ...result,
        [stanzaId]: "",
      }),
      {}
    )
  );

  useEffect(() => {
    setStanzaLyrics((prev) => ({
      ...prev,
      ..._.uniq(stanzaPattern).reduce(
        (result, stanzaId) => ({
          ...result,
          [stanzaId]: prev[stanzaId] || "",
        }),
        {}
      ),
    }));
  }, [stanzaPattern]);

  const [showStanzaOptions, setShowStanzaOptions] = useState(false);
  const closeStanzaOptions = (event) => setShowStanzaOptions(false);
  const handleShowStanzaOptionsClicked = (event) => setShowStanzaOptions(true);

  const [displayType, setDisplayType] = useState("simple");
  const handleDisplayTypeChange = (event, value) => setDisplayType(value);

  const dispatch = useDispatch();

  const handleDownloadLyricsClicked = (event) => {
    dispatch(actions.downloadLyrics());
  };

  const handleCopyLyricsClicked = (event) => {
    dispatch(actions.copyLyrics());
  };

  const handleSendLyricsToNotes = (event) => {
    dispatch(actions.sendLyricsToNotes());
  };

  const handleGeneratedLyricsChanged = (event) => {
    dispatch(actions.acSetGeneratedLyrics(event.target.value));
  };

  const renderDisplay = () => {
    switch (displayType) {
      case "simple":
        return <SimpleEditor />;
      case "templated":
        return (
          <PatternEditor
            stanzaLyrics={stanzaLyrics}
            setStanzaLyrics={setStanzaLyrics}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
          padding: theme.spacing(1),
          width: "60%",
          minWidth: 256,
          maxHeight: "-webkit-fill-available",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: theme.spacing(2),
            marginLeft: theme.spacing(1),
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Lyric Generator</Typography>
          <Button
            variant="contained"
            onClick={handleShowStanzaOptionsClicked}
            color="primary"
            // size="small"
          >
            Stanza Options
          </Button>
        </Box>
        <Tabs
          value={displayType}
          onChange={handleDisplayTypeChange}
          variant="fullWidth"
        >
          <Tab value="simple" label="Simple" />
          <Tab value="templated" label="Templated" />
        </Tabs>
        {renderDisplay()}
        <ButtonGroup variant="contained" sx={{ alignSelf: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleDownloadLyricsClicked}
            // size="small"
          >
            Download Lyrics
          </Button>
          <Button
            variant="contained"
            onClick={handleCopyLyricsClicked}
            // size="small"
          >
            Copy Lyrics
          </Button>
          <Button
            variant="contained"
            onClick={handleSendLyricsToNotes}
            // size="small"
          >
            Send To Notes
          </Button>
        </ButtonGroup>
        <StanzaOptionsModal
          open={showStanzaOptions}
          onClose={closeStanzaOptions}
        />
      </Paper>
      <InformationPanel />
    </>
  );
};

LyricGenerator.propTypes = {};
LyricGenerator.defaultProps = {};

export default React.memo(LyricGenerator);
