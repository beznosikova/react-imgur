export default function galleriesList(state = {
	list: [],
	hasMore: true
	}, 
	action) 
{
	console.log("reducer - galleriesList", action.type);
	const {hasMore, list} = state;

	switch (action.type) {
		case "GALLERIES_NEXT_PAGE":
		  return {list: [...state.list, ...action.payload], hasMore};
		case "GALLERIES_HAS_MORE":
		  return {list, hasMore:false};      
		case "GALLERIES_NOT_FOUND":
		  return {list: [], hasMore:true};
		case "GALLERIES_NEW_TOPIC":
		  return {list: action.payload, hasMore:true};		  
	}
	return state;
}