import actions from ".";
import BODY_TYPES from "../../modules/body/util/bodyTypes";
import { getFileFormattedDate } from "../../util/time";
import actionTypes from "../actionTypes";
import selectors from "../selectors";

const page = {
  acSetModal: (newModal) => ({
    type: actionTypes.SET_MODAL,
    payload: {
      newModal: newModal,
    },
  }),
  acSetBodyType: (newBodyType) => ({
    type: actionTypes.SET_BODY_TYPE,
    payload: {
      newBodyType: newBodyType,
    },
  }),
  acSetHeaderType: (newHeaderType) => ({
    type: actionTypes.SET_HEADER_TYPE,
    payload: {
      newHeaderType: newHeaderType,
    },
  }),
  acSetLoading: (newLoading) => ({
    type: actionTypes.SET_LOADING,
    payload: {
      newLoading: newLoading,
    },
  }),
  acSetInformation: (newInformation) => ({
    type: actionTypes.SET_INFORMATION,
    payload: {
      newInformation: newInformation,
    },
  }),
  acSetActiveStep: (newActiveStep) => ({
    type: actionTypes.SET_ACTIVE_STEP,
    payload: {
      newActiveStep: newActiveStep,
    },
  }),
  acSetSteps: (newSteps) => ({
    type: actionTypes.SET_STEPS,
    payload: {
      newSteps: newSteps,
    },
  }),
  acSetTimeLeft: (newTimeLeft) => ({
    type: actionTypes.SET_TIME_LEFT,
    payload: {
      newTimeLeft: newTimeLeft,
    },
  }),
  acSetTimerPlaying: (newTimerPlaying) => ({
    type: actionTypes.SET_TIMER_PLAYING,
    payload: {
      newTimerPlaying: newTimerPlaying,
    },
  }),
  acSetTimerHandle: (newTimerHandle) => ({
    type: actionTypes.SET_TIMER_HANDLE,
    payload: {
      newTimerHandle: newTimerHandle,
    },
  }),
  incrementLoading: () => async (dispatch, getState) => {
    const loading = selectors.getLoading(getState());
    dispatch(actions.acSetLoading(loading + 1));
  },
  decrementLoading: () => async (dispatch, getState) => {
    const loading = selectors.getLoading(getState());
    dispatch(actions.acSetLoading(loading - 1));
  },
  goToHome: () => async (dispatch, getState) => {
    dispatch(actions.stopTimer());
    dispatch(actions.acSetActiveStep(null));
    dispatch(actions.acSetBodyType(BODY_TYPES.HOME.id));
  },
  startSteps: () => async (dispatch, getState) => {
    const steps = selectors.getSteps(getState());
    const newActiveStep = steps[0];
    dispatch(actions.acSetActiveStep(newActiveStep.id));
    dispatch(actions.acSetBodyType(newActiveStep.components[0]));
    dispatch(actions.acSetTimeLeft(newActiveStep.time));
    dispatch(actions.playTimer());
  },
  promptContinue: () => async (dispatch, getState) => {
    dispatch(
      actions.acSetModal({
        type: "continue",
        data: null,
      })
    );
  },
  continueStep: () => async (dispatch, getState) => {
    const timerHandle = selectors.getTimerHandle(getState());
    if (timerHandle) clearInterval(timerHandle);
    dispatch(actions.acSetTimerHandle(null));

    const steps = selectors.getSteps(getState());
    const activeStepId = selectors.getActiveStepId(getState());
    const activeIndex = steps.findIndex((obj) => obj.id === activeStepId);
    const newActiveStep = steps[activeIndex + 1];

    if (newActiveStep) {
      dispatch(actions.acSetBodyType(newActiveStep.components[0]));
      dispatch(actions.acSetActiveStep(newActiveStep.id));
      dispatch(actions.acSetTimeLeft(newActiveStep.time));
      dispatch(actions.playTimer());
    } else {
      // GO TO THE FINISHED PAGE
      dispatch(actions.acSetActiveStep(null));
      dispatch(actions.acSetBodyType(BODY_TYPES.FINISHED.id));
    }
  },
  backStep: () => async (dispatch, getState) => {
    const timerHandle = selectors.getTimerHandle(getState());
    if (timerHandle) clearInterval(timerHandle);
    dispatch(actions.acSetTimerHandle(null));

    const steps = selectors.getSteps(getState());
    const activeStepId = selectors.getActiveStepId(getState());
    const activeIndex = steps.findIndex((obj) => obj.id === activeStepId);
    const newActiveStep = steps[activeIndex - 1];

    if (newActiveStep) {
      dispatch(actions.acSetBodyType(newActiveStep.components[0]));
      dispatch(actions.acSetActiveStep(newActiveStep.id));
      dispatch(actions.acSetTimeLeft(newActiveStep.time));
      dispatch(actions.playTimer());
    } else {
      // GO TO THE HOME PAGE
      dispatch(actions.acSetActiveStep(null));
      dispatch(actions.acSetBodyType(BODY_TYPES.HOME.id));
    }
  },
  playTimer: () => async (dispatch, getState) => {
    const timerHandle = selectors.getTimerHandle(getState());
    if (timerHandle) clearInterval(timerHandle);
    const newHandle = setInterval(() => {
      const timeLeft = selectors.getTimeLeft(getState());
      const newTime = timeLeft - 1000;
      if (newTime <= 0) {
        dispatch(actions.acSetTimeLeft(0));
        dispatch(actions.promptContinue());
      } else {
        dispatch(actions.acSetTimeLeft(newTime));
      }
    }, 1000);
    dispatch(actions.acSetTimerHandle(newHandle));
    dispatch(actions.acSetTimerPlaying(true));
  },
  pauseTimer: () => async (dispatch, getState) => {
    const timerHandle = selectors.getTimerHandle(getState());
    if (timerHandle) clearInterval(timerHandle);
    dispatch(actions.acSetTimerHandle(null));
    dispatch(actions.acSetTimerPlaying(false));
  },
  stopTimer: () => async (dispatch, getState) => {
    const timerHandle = selectors.getTimerHandle(getState());
    const activeStep = selectors.getActiveStep(getState());
    if (timerHandle) clearInterval(timerHandle);
    dispatch(actions.acSetTimerHandle(null));
    dispatch(actions.acSetTimerPlaying(false));
    if (activeStep) dispatch(actions.acSetTimeLeft(activeStep.time));
  },
  rewindTimer: () => async (dispatch, getState) => {
    const activeStep = selectors.getActiveStep(getState());
    const timeLeft = selectors.getTimeLeft(getState());
    dispatch(
      actions.acSetTimeLeft(Math.min(activeStep.time, timeLeft + 15 * 1000))
    );
  },
  forwardTimer: () => async (dispatch, getState) => {
    const timeLeft = selectors.getTimeLeft(getState());
    dispatch(actions.acSetTimeLeft(Math.max(0, timeLeft - 15 * 1000)));
  },
};

export default page;
