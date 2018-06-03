export default function galleriesList(state = {
	list: [],
	hasMore: true,
    page: 0,
	}, 
	action) 
{
	const {hasMore, list} = state;
	const {page} = action;

	switch (action.type) {
		case "GALLERIES_NEXT_PAGE":
		  return {list: [...state.list, ...action.payload], hasMore, page};
		case "GALLERIES_HAS_MORE":
		  return {list, hasMore:false, page};
		case "GALLERIES_NOT_FOUND":
		  return {list: [], hasMore:true, page};
		case "GALLERIES_NEW_TOPIC":
		  return {list: action.payload, hasMore:true, page};
		default:
			return state;
	}
}