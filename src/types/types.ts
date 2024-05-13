import { Node, Edge } from "reactflow";

export interface MessageNodeType {
	label: string;
}

export interface MessageNodeProps {
	selected: boolean;
	data: {
		label: string;
	};
}

export interface FlowBuilderState {
	nodes: Node<MessageNodeType>[];
	edges: Edge[];
	selectedNode: Node<MessageNodeType> | null;
}
