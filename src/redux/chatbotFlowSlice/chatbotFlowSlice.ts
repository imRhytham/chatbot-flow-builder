// store/flowBuilderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";
import { FlowBuilderState, MessageNode } from "../../types/types";
import { generateID } from "../../utils/common";

const initialState: FlowBuilderState = {
	nodes: [
		{
			id: generateID(),
			type: "textNode",
			position: { x: 250, y: 250 },
			data: { label: "Hello, welcome to our chatbot!" },
		},
	],
	edges: [],
	selectedNode: null,
};

const flowBuilderSlice = createSlice({
	name: "flowBuilder",
	initialState,
	reducers: {
		addNode: (state, action: PayloadAction<Node<MessageNode>>) => {
			state.nodes.push(action.payload);
		},
		updateNode: (state, action: PayloadAction<Node<MessageNode>>) => {
			const nodeIndex = state.nodes.findIndex(
				(node) => node.id === action.payload.id
			);
			if (nodeIndex !== -1) {
				state.nodes[nodeIndex] = action.payload;
			}
		},
		setEdges: (state, action: PayloadAction<Edge[]>) => {
			state.edges = action.payload;
		},
		setSelectedNode: (
			state,
			action: PayloadAction<Node<MessageNode> | null>
		) => {
			state.selectedNode = action.payload;
		},
	},
});

export const { addNode, updateNode, setEdges, setSelectedNode } =
	flowBuilderSlice.actions;
export default flowBuilderSlice.reducer;
