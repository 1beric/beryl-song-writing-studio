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
import BODY_TYPES from "../../body/util/bodyTypes";
import actions from "../../../store/actions";
import {
  FastForward,
  FastRewind,
  Pause,
  PlayArrow,
  Preview,
  Stop,
} from "@mui/icons-material";
import { formatTwoDigitTime } from "../../../util/time";

const Timer = ({ continueComponent, backComponent }) => {
  const theme = useTheme();

  const activeStep = useSelector(selectors.getActiveStep);
  const timeLeft = useSelector(selectors.getTimeLeft);
  const playing = useSelector(selectors.getTimerPlaying);

  const formattedTimeLeft = formatTwoDigitTime(timeLeft);

  const dispatch = useDispatch();

  const handleStopClicked = () => {
    dispatch(actions.stopTimer());
  };

  const handleRewindClicked = () => {
    dispatch(actions.rewindTimer());
  };

  const handleForwardClicked = () => {
    dispatch(actions.forwardTimer());
  };

  const handlePlayPauseClicked = () => {
    if (playing) {
      dispatch(actions.pauseTimer());
    } else {
      dispatch(actions.playTimer());
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        width: "60%",
        minWidth: 256,
        maxHeight: "-webkit-fill-available",
        // height: "-webkit-fill-available",
        // marginLeft: theme.spacing(1),
      }}
    >
      <ButtonGroup variant="contained">
        <Button
          variant="contained"
          onClick={handleRewindClicked}
          disabled={activeStep.time === timeLeft}
        >
          <FastRewind />
        </Button>
        <Button
          variant="contained"
          onClick={handleStopClicked}
          disabled={!playing && timeLeft === activeStep.time}
        >
          <Stop />
        </Button>
        <Button variant="contained" onClick={handlePlayPauseClicked}>
          {playing ? <Pause /> : <PlayArrow />}
        </Button>
        <Button
          variant="contained"
          onClick={handleForwardClicked}
          disabled={timeLeft <= 0}
        >
          <FastForward />
        </Button>
      </ButtonGroup>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
          borderRadius: theme.spacing(1),
          width: `calc(100% - ${theme.spacing(8)})`,
          color: theme.palette.primary.main,
          cursor: "default",
          backgroundColor: alpha(theme.palette.primary.light, 0.1),

          // transition: "color .2s, background-color .2s",
          // "&:hover": {
          //   backgroundColor: theme.palette.primary.main,
          //   color: theme.palette.primary.contrastText,
          // },
        }}
      >
        <Typography variant="h2">{formattedTimeLeft}</Typography>
      </Box>
      <Box sx={{ alignSelf: "end", display: "flex", gap: theme.spacing(1) }}>
        {backComponent}
        {continueComponent}
      </Box>
    </Paper>
  );
};

Timer.propTypes = {};
Timer.defaultProps = {};

export default React.memo(Timer);
