import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element) {

  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.textField({
      id : 'campaign',
      description : 'Apply a black magic spell',
      label : 'Choose Campaign',
      modelProperty : 'campaign_id'
    }));
    group.entries.push(entryFactory.textField({
      id : 'campaign1',
      description : 'Apply a black magic spell',
      label : 'Choose Campaign',
      modelProperty : 'campaign'
    }));
  }
  if (is(element, 'bpmn:SendTask')) {
    group.entries.push(entryFactory.textField({
      id : 'spell',
      description : 'Apply a black magic spell',
      label : 'Spell',
      modelProperty : 'spell'
    }));
  }
}