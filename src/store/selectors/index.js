import * as themeSelectors from "./theme";
import * as page from "./page";
import * as lyrics from "./lyrics";
import * as notes from "./notes";

const selectors = {
  ...themeSelectors,
  ...page,
  ...lyrics,
  ...notes,
};

export default selectors;
