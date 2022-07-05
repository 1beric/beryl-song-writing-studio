export const JOINER = " ";
export const START = "^^";
export const END = "$$";

const updateSchema = (schema, key, word) => {
  if (!schema[key]) {
    schema[key] = {};
  }
  if (!schema[key][word]) {
    schema[key][word] = 0;
  }
  schema[key][word] = schema[key][word] + 1;
  return schema;
};

export const calculateBackwardSchema = (source, filters) => {
  const lines = source.split("\n");

  const words = lines.reduce((result, line) => {
    const lineArray = line
      .toLowerCase()
      .split("")
      .filter((letter) => !filters.includes(letter))
      .join("")
      .split(/ |\t/)
      .filter((word) => word.length > 0)
      .reverse();

    return [...lineArray, ...result];
  }, []);

  let schema = {};

  const digraph = [words[0], words[1]];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // update for digraph
    schema = updateSchema(schema, digraph[1] + JOINER + digraph[0], word);

    // update for single word
    schema = updateSchema(schema, digraph[1], word);

    digraph.splice(0, 1);
    digraph.push(word);
  }

  console.log(schema);

  return schema;
};
