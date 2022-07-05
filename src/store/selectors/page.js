import { createSelector } from "reselect";

export const getModal = createSelector(
  [(state) => state.modal],
  (modal) => modal
);

export const getBodyType = createSelector(
  [(state) => state.bodyType],
  (bodyType) => bodyType
);

export const getHeaderType = createSelector(
  [(state) => state.headerType],
  (headerType) => headerType
);

export const getLoading = createSelector(
  [(state) => state.loading],
  (loading) => loading
);

export const getInformation = createSelector(
  [(state) => state.information],
  (information) => information
);

export const getSteps = createSelector(
  [(state) => state.steps],
  (steps) => steps
);

export const getActiveStepId = createSelector(
  [(state) => state.activeStep],
  (activeStep) => activeStep
);

export const getActiveStep = createSelector(
  [(state) => state.steps, (state) => state.activeStep],
  (steps, activeStep) => steps.find((obj) => obj.id === activeStep)
);

export const getTimeLeft = createSelector(
  [(state) => state.timeLeft],
  (timeLeft) => timeLeft
);

export const getTimerPlaying = createSelector(
  [(state) => state.timerPlaying],
  (timerPlaying) => timerPlaying
);

export const getTimerHandle = createSelector(
  [(state) => state.timerHandle],
  (timerHandle) => timerHandle
);

export const getNotes = createSelector(
  [(state) => state.notes],
  (notes) => notes
);
