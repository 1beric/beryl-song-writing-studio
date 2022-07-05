import actions from ".";
import actionTypes from "../actionTypes";
import selectors from "../selectors";

const theme = {
  acSetTheme: (newTheme) => ({
    type: actionTypes.SET_THEME,
    payload: {
      newTheme: newTheme,
    },
  }),
};

export default theme;
