import * as types from '../constants/ActionTypes';
var initialState = false;

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.OPEN_TEMPLATES_LIST:
            return true;
        case types.CLOSE_PREVIEW_TEMPLATE:
            return false;
        default: return state;
    }
    return state;
};
 
export default myReducer;