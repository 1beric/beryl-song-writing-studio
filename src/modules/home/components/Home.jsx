import React, { useState } from "react";
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
import actions from "../../../store/actions";
import InputTextBox from "../../interactive/components/InputTextBox";
import StepperStep from "../../stepper/components/StepperStep";
import SortableStep from "./SortableStep";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import BerylPopover from "../../interactive/components/BerylPopover";
import { isMobile } from "../../../util/platform";

const Home = () => {
  const theme = useTheme();

  const steps = useSelector(selectors.getSteps);

  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = steps.findIndex((obj) => obj.id === active.id);
      const newIndex = steps.findIndex((obj) => obj.id === over.id);
      const newSteps = arrayMove(steps, oldIndex, newIndex);
      dispatch(actions.acSetSteps(newSteps));
    }
  };

  const handleStartClicked = () => {
    dispatch(actions.startSteps());
  };

  const renderSteps = () =>
    steps.map(({ id, title }, index) => (
      <SortableStep key={id} title={title} id={id} />
    ));

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        width: "60%",
        minWidth: isMobile() ? 0 : 256,
        maxHeight: "-webkit-fill-available",
        // height: "-webkit-fill-available",
        // marginLeft: theme.spacing(1),
      }}
    >
      <Typography variant="h5">Beryl Song-Writing Studio</Typography>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
          padding: theme.spacing(2),
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Typography sx={{ alignSelf: "start", marginLeft: theme.spacing(1) }}>
          Set the order and timing of each step here:
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={steps}
            strategy={verticalListSortingStrategy}
            handle
          >
            {renderSteps()}
          </SortableContext>
        </DndContext>
      </Paper>
      <Button variant="contained" onClick={handleStartClicked}>
        Start
      </Button>
    </Paper>
  );
};

Home.propTypes = {};
Home.defaultProps = {};

export default React.memo(Home);
