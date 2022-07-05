import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
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
import LyricInformation from "./LyricInformation";
import { ArrowUpward, Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const InformationPanel = () => {
  const theme = useTheme();

  const information = useSelector(selectors.getInformation);

  const [expanded, setExpanded] = useState(true);
  const handleExpandToggleClicked = () => setExpanded((prev) => !prev);

  const dispatch = useDispatch();

  const handleClearInformationClicked = () => {
    dispatch(actions.acSetInformation({}));
  };

  const renderInformation = () => {
    switch (information.type) {
      case "lyric":
        return <LyricInformation lyric={information.data} />;
      default:
        return <LyricInformation lyric="" />;
    }
  };

  return (
    <Paper
      sx={{
        width: "20%",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        minWidth: 256,
        maxHeight: "-webkit-fill-available",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: `calc(100% - ${theme.spacing(2)})`,
          gap: theme.spacing(2),
          justifyContent: "space-between",
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
        }}
      >
        <Typography variant="h5">Information Panel</Typography>
        <ButtonGroup variant="contained">
          <Button
            variant="contained"
            onClick={handleExpandToggleClicked}
            sx={{ minWidth: 0, padding: theme.spacing(0.5) }}
          >
            <ArrowUpward
              sx={{
                transform: !expanded && "rotate(180deg)",
                transition: "transform .2s",
              }}
            />
          </Button>
          <Button
            variant="contained"
            onClick={handleClearInformationClicked}
            sx={{ minWidth: 0, padding: theme.spacing(0.5) }}
          >
            <Close />
          </Button>
        </ButtonGroup>
      </Box>
      {expanded && renderInformation()}
    </Paper>
  );
};

InformationPanel.propTypes = {};
InformationPanel.defaultProps = {};

export default React.memo(InformationPanel);
