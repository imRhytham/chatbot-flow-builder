import { useState, useMemo, useCallback, useRef, RefObject } from "react";
import ReactFlow, {
	Controls,
	MiniMap,
	ReactFlowInstance,
	applyNodeChanges,
	Node,
	NodeChange,
	Connection,
	Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import SettingsPanel from "./components/SettingsPanel";
import { useAppDispatch, useAppSelector } from "./redux/store";
import MessageNode from "./components/MessageNode";
import {
	dropNode,
	setNodes,
	setSelectedNode,
	addFlowEdge,
	saveFlow,
	loadFlowFromLocalStorage,
} from "./redux/chatbotFlowSlice/chatbotFlowSlice";
import { MessageNodeType } from "./types/types";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
		(_event: unknown, node: Node<MessageNodeType>) => {
			dispatch(setSelectedNode(node));
		},
		[dispatch]
	);

	//unselect the node
	const onPaneClick = useCallback(() => {
		dispatch(setSelectedNode(null));
	}, [dispatch]);

	//function to add connection to nodes
	const onConnect = useCallback(
		(params: Connection | Edge) => {
			const edge = params as Edge;
			if (edge.source && edge.target) {
				dispatch(addFlowEdge(edge));
			}
		},
		[dispatch]
	);

	//save the flow to the local storage
	const saveChatbotFlow = () => {
		const flow = reactFlowInstance?.toObject();
		if (flow) {
			console.log(flow);
			dispatch(saveFlow(flow));
		}
	};

	//retrieve flow from localstorage
	const loadFlow = () => {
		dispatch(loadFlowFromLocalStorage());
	};

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={false}
				theme="colored"
				draggable={false}
				transition={Slide}
			/>
			<div className="h-screen">
				<div className="h-[10%] p-4 bg-gray-100 border border-gray-200 flex justify-between items-center p-">
					<h1 className="text-3xl text-blue-500 font-bold">
						Chatbot Flow Builder
					</h1>
					<div className="inline-flex gap-2">
						<button
							onClick={saveChatbotFlow}
							className="bg-white p-2 border-2 border-blue-500 rounded flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
						>
							Save Flow
						</button>
						<button
							onClick={loadFlow}
							className="bg-white p-2 border-2 border-blue-500 rounded flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
						>
							Load Flow
						</button>
					</div>
				</div>
				<div className="flex flex-row lg:flex-row gap-1 h-[90%] ">
					<div className="flex-grow h-full" ref={flowContainerRef}>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							nodeTypes={nodeTypes}
							onNodesChange={onNodesChange}
							onNodeClick={onNodeClick}
							onConnect={onConnect}
							onDrop={handleDrop}
							onDragOver={handleDragOver}
							onInit={setReactFlowInstance}
							onPaneClick={onPaneClick}
							fitView
						>
							<Controls />
							<MiniMap zoomable pannable nodeStrokeWidth={3} />
						</ReactFlow>
					</div>
					<SettingsPanel />
				</div>
			</div>
		</>
	);
}

export default App;
