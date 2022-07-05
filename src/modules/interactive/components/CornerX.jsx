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
import { Close } from "@mui/icons-material";

const CornerX = ({ onClose, children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative" }}>
      {children}
      <Button
        sx={{
          padding: theme.spacing(0.5),
          position: "absolute",
          top: 0,
          right: 0,
          minWidth: 0,
          borderRadius: "50%",
          transform: "translate(40%, -25%)",
          fontSize: 12,
        }}
        color="error"
        variant="contained"
        onClick={onClose}
      >
        <Close fontSize="inherit" />
      </Button>
    </Box>
  );
};

CornerX.propTypes = {};
CornerX.defaultProps = {};

export default React.memo(CornerX);
