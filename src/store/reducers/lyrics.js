import actionTypes from "../actionTypes";

const lyricGenerator = {
  handleSetLyricSource: [
    actionTypes.SET_LYRIC_SOURCE,
    (state, { payload: { newLyricSource } }) => ({
      ...state,
      lyricSource: newLyricSource,
    }),
  ],
  handleSetLyricSchema: [
    actionTypes.SET_LYRIC_SCHEMA,
    (state, { payload: { newLyricSchema } }) => ({
      ...state,
      lyricSchema: newLyricSchema,
    }),
  ],
  handleSetLyricSourceFilterChars: [
    actionTypes.SET_LYRIC_SOURCE_FILTER_CHARS,
    (state, { payload: { newLyricSourceFilterChars } }) => ({
      ...state,
      lyricSourceFilterChars: newLyricSourceFilterChars,
    }),
  ],
  handleSetStanzaPattern: [
    actionTypes.SET_STANZA_PATTERN,
    (state, { payload: { newStanzaPattern } }) => ({
      ...state,
      stanzaPattern: newStanzaPattern,
    }),
  ],
  handleSetStanzaOptions: [
    actionTypes.SET_STANZA_OPTIONS,
    (state, { payload: { newStanzaOptions } }) => ({
      ...state,
      stanzaOptions: newStanzaOptions,
    }),
  ],
  handleSetGeneratedLyrics: [
    actionTypes.SET_GENERATED_LYRICS,
    (state, { payload: { newGeneratedLyrics } }) => ({
      ...state,
      generatedLyrics: newGeneratedLyrics,
    }),
  ],
};

export default lyricGenerator;
