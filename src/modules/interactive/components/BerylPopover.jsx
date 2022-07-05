import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { alpha, InputBase, Paper, Popover, useTheme } from "@mui/material";

const BerylPopover = ({ position, onClose, data }) => {
  const theme = useTheme();

  const [topLeft, setTopLeft] = useState({
    top: position.top,
    left: position.left,
  });

  useEffect(() => {
    if (position.top && position.left) {
      setTopLeft({ top: position.top, left: position.left });
    }
  }, [position]);

  const [inputFocused, setInputFocused] = useState(false);
  const handleInputBlur = () => setInputFocused(false);
  const handleInputFocus = () => setInputFocused(true);

  return (
    <Popover
      open={Boolean(position.left && position.top)}
      onClose={onClose}
      // anchorEl={position.target}
      anchorReference="none"
      // anchorPosition={{
      //   left: position.left || 0,
      //   top: position.top || 0,
      // }}
      sx={{ top: topLeft.top, left: topLeft.left }}
      TransitionProps={{
        onEnded: () => setTopLeft({ top: null, left: null }),
      }}
    >
      {data}
    </Popover>
  );
};

BerylPopover.propTypes = {
  position: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.element,
};
BerylPopover.defaultProps = {
  position: {},
  data: null,
};

export default React.memo(BerylPopover);
