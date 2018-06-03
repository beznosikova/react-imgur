export default function galleriesFilter(
  state = {
    topic: 11,
  }, action) {
  switch (action.type) {
    case "CHANGE_FILTER":
      return Object.assign({}, state, action.payload.params);
  }
  return state;
}
