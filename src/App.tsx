import { useState, useMemo } from "react";
import ReactFlow, {
	Background,
	Controls,
	MiniMap,
	ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import SettingsPanel from "./components/SettingsPanel";
import { useAppSelector } from "./redux/store";
import MessageNode from "./components/MessageNode";

function App() {
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance>();

	const { nodes, edges } = useAppSelector((state) => state.chatbotFlowReducer);

	const nodeTypes = { textNode: MessageNode };

	return (
		<div className="flex flex-row min-h-screen lg:flex-row gap-1">
			<div className="flex-grow h-screen">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					// onNodesChange={onNodesChange}
					// onEdgesChange={onEdgesChange}
					// onConnect={onConnect}
					onInit={setReactFlowInstance}
					fitView
				>
					<Background gap={12} size={1} />
					<Controls />
					<MiniMap zoomable pannable />
				</ReactFlow>
			</div>
			<SettingsPanel />
		</div>
	);
}

export default App;
