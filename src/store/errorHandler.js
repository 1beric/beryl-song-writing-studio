import actions from "./actions";

const errorHandler = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (error) {
    console.error("ERROR OCCURED WITHIN REDUX ACTION", store, action);
    next(actions.acSetLoading(0));
  }
};

export default errorHandler;
