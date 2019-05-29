import * as types from './../constants/ActionTypes';
export const status = () => {
	return {
		type: types.TOGGLE_STATUS
	}
}

export const sort = (sort) => {
	return{
		type: types.SORT,
		sort //sort: sort
	}
}

export const listAll = () => {
return {
	type: types.LIST_ALL,
}
}

export const loginAction = (username, password) => {
	return {
		type: types.LOGIN,
		loginAction
	}
}