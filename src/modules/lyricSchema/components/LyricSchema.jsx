import React from "react";
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

const LyricSchema = () => {
  const theme = useTheme();

  const lyricSchema = useSelector(selectors.getLyricSchema);

  const dispatch = useDispatch();

  const handleUploadSchemaClicked = () => {
    dispatch(actions.uploadSchema());
  };

  const handleDownloadSchemaClicked = () => {
    dispatch(actions.downloadSchema());
  };

  const renderSchema = () => {
    const pairs = [];
    const keys = Object.keys(lyricSchema);
    if (keys.length === 0)
      return (
        <Typography variant="subtitle1">
          The source has not been submitted.
        </Typography>
      );
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const nextObj = lyricSchema[key];
      Object.keys(nextObj).forEach((nextWord, index) => {
        const nextWordTimes = nextObj[nextWord];
        pairs.push(
          <Typography variant="subtitle1" key={key + " " + index}>
            {key} --- {nextWord} ({nextWordTimes})
          </Typography>
        );
      });
    }
    return pairs;
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
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          marginLeft: theme.spacing(1),
        }}
      >
        <Typography variant="h5">Lyric Schema</Typography>
        <ButtonGroup variant="contained" sx={{ alignSelf: "flex-end" }}>
          <Button variant="contained" onClick={handleUploadSchemaClicked}>
            Upload Schema
          </Button>
          <Button variant="contained" onClick={handleDownloadSchemaClicked}>
            Download Schema
          </Button>
        </ButtonGroup>
      </Box>
      <Paper
        elevation={2}
        sx={{
          width: `calc(100% - ${theme.spacing(2)})`,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: "webkit-fill-available",
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        }}
      >
        {renderSchema()}
      </Paper>
    </Paper>
  );
};

LyricSchema.propTypes = {};
LyricSchema.defaultProps = {};

export default React.memo(LyricSchema);
