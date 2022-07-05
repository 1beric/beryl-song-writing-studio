import actionTypes from "../actionTypes";

const notes = {
  handleSetNotes: [
    actionTypes.SET_NOTES,
    (state, { payload: { newNotes } }) => ({
      ...state,
      notes: newNotes,
    }),
  ],
};

export default notes;
