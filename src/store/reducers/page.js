import actionTypes from "../actionTypes";

const page = {
  handleSetModal: [
    actionTypes.SET_MODAL,
    (state, { payload: { newModal } }) => ({
      ...state,
      modal: newModal,
    }),
  ],
  handleSetHeaderType: [
    actionTypes.SET_HEADER_TYPE,
    (state, { payload: { newHeaderType } }) => ({
      ...state,
      headerType: newHeaderType,
    }),
  ],
  handleSetBodyType: [
    actionTypes.SET_BODY_TYPE,
    (state, { payload: { newBodyType } }) => ({
      ...state,
      bodyType: newBodyType,
    }),
  ],
  handleSetLoading: [
    actionTypes.SET_LOADING,
    (state, { payload: { newLoading } }) => ({
      ...state,
      loading: Math.max(newLoading, 0),
    }),
  ],
  handleSetInformation: [
    actionTypes.SET_INFORMATION,
    (state, { payload: { newInformation } }) => ({
      ...state,
      information: newInformation,
    }),
  ],
  handleSetTimeLeft: [
    actionTypes.SET_TIME_LEFT,
    (state, { payload: { newTimeLeft } }) => ({
      ...state,
      timeLeft: newTimeLeft,
    }),
  ],
  handleSetTimerPlaying: [
    actionTypes.SET_TIMER_PLAYING,
    (state, { payload: { newTimerPlaying } }) => ({
      ...state,
      timerPlaying: newTimerPlaying,
    }),
  ],
  handleSetTimerHandle: [
    actionTypes.SET_TIMER_HANDLE,
    (state, { payload: { newTimerHandle } }) => ({
      ...state,
      timerHandle: newTimerHandle,
    }),
  ],
  handleSetActiveStep: [
    actionTypes.SET_ACTIVE_STEP,
    (state, { payload: { newActiveStep } }) => ({
      ...state,
      activeStep: newActiveStep,
    }),
  ],
  handleSetSteps: [
    actionTypes.SET_STEPS,
    (state, { payload: { newSteps } }) => ({
      ...state,
      steps: newSteps,
    }),
  ],
};

export default page;
