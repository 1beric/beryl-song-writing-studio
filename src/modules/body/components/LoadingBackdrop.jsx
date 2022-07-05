import React from "react";
import * as PropTypes from "prop-types";
import { Backdrop, CircularProgress, Paper, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";

const LoadingBackdrop = () => {
  const theme = useTheme();
  const loading = useSelector(selectors.getLoading);

  return (
    <Backdrop open={loading > 0}>
      <CircularProgress size={window.innerHeight * 0.05} />
    </Backdrop>
  );
};

LoadingBackdrop.propTypes = {};
LoadingBackdrop.defaultProps = {};

export default React.memo(LoadingBackdrop);
