import lyricGenerator from "./lyrics";
import page from "./page";
import theme from "./theme";
import notes from "./notes";
const actionTypes = {
  ...lyricGenerator,
  ...page,
  ...theme,
  ...notes,
};

export default actionTypes;
