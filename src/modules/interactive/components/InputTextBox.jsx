import React, { useState } from "react";
import * as PropTypes from "prop-types";
import { alpha, InputBase, Paper, useTheme } from "@mui/material";

const InputTextBox = ({
  value,
  onChange,
  color,
  onRightClick,
  onEnterPressed,
  elevation,
}) => {
  const theme = useTheme();

  const [inputFocused, setInputFocused] = useState(false);
  const handleInputBlur = () => setInputFocused(false);
  const handleInputFocus = () => setInputFocused(true);

  const handleKeyUp = (event) => {
    if (event.key === "Enter") onEnterPressed();
  };

  return (
    <Paper
      elevation={elevation}
      sx={{
        width: `calc(100% - ${theme.spacing(2)} - 4px)`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        flexGrow: 1,
        // maxHeight: "-webkit-fill-available",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        border: inputFocused
          ? `2px solid ${theme.palette[color].main}`
          : `2px solid transparent`,
        transition: "border .1s",
        "&:hover": {
          border: inputFocused
            ? `2px solid ${theme.palette[color].light} !important`
            : `2px solid ${alpha(theme.palette[color].light, 0.6)} !important`,
        },
      }}
    >
      <InputBase
        multiline
        value={value}
        onChange={onChange}
        onContextMenu={onRightClick}
        onKeyUp={handleKeyUp}
        inputMode="text"
        inputProps={{
          onFocus: handleInputFocus,
          onBlur: handleInputBlur,
        }}
      />
    </Paper>
  );
};

InputTextBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  onRightClick: PropTypes.func,
  onEnterPressed: PropTypes.func,
  elevation: PropTypes.number,
};
InputTextBox.defaultProps = {
  color: "primary",
  onRightClick: () => {},
  onEnterPressed: () => {},
  elevation: 1,
};

export default React.memo(InputTextBox);
