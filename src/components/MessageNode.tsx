import { Handle, Position } from "reactflow";
import { MessageNodeProps } from "../types/types";
import { memo } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
// eslint-disable-next-line react-refresh/only-export-components
const MessageNode = ({ selected, data }: MessageNodeProps) => {
	return (
		<div
			className={`w-64  shadow-md rounded-md bg-white   ${
				selected ? "border-solid border-2 border-indigo-500/100" : ""
			} `}
		>
			<div className="flex flex-col">
				<div className="max-h-max px-2 py-1 text-left text-black text-xs font-bold rounded-t-md bg-teal-300 flex flex-row justify-between item">
					<p className="inline-flex items-center gap-1">
						<BiMessageRoundedDetail />
						send message
					</p>
					<IoLogoWhatsapp className="text-green-500" />
				</div>
				<div className="px-3 py-2 ">
					<div className="text-xs font-normal text-black">
						{data.label ?? "Text Node"}
					</div>
				</div>
			</div>

			<Handle
				id="a"
				type="target"
				position={Position.Left}
				className="w-1 rounded-full bg-gray-500"
			/>
			<Handle
				id="b"
				type="source"
				position={Position.Right}
				className="w-1 rounded-full bg-gray-500"
			/>
		</div>
	);
};

export default memo(MessageNode);
