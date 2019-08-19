export const _storeInput = (array, audiences) => {
  return (dispatch, getState) => {
    dispatch({ type: "NEW_INPUT", array, audiences });
  };
};
