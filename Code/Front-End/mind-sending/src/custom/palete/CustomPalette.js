const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function createTask(suitabilityScore) {
      return function(event) {
        switch (suitabilityScore) {
          case SUITABILITY_SCORE_HIGH: {
            const businessObject = bpmnFactory.create('bpmn:SendTask');
              console.log(businessObject)
            businessObject.suitable = suitabilityScore;
      
            const shape = elementFactory.createShape({
              type: 'bpmn:SendTask',
              businessObject: businessObject
            });
      
            create.start(event, shape);   
            break;
          }
          case SUITABILITY_SCORE_AVERGE: {
            const businessObject = bpmnFactory.create('bpmn:UserTask');
              console.log(businessObject)
            businessObject.suitable = suitabilityScore;
      
            const shape = elementFactory.createShape({
              type: 'bpmn:UserTask',
              businessObject: businessObject
            });
      
            create.start(event, shape);   
            break;
          }
          case SUITABILITY_SCORE_LOW: {
            const businessObject = bpmnFactory.create('bpmn:BusinessRuleTask');
              console.log(businessObject)
            businessObject.suitable = suitabilityScore;
      
            const shape = elementFactory.createShape({
              type: 'bpmn:BusinessRuleTask',
              businessObject: businessObject
            });
      
            create.start(event, shape);   
            break;
          }
        }
      }
    }

    return {
      'create.low-task': {
        group: 'activity',
        className: 'bpmn-icon-task red',
        action: {
          dragstart: createTask(SUITABILITY_SCORE_LOW),
          click: createTask(SUITABILITY_SCORE_LOW)
        }
      },
      'create.average-task': {
        group: 'activity',
        className: 'bpmn-icon-task yellow',
        
        action: {
          dragstart: createTask(SUITABILITY_SCORE_AVERGE),
          click: createTask(SUITABILITY_SCORE_AVERGE)
        }
      },
      'create.high-task': {
        group: 'activity',
        className: 'bpmn-icon-task green',
        
        action: {
          dragstart: createTask(SUITABILITY_SCORE_HIGH),
          click: createTask(SUITABILITY_SCORE_HIGH)
        }
      }
    }
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
];