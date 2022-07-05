import reduxState from "../state";
import lyricGenerator from "./lyrics";
import page from "./page";
import theme from "./theme";
import notes from "./notes";

const checkReducers = (reducers, actionType) => {
  const array = reducers.find(([type]) => type === actionType);
  if (array) return array[1];
  return null;
};

const reducer = (state = reduxState.initialState, action) => {
  if (!action) return state;

  let handle = checkReducers(Object.values(lyricGenerator), action.type);
  if (handle) return handle(state, action);

  handle = checkReducers(Object.values(page), action.type);
  if (handle) return handle(state, action);

  handle = checkReducers(Object.values(theme), action.type);
  if (handle) return handle(state, action);

  handle = checkReducers(Object.values(notes), action.type);
  if (handle) return handle(state, action);

  return state;
};

export default reducer;
