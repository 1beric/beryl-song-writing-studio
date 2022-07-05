import actionTypes from "../actionTypes";

const theme = {
  handleSetTheme: [
    actionTypes.SET_THEME,
    (state, { payload: { newTheme } }) => ({
      ...state,
      theme: newTheme,
    }),
  ],
};

export default theme;
