import { dictionary } from "cmu-pronouncing-dictionary";

const words = Object.keys(dictionary).map((word) => ({
  word: word,
  pronounciation: dictionary[word],
}));

// `donkey(1)` -> `donkey`
const cleanAlternative = (word) => {
  const pos = word.indexOf("(");
  return pos === -1 ? word : word.slice(0, pos);
};

const reverseSyllables = (d) => {
  return d.split(" ").reverse();
};

const countMatchingTrailingSyllables = (a, b) => {
  const left = reverseSyllables(a);
  const right = reverseSyllables(b);
  const length = Math.max(left.length, right.length);
  let index = -1;
  let score = 0;

  while (++index < length) {
    if (left[index] !== right[index]) {
      return score;
    }

    score++;
  }

  // Do not return words with exactly the same pronunciation (`kat` for `cat`)
  return 0;
};

function rhymes(value) {
  if (!value) return [];

  value = String(value).toLowerCase();

  if (!dictionary[value]) return [];

  const pronounciation = dictionary[value];

  const results = words
    .map((other) => {
      const score = countMatchingTrailingSyllables(
        pronounciation,
        other.pronounciation
      );
      if (score > 1) {
        return {
          score: score,
          pronounciation: other.pronounciation,
          word: cleanAlternative(other.word),
        };
      }
      return null;
    })
    .filter((val) => val);

  return results;
}

rhymes.words = words;

export default rhymes;
