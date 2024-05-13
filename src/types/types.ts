import { Node, Edge } from "reactflow";

export interface MessageNode {
	label: string;
}

export interface MessageNodeProps {
	selected: boolean;
	data: {
		label: string;
	};
}

export interface FlowBuilderState {
	nodes: Node<MessageNode>[];
	edges: Edge[];
	selectedNode: Node<MessageNode> | null;
}
