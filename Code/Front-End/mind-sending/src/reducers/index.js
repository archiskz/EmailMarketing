
//Reducer

import status from './status';
import isDisplayPreviewModal from './isDisplayPreviewModal';
import sort from './sort';
import accounts from './accounts';
import loginReducer from './loginReducer';
import newCampaign from './newCampaign';
import isDisplayTemplatesList from './isDisplayTemplatesList';
import {combineReducers} from 'redux';

const myReducer = combineReducers({
status : status,
newCampaign: newCampaign,
sort : sort,
accounts: accounts,
loginReducer: loginReducer,
isDisplayPreviewModal: isDisplayPreviewModal,
isDisplayTemplatesList: isDisplayTemplatesList,
});

export default myReducer;
