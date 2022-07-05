import _ from "lodash";
import isNoun from "../nouns";
import rhymes from "../rhymes";
import syllablesIn from "../syllables";
import { JOINER, START, END } from "./schema";

export const simpleChoose = (options) =>
  options[_.random(0, options.length - 1, false)];

export const weightedChoose = (weights) => {
  const options = Object.keys(weights);
  const flatOptions = [];
  for (let index = 0; index < options.length; index++) {
    const option = options[index];
    const amt = weights[option];
    for (let time = 0; time < amt; time++) {
      flatOptions.push(option);
    }
  }
  return simpleChoose(flatOptions);
};

const generateRhymes = (schema) => {
  // choose a random word
  const digraphs = Object.keys(schema);
  const choices = _.uniq(
    digraphs.map((digraph) => digraph.split(" ")[0])
  ).filter((potentialChoice) => potentialChoice && isNoun(potentialChoice));
  const choice = simpleChoose(choices);
  // get the last part of the hyphen if it exists;
  const splitChoice = choice.split("-");
  const rhymeChoice = splitChoice[splitChoice.length - 1];
  // get rhyming words, filter to ensure the schema contains the word, and return the unique list
  return _.uniq([
    ...rhymes(rhymeChoice)
      .map((rhyme) => rhyme.word.toLowerCase())
      .filter((word) => schema[word]),
    rhymeChoice,
  ]);
};

const generateRhymeSchema = (schema, options) => {
  const rhymeSchema = {};
  for (
    let stanzaIndex = 0;
    stanzaIndex < Object.keys(options).length;
    stanzaIndex++
  ) {
    const stanzaId = Object.keys(options)[stanzaIndex];
    const stanza = options[stanzaId];
    for (let lineIndex = 0; lineIndex < stanza.lines.length; lineIndex++) {
      const { rhyme } = stanza.lines[lineIndex];
      while (rhyme && !rhymeSchema[rhyme]) {
        const generatedRhymes = generateRhymes(schema);
        if (generatedRhymes.length > 3) {
          rhymeSchema[rhyme] = generatedRhymes;
        }
      }
    }
  }
  console.log(rhymeSchema);

  return rhymeSchema;
};

export const getEndWord = (schema, rhyme = null, rhymeSchema = {}) => {
  let choice = START;

  if (rhyme && rhymeSchema[rhyme]) {
    // get rhymes, choose a random rhyme
    const availableRhymes = rhymeSchema[rhyme];
    choice = simpleChoose(availableRhymes);
  } else {
    // choose a random word
    const digraphs = Object.keys(schema);
    const choices = _.uniq(
      digraphs.map((digraph) => digraph.split(" ")[0])
    ).filter((potentialChoice) => isNoun(potentialChoice));
    choice = simpleChoose(choices);
  }

  const digraph = [choice, END];
  return [choice, digraph, rhymeSchema];
};

export const getPreviousWord = ([word1, word2], schema) => {
  const weightedOptions = schema[word1 + JOINER + word2] || schema[word1];
  if (!weightedOptions) {
    console.error(word1, "does not have an entry in the schema");
    throw new Error("SCHEMA DOES NOT HAVE ENTRY FOR " + word1);
  }
  const choice = weightedChoose(weightedOptions);
  const digraph = [choice, word1];
  return [choice, digraph];
};

const generateLine = async (schema, rhymeSchema, lineOptions, index) => {
  const lineArray = [];

  let previousWord, digraph;
  [previousWord, digraph, rhymeSchema] = getEndWord(
    schema,
    lineOptions.rhyme,
    rhymeSchema
  );
  lineArray.splice(0, 0, previousWord);

  let syllable = syllablesIn(previousWord);
  while (syllable < lineOptions.syllables) {
    [previousWord, digraph] = getPreviousWord(digraph, schema);
    lineArray.splice(0, 0, previousWord);
    if (!previousWord) console.log(lineArray);
    let syllablesInPrevious = syllablesIn(previousWord);
    syllable += syllablesInPrevious;
  }

  return lineArray.join(" ");
};

const generateStanza = async (schema, rhymeSchema, stanza) => {
  const promises = [];

  for (let lineIndex = 0; lineIndex < stanza.lines.length; lineIndex++) {
    const lineOptions = stanza.lines[lineIndex];
    promises.push(generateLine(schema, rhymeSchema, lineOptions, lineIndex));
  }

  return Promise.all(promises).then((lines) => {
    return { stanzaId: stanza.id, lyrics: lines.join("\n") };
  });
};

export const generateLyrics = async (schema, options, pattern) => {
  const rhymeSchema = generateRhymeSchema(schema, options);

  const promises = [];

  const optionArray = Object.keys(options);
  for (let stanzaIndex = 0; stanzaIndex < optionArray.length; stanzaIndex++) {
    const stanzaId = optionArray[stanzaIndex];
    const stanza = options[stanzaId];

    promises.push(generateStanza(schema, rhymeSchema, stanza));
  }

  return Promise.all(promises).then((resultArray) => {
    const generatedStanzas = resultArray.reduce(
      (result, { stanzaId, lyrics }) => ({
        ...result,
        [stanzaId]: lyrics,
      }),
      {}
    );
    return pattern.map((stanzaId) => generatedStanzas[stanzaId]).join("\n\n");
  });
};
