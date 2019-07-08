const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function appendServiceTask(suitabilityScore) {
      return function(event, element) {
        if (autoPlace) {
          switch(suitabilityScore){
            case SUITABILITY_SCORE_HIGH: {
              const businessObject = bpmnFactory.create('bpmn:SendTask');
    
              businessObject.suitable = suitabilityScore;
        
              const shape = elementFactory.createShape({
                type: 'bpmn:SendTask',
                businessObject: businessObject
          });
    
          autoPlace.append(element, shape);
          break;
            }
            case SUITABILITY_SCORE_AVERGE: {
              const businessObject = bpmnFactory.create('bpmn:UserTask');
    
              businessObject.suitable = suitabilityScore;
        
              const shape = elementFactory.createShape({
                type: 'bpmn:UserTask',
                businessObject: businessObject
          });
    
          autoPlace.append(element, shape);
          break;
            }
            case SUITABILITY_SCORE_LOW: {
              const businessObject = bpmnFactory.create('bpmn:BusinessRuleTask');
    
              businessObject.suitable = suitabilityScore;
        
              const shape = elementFactory.createShape({
                type: 'bpmn:BusinessRuleTask',
                businessObject: businessObject
          });
    
          autoPlace.append(element, shape);
          break;
            }
          }
        } else {
          appendServiceTaskStart(event, element);
        }
      }
    }

    function appendServiceTaskStart(suitabilityScore) {
      return function(event) {
        switch(suitabilityScore){
          case SUITABILITY_SCORE_HIGH: {
              const businessObject = bpmnFactory.create('bpmn:SendTask');

          businessObject.suitable = suitabilityScore;

          const shape = elementFactory.createShape({
            type: 'bpmn:SendTask',
            businessObject: businessObject
          });

          create.start(event, shape, element);
          break;
          }
          case SUITABILITY_SCORE_AVERGE: {
            const businessObject = bpmnFactory.create('bpmn:UserTask');

        businessObject.suitable = suitabilityScore;

        const shape = elementFactory.createShape({
          type: 'bpmn:UserTask',
          businessObject: businessObject
        });

        create.start(event, shape, element);
        break;
        }
        case SUITABILITY_SCORE_LOW: {
          const businessObject = bpmnFactory.create('bpmn:BusinessRuleTask');

      businessObject.suitable = suitabilityScore;

      const shape = elementFactory.createShape({
        type: 'bpmn:BusinessRuleTask',
        businessObject: businessObject
      });

      create.start(event, shape, element);
      break;
      }
        }
      }
    }

    return {
      'append.low-task': {
        group: 'model',
        className: 'bpmn-icon-task red',
        title: translate('Schedule'),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_LOW),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_LOW)
        }
      },
      'append.average-task': {
        group: 'model',
        className: 'bpmn-icon-task yellow',
        title: translate('Form'),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_AVERGE),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_AVERGE)
        }
      },
      'append.high-task': {
        group: 'model',
        className: 'bpmn-icon-task green',
        title: translate('Campaign'),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_HIGH),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_HIGH)
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];