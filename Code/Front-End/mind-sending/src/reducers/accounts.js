import * as types from './../constants/ActionTypes';

var initialState = [{
	id:1,
	username: "son",
	password: "1234"
}];


var myReducer = (state = initialState, action) =>{
switch(action.type){
	case types.LIST_ALL:
	return state;
	default: return state; 
}
return state;
}

export default myReducer;