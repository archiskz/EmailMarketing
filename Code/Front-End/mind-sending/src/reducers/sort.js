var initialState = {
		by : 'status',
		value : 1 // sort từ a ->z
}

var myReducer = (state = initialState, action) =>{
	if(action.type === 'SORT'){
var{by, value} = action.sort; //by = action.sort.by
		return {
			by, value
		}
	}
return state;
}

export default myReducer;