import * as types from './../constants/ActionTypes';

var initialState = [{
	id: '',
	username: '',
	password: ''
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