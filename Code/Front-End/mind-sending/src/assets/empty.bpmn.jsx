export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:qa="http://some-company/schema/bpmn/qa" xmlns:vendor="http://vendor" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>SequenceFlow_0fwz9h9</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:endEvent id="EndEvent_1">
      <bpmn:incoming>SequenceFlow_0ek0tja</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1xkgg5v</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sendTask id="SendTask_0y4a64a" name="MiNI" qa:suitable="100">
      <bpmn:incoming>SequenceFlow_0fwz9h9</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1lxatrx</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:sendTask id="SendTask_1tql1i3" name="Abc" qa:suitable="100">
      <bpmn:incoming>SequenceFlow_050hb97</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0hr2xel</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:businessRuleTask id="BusinessRuleTask_0k7ke0v" name="aaa" qa:suitable="25">
      <bpmn:incoming>SequenceFlow_0r8u81p</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0ek0tja</bpmn:outgoing>
    </bpmn:businessRuleTask>
    <bpmn:sequenceFlow id="SequenceFlow_0fwz9h9" sourceRef="StartEvent_1" targetRef="SendTask_0y4a64a" />
    <bpmn:exclusiveGateway id="ExclusiveGateway_0yyzvge" name="Clicked ?">
      <bpmn:incoming>SequenceFlow_1lxatrx</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_050hb97</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_18rqf6p</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_1lxatrx" sourceRef="SendTask_0y4a64a" targetRef="ExclusiveGateway_0yyzvge" />
    <bpmn:sequenceFlow id="SequenceFlow_050hb97" name="no" sourceRef="ExclusiveGateway_0yyzvge" targetRef="SendTask_1tql1i3" />
    <bpmn:sendTask id="SendTask_1jbljvs" name="Schedule" qa:suitable="100">
      <bpmn:incoming>SequenceFlow_18rqf6p</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1xkgg5v</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:sequenceFlow id="SequenceFlow_18rqf6p" name="yes" sourceRef="ExclusiveGateway_0yyzvge" targetRef="SendTask_1jbljvs" />
    <bpmn:exclusiveGateway id="ExclusiveGateway_1fsur0n" name="Opened ?">
      <bpmn:incoming>SequenceFlow_0hr2xel</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0r8u81p</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="SequenceFlow_0hr2xel" sourceRef="SendTask_1tql1i3" targetRef="ExclusiveGateway_1fsur0n" />
    <bpmn:sequenceFlow id="SequenceFlow_0r8u81p" name="yes" sourceRef="ExclusiveGateway_1fsur0n" targetRef="BusinessRuleTask_0k7ke0v" />
    <bpmn:sequenceFlow id="SequenceFlow_0ek0tja" sourceRef="BusinessRuleTask_0k7ke0v" targetRef="EndEvent_1" />
    <bpmn:sequenceFlow id="SequenceFlow_1xkgg5v" sourceRef="SendTask_1jbljvs" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="22" y="222" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="862" y="312" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="504" y="138" width="90" height="20" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SendTask_0y4a64a_di" bpmnElement="SendTask_0y4a64a">
        <dc:Bounds x="104" y="190" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SendTask_1tql1i3_di" bpmnElement="SendTask_1tql1i3">
        <dc:Bounds x="440" y="90" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BusinessRuleTask_0k7ke0v_di" bpmnElement="BusinessRuleTask_0k7ke0v">
        <dc:Bounds x="750" y="190" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0fwz9h9_di" bpmnElement="SequenceFlow_0fwz9h9">
        <di:waypoint x="58" y="240" />
        <di:waypoint x="104" y="240" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_0yyzvge_di" bpmnElement="ExclusiveGateway_0yyzvge" isMarkerVisible="true">
        <dc:Bounds x="255" y="205" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="258" y="262" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1lxatrx_di" bpmnElement="SequenceFlow_1lxatrx">
        <di:waypoint x="204" y="230" />
        <di:waypoint x="255" y="230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_050hb97_di" bpmnElement="SequenceFlow_050hb97">
        <di:waypoint x="280" y="205" />
        <di:waypoint x="280" y="130" />
        <di:waypoint x="440" y="130" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="289" y="165" width="13" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="SendTask_1jbljvs_di" bpmnElement="SendTask_1jbljvs">
        <dc:Bounds x="430" y="240" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_18rqf6p_di" bpmnElement="SequenceFlow_18rqf6p">
        <di:waypoint x="305" y="230" />
        <di:waypoint x="368" y="230" />
        <di:waypoint x="368" y="280" />
        <di:waypoint x="430" y="280" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="375" y="252" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1fsur0n_di" bpmnElement="ExclusiveGateway_1fsur0n" isMarkerVisible="true">
        <dc:Bounds x="615" y="145" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="616" y="115" width="49" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0hr2xel_di" bpmnElement="SequenceFlow_0hr2xel">
        <di:waypoint x="540" y="130" />
        <di:waypoint x="578" y="130" />
        <di:waypoint x="578" y="170" />
        <di:waypoint x="615" y="170" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0r8u81p_di" bpmnElement="SequenceFlow_0r8u81p">
        <di:waypoint x="640" y="195" />
        <di:waypoint x="640" y="230" />
        <di:waypoint x="750" y="230" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="647" y="208" width="17" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0ek0tja_di" bpmnElement="SequenceFlow_0ek0tja">
        <di:waypoint x="800" y="270" />
        <di:waypoint x="800" y="291" />
        <di:waypoint x="880" y="291" />
        <di:waypoint x="880" y="312" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1xkgg5v_di" bpmnElement="SequenceFlow_1xkgg5v">
        <di:waypoint x="530" y="280" />
        <di:waypoint x="696" y="280" />
        <di:waypoint x="696" y="330" />
        <di:waypoint x="862" y="330" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;