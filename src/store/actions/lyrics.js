import actions from ".";
import lyrics from "../../util/lyrics";
import { getFileFormattedDate } from "../../util/time";
import actionTypes from "../actionTypes";
import selectors from "../selectors";

const lyricGenerator = {
  acSetLyricSource: (newLyricSource) => ({
    type: actionTypes.SET_LYRIC_SOURCE,
    payload: {
      newLyricSource: newLyricSource,
    },
  }),
  acSetLyricSchema: (newLyricSchema) => ({
    type: actionTypes.SET_LYRIC_SCHEMA,
    payload: {
      newLyricSchema: newLyricSchema,
    },
  }),
  acSetLyricSourceFilterChars: (newLyricSourceFilterChars) => ({
    type: actionTypes.SET_LYRIC_SOURCE_FILTER_CHARS,
    payload: {
      newLyricSourceFilterChars: newLyricSourceFilterChars,
    },
  }),
  acSetStanzaPattern: (newStanzaPattern) => ({
    type: actionTypes.SET_STANZA_PATTERN,
    payload: {
      newStanzaPattern: newStanzaPattern,
    },
  }),
  acSetStanzaOptions: (newStanzaOptions) => ({
    type: actionTypes.SET_STANZA_OPTIONS,
    payload: {
      newStanzaOptions: newStanzaOptions,
    },
  }),
  acSetGeneratedLyrics: (newGeneratedLyrics) => ({
    type: actionTypes.SET_GENERATED_LYRICS,
    payload: {
      newGeneratedLyrics: newGeneratedLyrics,
    },
  }),
  calculateLyricSchema: () => async (dispatch, getState) => {
    const lyricSource = selectors.getLyricSource(getState());
    const lyricSourceFilterChars = selectors.getLyricSourceFilterChars(
      getState()
    );

    dispatch(actions.incrementLoading());
    const newSchema = lyrics.calculateBackwardSchema(
      lyricSource,
      lyricSourceFilterChars
    );

    dispatch(actions.acSetLyricSchema(newSchema));
    dispatch(actions.decrementLoading());
  },
  generateLyrics: () => async (dispatch, getState) => {
    const lyricSchema = selectors.getLyricSchema(getState());
    const stanzaOptions = selectors.getStanzaOptions(getState());
    const stanzaPattern = selectors.getStanzaPattern(getState());

    // await so we can wait for loading to update
    await dispatch(actions.incrementLoading());

    setTimeout(
      () =>
        lyrics
          .generateLyrics(lyricSchema, stanzaOptions, stanzaPattern)
          .then((finalLyrics) => {
            dispatch(actions.acSetGeneratedLyrics(finalLyrics));
            dispatch(actions.decrementLoading());
          })
          .catch((error) => {
            console.error("ERROR WITHIN GENERATING LYRICS", error);
            dispatch(actions.decrementLoading());
          }),
      250 // need to let the transition occur to show the loader
    );
  },
  copyLyrics: () => async (dispatch, getState) => {
    const generatedLyrics = selectors.getGeneratedLyrics(getState());
    navigator.clipboard.writeText(generatedLyrics);
    // alert("Copied to clipboard");
  },
  sendLyricsToNotes: () => async (dispatch, getState) => {
    const lyrics = selectors.getGeneratedLyrics(getState());
    const notes = selectors.getNotes(getState());
    dispatch(actions.acSetNotes(notes + "\n\n" + lyrics));
    // alert("Copied to clipboard");
  },
  downloadLyrics: () => async (dispatch, getState) => {
    const generatedLyrics = selectors.getGeneratedLyrics(getState());
    dispatch(actions.incrementLoading());
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: getFileFormattedDate() + "_Lyrics.txt",
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
        await fileStream.write(
          new Blob([generatedLyrics], { type: "text/plain" })
        );
        await fileStream.close();
      }
    } catch (error) {
      console.log("error caught downloading lyrics: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  downloadSource: () => async (dispatch, getState) => {
    const lyricSource = selectors.getLyricSource(getState());
    dispatch(actions.incrementLoading());
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: getFileFormattedDate() + "_Source.txt",
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
        await fileStream.write(new Blob([lyricSource], { type: "text/plain" }));
        await fileStream.close();
      }
    } catch (error) {
      console.log("error caught downloading source: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  uploadSource: () => async (dispatch, getState) => {
    dispatch(actions.incrementLoading());
    try {
      const [fileHandle] = await window.showOpenFilePicker({
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
        const file = await fileHandle.getFile();
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          dispatch(actions.acSetLyricSource(event.target.result));
          dispatch(actions.calculateLyricSchema());
        });
        reader.readAsText(file);
      }
    } catch (error) {
      console.log("error caught uploading source: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  downloadSchema: () => async (dispatch, getState) => {
    const schema = selectors.getLyricSchema(getState());
    dispatch(actions.incrementLoading());
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: getFileFormattedDate() + "_Schema.json",
        types: [
          {
            description: "JSON",
            accept: {
              "text/json": [".json"],
            },
          },
        ],
      });
      if (fileHandle) {
        const fileStream = await fileHandle.createWritable();
        await fileStream.write(
          new Blob([JSON.stringify(schema)], { type: "text/json" })
        );
        await fileStream.close();
      }
    } catch (error) {
      console.log("error caught downloading schema: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  uploadSchema: () => async (dispatch, getState) => {
    dispatch(actions.incrementLoading());
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON",
            accept: {
              "text/json": [".json"],
            },
          },
        ],
      });
      if (fileHandle) {
        const file = await fileHandle.getFile();
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          dispatch(actions.acSetLyricSchema(JSON.parse(event.target.result)));
        });
        reader.readAsText(file);
      }
    } catch (error) {
      console.log("error caught uploading schema: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  downloadStanzaOptions: () => async (dispatch, getState) => {
    const output = {
      options: selectors.getStanzaOptions(getState()),
      pattern: selectors.getStanzaPattern(getState()),
    };
    dispatch(actions.incrementLoading());
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: getFileFormattedDate() + "_Options.json",
        types: [
          {
            description: "JSON",
            accept: {
              "text/json": [".json"],
            },
          },
        ],
      });
      if (fileHandle) {
        const fileStream = await fileHandle.createWritable();
        await fileStream.write(
          new Blob([JSON.stringify(output)], { type: "text/json" })
        );
        await fileStream.close();
      }
    } catch (error) {
      console.log("error caught downloading options: ", error);
    }
    dispatch(actions.decrementLoading());
  },
  uploadStanzaOptions: () => async (dispatch, getState) => {
    dispatch(actions.incrementLoading());
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON",
            accept: {
              "text/json": [".json"],
            },
          },
        ],
      });
      if (fileHandle) {
        const file = await fileHandle.getFile();
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          const parsedObj = JSON.parse(event.target.result);
          dispatch(actions.acSetStanzaOptions(parsedObj.options));
          dispatch(actions.acSetStanzaPattern(parsedObj.pattern));
        });
        reader.readAsText(file);
      }
    } catch (error) {
      console.log("error caught uploading schema: ", error);
    }
    dispatch(actions.decrementLoading());
  },
};

export default lyricGenerator;
