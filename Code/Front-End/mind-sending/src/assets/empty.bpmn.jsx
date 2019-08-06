export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:qa="http://some-company/schema/bpmn/qa" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:collaboration id="Collaboration_0czsqyr">
    <bpmn2:participant id="Participant_0cyhvx8" processRef="Process_1" />
  </bpmn2:collaboration>
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" />
    <bpmn2:startEvent id="StartEvent_1of3rlp">
      <bpmn2:outgoing>SequenceFlow_0y18791</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:userTask id="UserTask_1sbexqx" qa:suitable="50">
      <bpmn2:incoming>SequenceFlow_0y18791</bpmn2:incoming>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="SequenceFlow_0y18791" sourceRef="StartEvent_1of3rlp" targetRef="UserTask_1sbexqx" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0czsqyr">
      <bpmndi:BPMNShape id="Participant_0cyhvx8_di" bpmnElement="Participant_0cyhvx8" isHorizontal="true">
        <dc:Bounds x="180" y="-90" width="900" height="670" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="UserTask_1sbexqx_di" bpmnElement="UserTask_1sbexqx">
        <dc:Bounds x="310" y="-60" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_1of3rlp_di" bpmnElement="StartEvent_1of3rlp">
        <dc:Bounds x="232" y="-48" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0y18791_di" bpmnElement="SequenceFlow_0y18791">
        <di:waypoint x="268" y="-30" />
        <di:waypoint x="310" y="-30" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;