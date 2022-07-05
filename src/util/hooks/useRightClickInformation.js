import { useState } from "react";
import { useDispatch } from "react-redux";
import actions from "../../store/actions";
import { Button, ButtonGroup } from "@mui/material";

import BerylPopover from "../../modules/interactive/components/BerylPopover";

const useRightClickInformation = () => {
  const [rightClick, setRightClick] = useState({});

  const dispatch = useDispatch();

  const openRightClickMenu = (event) => {
    setRightClick({
      top: event.clientY,
      left: event.clientX,
      target: event.target,
    });
    event.preventDefault();
  };

  const handleRightClickMenuClosed = () => {
    setRightClick({});
  };

  const handleGetInformationClicked = () => {
    const selectedText = rightClick.target.value.slice(
      rightClick.target.selectionStart,
      rightClick.target.selectionEnd
    );
    dispatch(actions.acSetInformation({ type: "lyric", data: selectedText }));
    handleRightClickMenuClosed();
  };

  const handleLogClicked = () => {
    const selectedText = rightClick.target.value.slice(
      rightClick.target.selectionStart,
      rightClick.target.selectionEnd
    );
    console.log(selectedText);
    handleRightClickMenuClosed();
  };

  const rightClickMenu = (
    <BerylPopover
      position={rightClick}
      onClose={handleRightClickMenuClosed}
      data={
        <ButtonGroup variant="contained" size="small" orientation="vertical">
          <Button
            variant="contained"
            onClick={handleGetInformationClicked}
            size="small"
          >
            Get Information
          </Button>
          <Button variant="contained" onClick={handleLogClicked} size="small">
            Log
          </Button>
        </ButtonGroup>
      }
    />
  );

  return [openRightClickMenu, rightClickMenu];
};

export default useRightClickInformation;
