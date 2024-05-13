import { useState, useMemo, useCallback, useRef, RefObject } from "react";
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	ReactFlowInstance,
	applyNodeChanges,
	Node,
	NodeChange,
	Connection,
	Edge,
	addEdge,
	applyEdgeChanges,
	EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";
import SettingsPanel from "./components/SettingsPanel";
import { useAppDispatch, useAppSelector } from "./redux/store";
import MessageNode from "./components/MessageNode";
import {
	dropNode,
	setEdges,
	setNodes,
	setSelectedNode,
	addFlowEdge,
} from "./redux/chatbotFlowSlice/chatbotFlowSlice";
import { MessageNodeType } from "./types/types";

function App() {
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);
	const flowContainerRef: RefObject<HTMLDivElement> = useRef(null);
	const dispatch = useAppDispatch();
	const { nodes, edges } = useAppSelector((state) => state.chatbotFlowReducer);

	const nodeTypes = useMemo(() => {
		return { messageNode: MessageNode };
	}, []);

	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}, []);

	//Function to add the new node
	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			const nodeType = e.dataTransfer.getData("messageNode");
			if (nodeType && flowContainerRef.current && reactFlowInstance) {
				const flowContainerBounds =
					flowContainerRef.current.getBoundingClientRect();
				const position = reactFlowInstance.screenToFlowPosition({
					x: e.clientX - flowContainerBounds.left,
					y: e.clientY - flowContainerBounds.top,
				});
				dispatch(dropNode({ type: nodeType, position }));
			}
		},
		[dispatch, reactFlowInstance]
	);

	//helps to drag drop the node inside the container
	const onNodesChange = useCallback(
		(changes: NodeChange[]) => {
			dispatch(setNodes(applyNodeChanges(changes, nodes)));
		},
		[dispatch, nodes]
	);

	//select the node
	const onNodeClick = useCallback(
		(e: React.MouseEvent, node: Node<MessageNodeType>) => {
			dispatch(setSelectedNode(node));
		},
		[dispatch]
	);

	//unselect the node
	const onPaneClick = useCallback(() => {
		dispatch(setSelectedNode(null));
	}, [dispatch]);

	//function to handle edges
	const onEdgesChange = useCallback(
		(changedEdges: EdgeChange[]) => {
			dispatch(setEdges(applyEdgeChanges(changedEdges, edges)));
		},
		[dispatch, edges]
	);

	//function to handle connection to nodes
	const onConnect = useCallback(
		(params: Connection | Edge) => {
			const edge = params as Edge;
			if (edge.source && edge.target) {
				dispatch(addFlowEdge(edge));
			}
		},
		[dispatch]
	);

	return (
		<div className="flex flex-row min-h-screen lg:flex-row gap-1">
			<div className="flex-grow h-screen" ref={flowContainerRef}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onNodeClick={onNodeClick}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onInit={setReactFlowInstance}
					onPaneClick={onPaneClick}
					fitView
				>
					<Background gap={12} size={1} />
					<Controls />
					<MiniMap zoomable pannable nodeStrokeWidth={3} />
				</ReactFlow>
			</div>
			<SettingsPanel />
		</div>
	);
}

export default App;
