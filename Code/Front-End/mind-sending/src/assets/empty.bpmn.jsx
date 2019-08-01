export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:qa="http://some-company/schema/bpmn/qa" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:collaboration id="Collaboration_0czsqyr">
    <bpmn2:participant id="Participant_0cyhvx8" processRef="Process_1" />
  </bpmn2:collaboration>
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" />
    <bpmn2:startEvent id="StartEvent_0kh56ml" />
    <bpmn2:businessRuleTask id="BusinessRuleTask_0jerwte" name="A 4" qa:suitable="25">
      <bpmn2:incoming>SequenceFlow_0vrnv6t</bpmn2:incoming>
    </bpmn2:businessRuleTask>
    <bpmn2:businessRuleTask id="BusinessRuleTask_1ff7ol0" name="A 1" qa:suitable="25">
      <bpmn2:outgoing>SequenceFlow_0v8yta4</bpmn2:outgoing>
    </bpmn2:businessRuleTask>
    <bpmn2:exclusiveGateway id="ExclusiveGateway_1ae8i24" name="Clicked ?">
      <bpmn2:incoming>SequenceFlow_0v8yta4</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0ms7ipr</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_0qhzgcm</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_0v8yta4" sourceRef="BusinessRuleTask_1ff7ol0" targetRef="ExclusiveGateway_1ae8i24" />
    <bpmn2:sequenceFlow id="SequenceFlow_0ms7ipr" name="no" sourceRef="ExclusiveGateway_1ae8i24" targetRef="BusinessRuleTask_1watg40" />
    <bpmn2:sequenceFlow id="SequenceFlow_0qhzgcm" name="yes" sourceRef="ExclusiveGateway_1ae8i24" targetRef="BusinessRuleTask_1cf1a1x" />
    <bpmn2:businessRuleTask id="BusinessRuleTask_1cf1a1x" name="A 2" qa:suitable="25">
      <bpmn2:incoming>SequenceFlow_0qhzgcm</bpmn2:incoming>
    </bpmn2:businessRuleTask>
    <bpmn2:businessRuleTask id="BusinessRuleTask_1watg40" name="A 3" qa:suitable="25">
      <bpmn2:incoming>SequenceFlow_0ms7ipr</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_15mzb26</bpmn2:outgoing>
    </bpmn2:businessRuleTask>
    <bpmn2:sequenceFlow id="SequenceFlow_15mzb26" sourceRef="BusinessRuleTask_1watg40" targetRef="ExclusiveGateway_19nyb0t" />
    <bpmn2:exclusiveGateway id="ExclusiveGateway_19nyb0t" name="Clicked ?">
      <bpmn2:incoming>SequenceFlow_15mzb26</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0vrnv6t</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_12ipnmz</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:businessRuleTask id="BusinessRuleTask_0smxn7q" name="A 5" qa:suitable="25">
      <bpmn2:incoming>SequenceFlow_12ipnmz</bpmn2:incoming>
    </bpmn2:businessRuleTask>
    <bpmn2:sequenceFlow id="SequenceFlow_0vrnv6t" name="no" sourceRef="ExclusiveGateway_19nyb0t" targetRef="BusinessRuleTask_0jerwte" />
    <bpmn2:sequenceFlow id="SequenceFlow_12ipnmz" name="yes" sourceRef="ExclusiveGateway_19nyb0t" targetRef="BusinessRuleTask_0smxn7q" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0czsqyr">
      <bpmndi:BPMNShape id="Participant_0cyhvx8_di" bpmnElement="Participant_0cyhvx8" isHorizontal="true">
        <dc:Bounds x="84" y="-53" width="750" height="600" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_0kh56ml_di" bpmnElement="StartEvent_0kh56ml">
        <dc:Bounds x="169" y="349" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BusinessRuleTask_1ff7ol0_di" bpmnElement="BusinessRuleTask_1ff7ol0">
        <dc:Bounds x="137" y="210" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BusinessRuleTask_1watg40_di" bpmnElement="BusinessRuleTask_1watg40">
        <dc:Bounds x="350" y="40" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BusinessRuleTask_1cf1a1x_di" bpmnElement="BusinessRuleTask_1cf1a1x">
        <dc:Bounds x="370" y="260" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BusinessRuleTask_0jerwte_di" bpmnElement="BusinessRuleTask_0jerwte">
        <dc:Bounds x="590" y="10" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BusinessRuleTask_0smxn7q_di" bpmnElement="BusinessRuleTask_0smxn7q">
        <dc:Bounds x="600" y="160" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_1ae8i24_di" bpmnElement="ExclusiveGateway_1ae8i24" isMarkerVisible="true">
        <dc:Bounds x="295" y="225" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="298" y="282" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0v8yta4_di" bpmnElement="SequenceFlow_0v8yta4">
        <di:waypoint x="237" y="250" />
        <di:waypoint x="295" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0ms7ipr_di" bpmnElement="SequenceFlow_0ms7ipr">
        <di:waypoint x="320" y="225" />
        <di:waypoint x="320" y="110" />
        <di:waypoint x="350" y="110" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="329" y="165" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0qhzgcm_di" bpmnElement="SequenceFlow_0qhzgcm">
        <di:waypoint x="345" y="250" />
        <di:waypoint x="358" y="250" />
        <di:waypoint x="358" y="310" />
        <di:waypoint x="370" y="310" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="365" y="277" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_19nyb0t_di" bpmnElement="ExclusiveGateway_19nyb0t" isMarkerVisible="true">
        <dc:Bounds x="475" y="55" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="477" y="31" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_15mzb26_di" bpmnElement="SequenceFlow_15mzb26">
        <di:waypoint x="450" y="80" />
        <di:waypoint x="475" y="80" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0vrnv6t_di" bpmnElement="SequenceFlow_0vrnv6t">
        <di:waypoint x="525" y="80" />
        <di:waypoint x="558" y="80" />
        <di:waypoint x="558" y="70" />
        <di:waypoint x="590" y="70" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="567" y="72" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_12ipnmz_di" bpmnElement="SequenceFlow_12ipnmz">
        <di:waypoint x="500" y="105" />
        <di:waypoint x="500" y="210" />
        <di:waypoint x="600" y="210" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="521" y="183" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;