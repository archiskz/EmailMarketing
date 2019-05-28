import {createStore} from 'redux';
import {status, sort} from './actions/index';
import myReducer from './reducers/index';


const store = createStore(myReducer);
// thực hiện công việc toggle status
console.log('Default: ' , store.getState());
var action = {type: 'TOGGLE_STATUS'};

store.dispatch(status()); // dispatch actions

console.log('TOGGLE_STATUS: ' , store.getState());


store.dispatch(sort({
	by: 'name',
	value: -1
}));
console.log('sort: ' , store.getState());
