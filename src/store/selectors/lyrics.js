import { createSelector } from "reselect";

export const getLyricSource = createSelector(
  [(state) => state.lyricSource],
  (lyricSource) => lyricSource
);

export const getLyricSchema = createSelector(
  [(state) => state.lyricSchema],
  (lyricSchema) => lyricSchema
);

export const getLyricSourceFilterChars = createSelector(
  [(state) => state.lyricSourceFilterChars],
  (lyricSourceFilterChars) => lyricSourceFilterChars
);

export const getGeneratedLyrics = createSelector(
  [(state) => state.generatedLyrics],
  (generatedLyrics) => generatedLyrics
);

export const getStanzaPattern = createSelector(
  [(state) => state.stanzaPattern],
  (stanzaPattern) => stanzaPattern
);

export const getStanzaOptions = createSelector(
  [(state) => state.stanzaOptions],
  (stanzaOptions) => stanzaOptions
);
