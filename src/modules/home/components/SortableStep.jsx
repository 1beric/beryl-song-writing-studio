import React, { useRef, useState } from "react";
import * as PropTypes from "prop-types";
import {
  alpha,
  Box,
  Button,
  Menu,
  Paper,
  Popover,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import BODY_TYPES from "../../body/util/bodyTypes";
import actions from "../../../store/actions";
import { DragHandle } from "@mui/icons-material";
import StepperStep from "../../stepper/components/StepperStep";
import { formatTwoDigitTime } from "../../../util/time";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BerylPopover from "../../interactive/components/BerylPopover";
import defaultSteps from "../../stepper/util/steps";

const SortableStep = ({ title, id }) => {
  const theme = useTheme();

  const steps = useSelector(selectors.getSteps);

  const time = steps.find((obj) => obj.id === id).time / 1000 / 60;

  const {
    attributes,
    listeners,
    setNodeRef: sortableRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: id });

  const dispatch = useDispatch();

  const handleTimeChange = (event) => {
    if (event.target.value === "") event.target.value = 0;
    const { value } = event.target;
    if (
      value.split("").reduce((res, cur) => res || cur < "0" || cur > "9", false)
    )
      return;
    const newTime = Number.parseInt(value) * 60 * 1000;
    const index = steps.findIndex((obj) => obj.id === id);
    const newSteps = [...steps];
    newSteps.splice(index, 1, { ...steps[index], time: newTime });
    dispatch(actions.acSetSteps(newSteps));
  };

  return (
    <div
      ref={sortableRef}
      style={{
        transform: transform && CSS.Transform.toString({ ...transform, x: 0 }),
        transition: transition,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
          borderRadius: theme.spacing(0.75),
          // cursor: "grab",
          width: 384,

          backgroundColor: alpha(theme.palette.primary.light, 0.1),
          color: theme.palette.primary.main,
          border: `1px solid ${
            isDragging ? theme.palette.primary.main : "transparent"
          }`,

          transition: "color .1s, background-color .1s, border .1s",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.light, 0.2),
          },
        }}
      >
        <Typography sx={{ zIndex: 1 }}>{title}</Typography>
        <Box
          sx={{
            display: "flex",
            gap: theme.spacing(1),
            alignItmes: "center",
          }}
        >
          <TextField
            size="small"
            label="Time"
            placeholder={String(defaultSteps[id].time / 60 / 1000)}
            value={time === 0 ? "" : String(time)}
            onChange={handleTimeChange}
            sx={{
              width: 96,
            }}
          />
          <Button
            size="small"
            sx={{ minWidth: 0, cursor: "grab" }}
            {...attributes}
            {...listeners}
          >
            <DragHandle />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

SortableStep.propTypes = {
  title: PropTypes.string.isRequired,
};
SortableStep.defaultProps = {};

export default React.memo(SortableStep);
