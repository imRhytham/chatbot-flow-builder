import { BiMessageRoundedDetail } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
	setSelectedNode,
	updateNode,
} from "../redux/chatbotFlowSlice/chatbotFlowSlice";
import { MessageNodeType } from "../types/types";
import { Node } from "reactflow";
import { useEffect, useState } from "react";

const SettingsPanel = () => {
	const { selectedNode } = useAppSelector((state) => state.chatbotFlowReducer);
	const dispatch = useAppDispatch();
	const [message, setMessage] = useState<string>(
		selectedNode?.data.label ? selectedNode?.data.label : ""
	);

	useEffect(() => {
		if (selectedNode) setMessage(selectedNode?.data.label);
	}, [selectedNode]);

	const onDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		nodeType: string
	) => {
		e.dataTransfer.setData("messageNode", nodeType);
		e.dataTransfer.effectAllowed = "move";
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const handleSave = () => {
		if (selectedNode) {
			const updatedNode: Node<MessageNodeType> = {
				...selectedNode,
				data: {
					...selectedNode.data,
					label: message,
				},
			};
			dispatch(updateNode(updatedNode));
			dispatch(setSelectedNode(null));
		}
	};

	return (
		<div className="border-r-2 border-gray-200 p-4 text-sm bg-gray-100 w-64 h-screen text-black">
			{selectedNode ? (
				<>
					<div>
						<h3 className="text-xl mb-2 text-blue-900">Update Node</h3>
						<label className="block mb-2 text-sm font-medium text-blue-900">
							Node Name:
						</label>
						<input
							type="text"
							className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-blue-300 rounded-lg bg-white focus:outline-none focus:border-blue-500"
							value={message}
							onChange={handleChange}
						/>
						<div className="flex flex-row gap-2 justify-center">
							<button
								className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
								onClick={handleSave}
							>
								Save
							</button>
							<button
								className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
								onClick={() => dispatch(setSelectedNode(null))}
							>
								Go Back
							</button>
						</div>
					</div>
				</>
			) : (
				<div
					className="bg-white p-2 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
					onDragStart={(e) => onDragStart(e, "messageNode")}
					draggable
				>
					<BiMessageRoundedDetail className="text-3xl" />
					New Message
				</div>
			)}
		</div>
	);
};

export default SettingsPanel;
