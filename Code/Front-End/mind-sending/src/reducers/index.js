import status from './status';
import sort from './sort';
import accounts from './accounts';
import {combineReducers} from 'redux';

const myReducer = combineReducers({
status : status,
sort : sort,
accounts: accounts
});

export default myReducer;
