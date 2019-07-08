export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:qa="http://some-company/schema/bpmn/qa" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:collaboration id="Collaboration_0czsqyr">
    <bpmn2:participant id="Participant_0cyhvx8" processRef="Process_1" />
  </bpmn2:collaboration>
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" />
    <bpmn2:startEvent id="StartEvent_14lb5qq" campaign_id="asd" campaign="xcxz" />
    <bpmn2:sendTask id="SendTask_0jt06j7" qa:suitable="100" spell="afgh" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0czsqyr">
      <bpmndi:BPMNShape id="Participant_0cyhvx8_di" bpmnElement="Participant_0cyhvx8">
        <dc:Bounds x="100" y="50" width="750" height="600" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_14lb5qq_di" bpmnElement="StartEvent_14lb5qq">
        <dc:Bounds x="371" y="224" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SendTask_0jt06j7_di" bpmnElement="SendTask_0jt06j7">
        <dc:Bounds x="309" y="372" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;