export const changeFilter = params => dispatch => {
	// console.log("changeFilter - params", params);
  dispatch({
    type: "CHANGE_FILTER",
    payload: {
      params
    }
  });
};
