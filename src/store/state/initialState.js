import BODY_TYPES from "../../modules/body/util/bodyTypes";
import HEADER_TYPES from "../../modules/header/util/headerTypes";
import defaultSteps from "../../modules/stepper/util/steps";
import themes from "../../util/theme";
import stanzaOptions from "./defaultStanzas";

const INITIAL_STATE = {
  theme: themes.defaultTheme,

  modal: null,
  loading: 0,
  bodyType: BODY_TYPES.HOME.id,
  headerType: HEADER_TYPES.DEFAULT,
  steps: Object.values(defaultSteps),
  activeStep: null,
  timeLeft: 0,
  timerPlaying: false,
  timerHandle: null,
  information: {},
  notes: "",

  lyricSource: "",
  lyricSchema: {},
  lyricSourceFilterChars: [",", ".", "?", "!", ";", ":", '"', "'", "(", ")"],
  stanzaPattern: ["V1", "C", "V2", "C", "B", "C", "C"],
  stanzaOptions: stanzaOptions,
  generatedLyrics: "",
};

export default INITIAL_STATE;
