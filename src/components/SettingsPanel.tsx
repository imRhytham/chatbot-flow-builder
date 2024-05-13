import { BiMessageRoundedDetail } from "react-icons/bi";

const SettingsPanel = () => {
	const onDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		nodeType: string
	) => {
		e.dataTransfer.setData("application/chatbotFlow", nodeType);
		e.dataTransfer.effectAllowed = "move";
	};

	return (
		<div className="border-r-2 border-gray-200 p-4 text-sm bg-gray-100 w-64 h-screen text-black">
			{/* <h3 className="text-xl text-center mb-4 text-blue-900">Nodes Panel</h3> */}
			<div
				className="bg-white p-2 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
				onDragStart={(e) => onDragStart(e, "textNode")}
				draggable
			>
				<BiMessageRoundedDetail className="text-3xl" />
				New Message
			</div>
		</div>
	);
};

export default SettingsPanel;
