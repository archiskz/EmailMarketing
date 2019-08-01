import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import * as Config from '../../../constants/Config';
import axios from 'axios';
import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

export default function(group, element) {
  var selectOptions = JSON.parse(localStorage.getItem('campaigns'));
  var selectOptionsApp = JSON.parse(localStorage.getItem('appointments'));
  var selectSequenceFlow = [
    { value: 'yes', name: 'Yes' },
    { value: 'no', name: 'No' }
  ];
  var selectGateway = [
    { value: 'Clicked ?', name: 'Clicked ?' },
    { value: 'Opened ?', name: 'Opened ?' }
  ];
  // const appState = JSON.parse(localStorage.getItem('appState'));
  //     axios.get(`${Config.API_URL}campaigns`,{ 'headers': { 'Authorization': `${appState.user.auth_token}` } })
  //   .then(res => {
  //     var listCampaigns = new Array();
  //     listCampaigns = res.data
     
  //     console.log(listCampaigns)
  //     listCampaigns.forEach(element => {
  //       console.log(element.name)
  //       selectOptions.push({value: element.name, name: element.name})
  //     });
  //   }) 
  //   console.log(this.state.campaigns)
    


  if (is(element, 'bpmn:SendTask')) {
    group.entries.push(entryFactory.selectBox({
      id : 'campaign',
      selectOptions: selectOptions,
      label : 'Choose Campaign',
      modelProperty : 'name'
    }));
  
  }
  if (is(element, 'bpmn:BusinessRuleTask')) {
    group.entries.push(entryFactory.selectBox({
      id : 'campaign',
      selectOptions: selectOptionsApp,
      label : 'Choose Campaign',
      modelProperty : 'name'
    }));
  
  }
  if (is(element, 'bpmn:SequenceFlow')) {
    group.entries.push(entryFactory.selectBox({
      id : 'campaign',
      selectOptions: selectSequenceFlow,
      label : 'Yes or No',
      modelProperty : 'name'
    }));
  
  }
  if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.textField({
      id : 'spell',
      description : 'Apply a black magic spell',
      label : 'Spell',
      modelProperty : 'name'
    }));
  }
  if (is(element, 'bpmn:Gateway')) {
    group.entries.push(entryFactory.selectBox({
      id : 'campaign',
      selectOptions: selectGateway,
      label : 'Condition',
      modelProperty : 'name'
    }));
  }
}