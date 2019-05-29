import * as types from './../constants/ActionTypes';
var initialState = {
    username: '',
        password: ''
}

var myReducer = (state = initialState, action) => {
    if (action.type === types.LOGIN) {
        var {
            username,
            password
        } = action.loginAction; //by = action.sort.by
        return {username, password};
    }
     return state;
}

export default myReducer;