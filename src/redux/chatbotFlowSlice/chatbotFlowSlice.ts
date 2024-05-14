// store/flowBuilderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge, XYPosition, ReactFlowJsonObject } from "reactflow";
import { FlowBuilderState, MessageNodeType } from "../../types/types";
import { generateID } from "../../utils/common";
import { toast } from "react-toastify";

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
	name: "chatFlowBuilder",
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
		addFlowEdge: (state, action: PayloadAction<Edge>) => {
			state.edges.push(action.payload);
		},

		setSelectedNode: (
			state,
			action: PayloadAction<Node<MessageNodeType> | null>
		) => {
			state.selectedNode = action.payload;
		},
		saveFlow: (state, action: PayloadAction<ReactFlowJsonObject>) => {
			try {
				//check if any nodes are unconnected
				const isNodeUnconnected = () =>
					state.nodes.filter((node) => {
						!state.edges.find(
							(edge) => edge.source === node.id || edge.target === node.id
						);
					});

				if (isNodeUnconnected.length === 0) {
					localStorage.setItem(
						"chatbotFlowBuilder",
						JSON.stringify(action.payload)
					);
					toast.success("Flow Saved Successfully");
				} else {
					throw new Error("Cannot Save Flow as nodes are un connected");
				}
			} catch (error) {
				console.error("Failed to save data", error);
				toast.error("Failed to save flow");
			}
		},
		loadFlowFromLocalStorage: (state) => {
			const flow = localStorage.getItem("chatbotFlowBuilder");
			if (flow) {
				const parsedFlow = JSON.parse(flow);
				state.nodes = parsedFlow.nodes;
				state.edges = parsedFlow.edges;
				toast.success("Flow Retrieved Successfully");
			} else {
				toast.error("No Flow Found,try creating new");
			}
		},
	},
});

export const {
	dropNode,
	updateNode,
	setNodes,
	setSelectedNode,
	addFlowEdge,
	saveFlow,
	loadFlowFromLocalStorage,
} = flowBuilderSlice.actions;
export default flowBuilderSlice.reducer;
