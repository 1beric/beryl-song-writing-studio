import actions from ".";
import BODY_TYPES from "../../modules/body/util/bodyTypes";
import { getFileFormattedDate } from "../../util/time";
import actionTypes from "../actionTypes";
import selectors from "../selectors";

const notes = {
  acSetNotes: (newNotes) => ({
    type: actionTypes.SET_NOTES,
    payload: {
      newNotes: newNotes,
    },
  }),
  downloadNotes: () => async (dispatch, getState) => {
    const notes = selectors.getNotes(getState());
    dispatch(actions.incrementLoading());
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: getFileFormattedDate() + "_Notes.txt",
        types: [
          {
            description: "Plain Text",
            accept: {
              "text/plain": [".txt"],
            },
          },
        ],
      });
      if (fileHandle) {
        const fileStream = await fileHandle.createWritable();
        await fileStream.write(new Blob([notes], { type: "text/plain" }));
        await fileStream.close();
      }
    } catch (error) {
      console.log("error caught downloading notes: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  copyNotes: () => async (dispatch, getState) => {
    const notes = selectors.getNotes(getState());
    navigator.clipboard.writeText(notes);
  },
};

export default notes;
