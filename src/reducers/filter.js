export default function galleriesFilter(
  state = {
    page: 0,
    topic: "Awesome",
    // section: "hot",
    // sort: "viral",
    // window: "day",
  }, action) {
  switch (action.type) {
    case "CHANGE_FILTER":
      return Object.assign({}, state, action.payload.params);
  }
  return state;
}
