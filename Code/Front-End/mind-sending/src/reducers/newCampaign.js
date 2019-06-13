import * as types from '../constants/ActionTypes';
var initialState = "Untitle";

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.CREATE_NEW_CAMPAIGN:
           
            var newName = action.newCampaign
            
            state = newName;
            console.log("Hello" +state);
            return state;
        default: return state;
    }
    return state;
};
 
export default myReducer;