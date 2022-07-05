// Core imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// UI imports
import { makeStyles } from "@material-ui/core/styles";
import { ResizableBox as ReactResizable } from "react-resizable";
import { Box } from "@mui/material";

const ResizeBox = ({
  width,
  minWidth,
  maxWidth,
  setWidth,
  side,
  barChildren,
  sx,
  children,
}) => {
  const [dragging, setDragging] = useState(false);

  const startResize = () => {
    setDragging(true);
  };

  const stopResize = () => {
    setDragging(false);
  };

  const handleResize = (event, { size: { width: widthArg } }) => {
    setWidth(widthArg);
  };

  const resizeToMax = () => setWidth(maxWidth);

  useEffect(() => {
    if ((width || minWidth) > maxWidth) {
      setWidth(Math.max(maxWidth, minWidth));
    }
  }, [width, maxWidth]);

  //#region jss
  const jssProps = { side: side, barSize: 6, dragging: dragging };
  const classes = useStyles(jssProps);
  //#endregion

  return (
    <ReactResizable
      className={classes.root}
      handle={(h, ref) => (
        <div className={classes.handleWrapper} ref={ref}>
          <div className={classes.handleBar} onDoubleClick={resizeToMax}>
            <div className={classes.barAnimated} />
          </div>
          {barChildren}
        </div>
      )}
      width={width || minWidth}
      resizeHandles={side === "left" ? ["e"] : ["w"]}
      axis="x"
      minConstraints={[minWidth, 0]}
      maxConstraints={[maxWidth, Infinity]}
      onResize={handleResize}
      onResizeStart={startResize}
      onResizeStop={stopResize}
    >
      <Box sx={sx}>{children}</Box>
    </ReactResizable>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
    zIndex: 1,
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    // transition: 'width .2s',
  },
  handleWrapper: {
    position: "absolute",
    width: ({ barSize }) => barSize,
    height: "100%",
    top: 0,
    right: ({ side, barSize }) => (side === "left" ? -barSize / 2 : undefined),
    left: ({ side, barSize }) => (side === "right" ? -barSize / 2 : undefined),
  },
  handleBar: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: ({ side }) => (side === "right" ? 0 : undefined),
    left: ({ side }) => (side === "left" ? 0 : undefined),
    zIndex: 20,
    cursor: "ew-resize",
    display: "flex",
    alignChildren: "center",
    justifyContent: "center",
    "&:hover > $barAnimated": {
      width: "100%",
    },
  },
  barAnimated: {
    backgroundColor: theme.palette.primary.light,
    height: "100%",
    width: ({ dragging }) => (dragging ? "100%" : 0),
    transition: "width .1s",
  },
}));

ResizeBox.propTypes = {
  width: PropTypes.any,
  minWidth: PropTypes.any,
  maxWidth: PropTypes.any,
  setWidth: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  barChildren: PropTypes.any,
  sx: PropTypes.object,
  children: PropTypes.any,
};
ResizeBox.defaultProps = {
  width: 310,
  minWidth: 240,
  maxWidth: 1024,
  barChildren: null,
  sx: {},
  children: null,
};

export default React.memo(ResizeBox);

/**
 * Copyright (C) 2020-2021 Orgo, LLC <evolve@orgo.systems>
 *
 * This file is part of the Orgo Web project.
 * Orgo Web can not be copied and/or distributed without
 * the express written permission of Orgo, LLC.
 */
