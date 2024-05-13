// store/flowBuilderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge, XYPosition } from "reactflow";
import { FlowBuilderState, MessageNodeType } from "../../types/types";
import { generateID } from "../../utils/common";

const initialState: FlowBuilderState = {
	nodes: [
		{
			id: generateID(),
			type: "messageNode",
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
		dropNode: (
			state,
			action: PayloadAction<{ type: string; position: XYPosition }>
		) => {
			const { type, position } = action.payload;
			const newNode: Node<MessageNodeType> = {
				id: generateID(),
				type,
				position,
				data: { label: "New Message Node" },
			};
			state.nodes.push(newNode);
		},
		updateNode: (state, action: PayloadAction<Node<MessageNodeType>>) => {
			const nodeIndex = state.nodes.findIndex(
				(node) => node.id === action.payload.id
			);
			if (nodeIndex !== -1) {
				state.nodes[nodeIndex] = action.payload;
			}
		},
		setNodes: (state, action: PayloadAction<Node<MessageNodeType>[]>) => {
			state.nodes = action.payload;
		},
		setEdges: (state, action: PayloadAction<Edge[]>) => {
			state.edges = action.payload;
		},
		setSelectedNode: (
			state,
			action: PayloadAction<Node<MessageNodeType> | null>
		) => {
			state.selectedNode = action.payload;
		},
	},
});

export const { dropNode, updateNode, setEdges, setNodes, setSelectedNode } =
	flowBuilderSlice.actions;
export default flowBuilderSlice.reducer;
