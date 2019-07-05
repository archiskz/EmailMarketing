export const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
	<bpmn:collaboration id="Collaboration_0czsqyr">
		<bpmn:participant id="Participant_0cyhvx8" processRef="Process_1" />
	</bpmn:collaboration>
	<bpmn:process id="Process_1" isExecutable="false">
		<bpmn:startEvent id="StartEvent_1" />
	</bpmn:process>
	<bpmndi:BPMNDiagram id="BPMNDiagram_1">
		<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0czsqyr">
			<bpmndi:BPMNShape id="Participant_0cyhvx8_di" bpmnElement="Participant_0cyhvx8">
				<dc:Bounds x="100" y="50" width="750" height="600" />
			</bpmndi:BPMNShape>
		</bpmndi:BPMNPlane>
	</bpmndi:BPMNDiagram>
</bpmn:definitions>`;