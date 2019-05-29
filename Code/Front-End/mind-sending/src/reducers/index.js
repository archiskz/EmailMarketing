import status from './status';
import sort from './sort';
import accounts from './accounts';
import loginReducer from './loginReducer';
import {combineReducers} from 'redux';

const myReducer = combineReducers({
status : status,
sort : sort,
accounts: accounts,
loginReducer: loginReducer
});

export default myReducer;
