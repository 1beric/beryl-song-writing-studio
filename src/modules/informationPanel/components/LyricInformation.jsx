import React, { useCallback, useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  InputBase,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import selectors from "../../../store/selectors";
import { useDispatch } from "react-redux";
import actions from "../../../store/actions";
import InputTextBox from "../../interactive/components/InputTextBox";
import rhymesWith from "../../../util/rhymes";
import _ from "lodash";
import syllablesIn from "../../../util/syllables";
import synonymsOf from "synonyms";

const useRhymes = (lyric) => {
  const [rhymeArray, setRhymeArray] = useState(
    _.uniq(rhymesWith(lyric.toLowerCase()).map((obj) => obj.word.toLowerCase()))
      .map((rhyme) => ({ syllables: syllablesIn(rhyme), rhyme: rhyme }), {})
      .sort(({ syllables: a }, { syllables: b }) => a - b)
  );

  const recalculate = (newLyric) => {
    const plainArray = _.uniq(
      rhymesWith(newLyric.toLowerCase()).map((obj) => obj.word.toLowerCase())
    );
    const syllablesArray = plainArray
      .map((rhyme) => ({ syllables: syllablesIn(rhyme), rhyme: rhyme }), {})
      .sort(({ syllables: a }, { syllables: b }) => a - b);
    setRhymeArray(syllablesArray);
  };

  return [rhymeArray, recalculate];
};

const useSynonyms = (lyric) => {
  const [synonymArray, setSynonymArray] = useState([]);

  const recalculate = (newLyric) => {
    const plainArray = _.uniq(
      Object.values(synonymsOf(newLyric.toLowerCase()) || {}).reduce(
        (result, array) => [...result, ...array],
        []
      )
    );
    const syllablesArray = plainArray
      .map(
        (synonym) => ({ syllables: syllablesIn(synonym), synonym: synonym }),
        {}
      )
      .sort(({ syllables: a }, { syllables: b }) => a - b);
    setSynonymArray(syllablesArray);
  };

  return [synonymArray, recalculate];
};

const LyricInformation = ({ lyric: lyricProp }) => {
  const theme = useTheme();

  const filters = useSelector(selectors.getLyricSourceFilterChars);

  const [lyric, setLyric] = useState(lyricProp);
  const [rhymes, recalculateRhymes] = useRhymes(lyric);
  const [synonyms, recalculateSynonyms] = useSynonyms(lyric);

  useEffect(() => {
    setLyric(lyricProp);
    recalculateSynonyms(lyricProp);
    recalculateRhymes(lyricProp);
  }, [lyricProp]);

  const [tab, setTab] = useState("rhymes");

  const handleTabSelected = (event, value) => setTab(value);

  const dispatch = useDispatch();

  const handleLyricChanged = (event) => {
    const newLyric = event.target.value
      .split("")
      .filter(
        (char) =>
          !filters.includes(char) &&
          char !== " " &&
          char !== "\t" &&
          char !== "\n"
      )
      .join("");
    setLyric(newLyric);
  };

  const handleEnterPressed = () => {
    dispatch(
      actions.acSetInformation({
        type: "lyric",
        data: lyric,
      })
    );
    // recalculateSynonyms(lyric);
    // recalculateRhymes(lyric);
  };

  const renderTabs = () => (
    <Tabs value={tab} onChange={handleTabSelected} variant="fullWidth">
      {Object.keys(tabs).map((key) => (
        <Tab value={key} key={key} label={tabs[key].label} />
      ))}
    </Tabs>
  );

  const renderRhymes = () =>
    rhymes.map(({ syllables, rhyme }) => (
      <Typography key={rhyme}>
        {syllables} {rhyme}
      </Typography>
    ));

  const renderSynonyms = () =>
    synonyms.map(({ syllables, synonym }) => (
      <Typography key={synonym}>
        {syllables} {synonym}
      </Typography>
    ));

  const tabs = {
    rhymes: {
      value: "rhymes",
      label: "Rhymes",
      render: renderRhymes,
    },
    synonyms: {
      value: "synonyms",
      label: "Synonyms",
      render: renderSynonyms,
    },
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        width: `calc(100% - ${theme.spacing(2)})`,
        // maxHeight: "100%",
        maxHeight: "100%",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(1),
        }}
      >
        <Typography variant="h6">Lyric:</Typography>
        <InputTextBox
          elevation={3}
          value={lyric}
          onChange={handleLyricChanged}
          onEnterPressed={handleEnterPressed}
        />
        <Button onClick={handleEnterPressed}>Submit</Button>
      </Box>
      {renderTabs()}
      <Box
        sx={{
          maxHeight: "-webkit-fill-available",
          overflowY: "auto",
        }}
      >
        {tabs[tab].render()}
      </Box>
    </Paper>
  );
};

LyricInformation.propTypes = {
  lyric: PropTypes.string,
};
LyricInformation.defaultProps = {
  lyric: "",
};

export default React.memo(LyricInformation);
