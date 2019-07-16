export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:qa="http://some-company/schema/bpmn/qa" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:collaboration id="Collaboration_0czsqyr">
    <bpmn2:participant id="Participant_0cyhvx8" processRef="Process_1" />
  </bpmn2:collaboration>
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" />
    <bpmn2:sendTask id="SendTask_0jt06j7" name="Welcome" qa:suitable="100">
      <bpmn2:incoming>SequenceFlow_05d3oop</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1qmjs1m</bpmn2:outgoing>
    </bpmn2:sendTask>
    <bpmn2:exclusiveGateway id="ExclusiveGateway_1nngdyk">
      <bpmn2:incoming>SequenceFlow_1qmjs1m</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1hydedj</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_13546lz</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sendTask id="SendTask_0uv2dr5" name="Stories" qa:suitable="100">
      <bpmn2:incoming>SequenceFlow_1hydedj</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_18dub6q</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1vvg8ti</bpmn2:outgoing>
    </bpmn2:sendTask>
    <bpmn2:sendTask id="SendTask_1tgie9h" name="Remind" qa:suitable="100">
      <bpmn2:incoming>SequenceFlow_13546lz</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_18dub6q</bpmn2:outgoing>
    </bpmn2:sendTask>
    <bpmn2:businessRuleTask id="BusinessRuleTask_17tmt6g" name="Invite" qa:suitable="25">
      <bpmn2:incoming>SequenceFlow_1vvg8ti</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1x85vz2</bpmn2:outgoing>
    </bpmn2:businessRuleTask>
    <bpmn2:endEvent id="EndEvent_0yg0j57">
      <bpmn2:incoming>SequenceFlow_1x85vz2</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:userTask id="UserTask_1l5teqw" name="register" qa:suitable="50">
      <bpmn2:incoming>SequenceFlow_0dmtz8d</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_05d3oop</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:startEvent id="StartEvent_0kh56ml">
      <bpmn2:outgoing>SequenceFlow_0dmtz8d</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_1qmjs1m" sourceRef="SendTask_0jt06j7" targetRef="ExclusiveGateway_1nngdyk" />
    <bpmn2:sequenceFlow id="SequenceFlow_1hydedj" name="open" sourceRef="ExclusiveGateway_1nngdyk" targetRef="SendTask_0uv2dr5" />
    <bpmn2:sequenceFlow id="SequenceFlow_13546lz" name="not open" sourceRef="ExclusiveGateway_1nngdyk" targetRef="SendTask_1tgie9h" />
    <bpmn2:sequenceFlow id="SequenceFlow_18dub6q" name="open" sourceRef="SendTask_1tgie9h" targetRef="SendTask_0uv2dr5" />
    <bpmn2:sequenceFlow id="SequenceFlow_1vvg8ti" name="open" sourceRef="SendTask_0uv2dr5" targetRef="BusinessRuleTask_17tmt6g" />
    <bpmn2:sequenceFlow id="SequenceFlow_1x85vz2" sourceRef="BusinessRuleTask_17tmt6g" targetRef="EndEvent_0yg0j57" />
    <bpmn2:sequenceFlow id="SequenceFlow_0dmtz8d" sourceRef="StartEvent_0kh56ml" targetRef="UserTask_1l5teqw" />
    <bpmn2:sequenceFlow id="SequenceFlow_05d3oop" sourceRef="UserTask_1l5teqw" targetRef="SendTask_0jt06j7" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0czsqyr">
      <bpmndi:BPMNShape id="Participant_0cyhvx8_di" bpmnElement="Participant_0cyhvx8" isHorizontal="true">
        <dc:Bounds x="84" y="-53" width="750" height="600" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SendTask_0jt06j7_di" bpmnElement="SendTask_0jt06j7">
        <dc:Bounds x="137" y="82" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_0kh56ml_di" bpmnElement="StartEvent_0kh56ml">
        <dc:Bounds x="169" y="349" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_0yg0j57_di" bpmnElement="EndEvent_0yg0j57">
        <dc:Bounds x="583" y="175" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_1nngdyk_di" bpmnElement="ExclusiveGateway_1nngdyk" isMarkerVisible="true">
        <dc:Bounds x="275" y="97" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1qmjs1m_di" bpmnElement="SequenceFlow_1qmjs1m">
        <di:waypoint x="237" y="122" />
        <di:waypoint x="275" y="122" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="SendTask_0uv2dr5_di" bpmnElement="SendTask_0uv2dr5">
        <dc:Bounds x="347" y="-17" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SendTask_1tgie9h_di" bpmnElement="SendTask_1tgie9h">
        <dc:Bounds x="347" y="117" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1hydedj_di" bpmnElement="SequenceFlow_1hydedj">
        <di:waypoint x="300" y="97" />
        <di:waypoint x="300" y="23" />
        <di:waypoint x="347" y="23" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="269" y="45.99999999999997" width="25" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_13546lz_di" bpmnElement="SequenceFlow_13546lz">
        <di:waypoint x="325" y="122" />
        <di:waypoint x="336" y="122" />
        <di:waypoint x="336" y="157" />
        <di:waypoint x="347" y="157" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="333" y="101" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_18dub6q_di" bpmnElement="SequenceFlow_18dub6q">
        <di:waypoint x="397" y="117" />
        <di:waypoint x="397" y="63" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="400" y="87" width="25" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="BusinessRuleTask_17tmt6g_di" bpmnElement="BusinessRuleTask_17tmt6g">
        <dc:Bounds x="532" y="22" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1vvg8ti_di" bpmnElement="SequenceFlow_1vvg8ti">
        <di:waypoint x="447" y="23" />
        <di:waypoint x="490" y="23" />
        <di:waypoint x="490" y="62" />
        <di:waypoint x="532" y="62" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="464" y="4" width="25" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1x85vz2_di" bpmnElement="SequenceFlow_1x85vz2">
        <di:waypoint x="582" y="102" />
        <di:waypoint x="582" y="152" />
        <di:waypoint x="601" y="152" />
        <di:waypoint x="601" y="175" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_1l5teqw_di" bpmnElement="UserTask_1l5teqw">
        <dc:Bounds x="137" y="209" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0dmtz8d_di" bpmnElement="SequenceFlow_0dmtz8d">
        <di:waypoint x="187" y="349" />
        <di:waypoint x="187" y="289" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_05d3oop_di" bpmnElement="SequenceFlow_05d3oop">
        <di:waypoint x="187" y="209" />
        <di:waypoint x="187" y="162" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;