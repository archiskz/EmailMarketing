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

export const openPreviewTemplate = () =>{
	return {
		type: types.OPEN_PREVIEW_TEMPLATE,
	
	}
}
export const closePreviewTemplate = () =>{
	return {
		type: types.CLOSE_PREVIEW_TEMPLATE,
	
	}
}
export const createNewCampaign = (newCampaign) =>{
	return {
		type: types.CREATE_NEW_CAMPAIGN,
		newCampaign
	
	}
}
export const openTemplatesList = () =>{
	return {
		type: types.OPEN_PREVIEW_TEMPLATE,
	
	}
}

export const openAllTemplatesList = () =>{
	return {
		type: types.OPEN_TEMPLATES_LIST,
	
	}
}