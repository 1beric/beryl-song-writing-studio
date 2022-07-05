const defaultSteps = {
  INSTRUMENTS: {
    id: "INSTRUMENTS",
    title: "Select Intruments/Sounds",
    time: 5 * 60 * 1000, // five minutes
    components: ["TIMER", "NOTES"],
  },
  LYRICS: {
    id: "LYRICS",
    title: "Write Lyrics",
    time: 20 * 60 * 1000, // twenty minutes
    components: ["TIMER", "LYRIC_SOURCE", "LYRIC_GENERATOR", "NOTES"],
  },
  MELODY: {
    id: "MELODY",
    title: "Write Melody",
    time: 15 * 60 * 1000, // fifteen minutes
    components: ["TIMER", "NOTES"],
  },
  BACKING: {
    id: "BACKING",
    title: "Write Backing",
    time: 20 * 60 * 1000, // twenty minutes
    components: ["TIMER", "NOTES"],
  },
  EDIT: {
    id: "EDIT",
    title: "Edit Song",
    time: 30 * 60 * 1000, // thirty minutes
    components: ["TIMER", "NOTES"],
  },
  FINALIZE: {
    id: "FINALIZE",
    title: "Finalize Song",
    time: 30 * 60 * 1000, // thirty minutes
    components: ["TIMER", "NOTES"],
  },
};

export default defaultSteps;
