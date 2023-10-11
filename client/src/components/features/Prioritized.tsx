"use client";
import React, { useState } from "react";

import { TodoType } from "@/types/types";
import { useToken } from "@/hooks/Token";
import { privateRequest } from "@/utils/axios";
import toast from "react-hot-toast";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
	data: TodoType;
	getData: () => Promise<void>;
}

const Prioritized: React.FC<Props> = ({ data, getData }) => {
	const token = useToken();

	const [priority, setPriority] = useState(data.prioritized);

	const handleChangePriority = (newValue: boolean) => {
		setPriority(newValue);
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		try {
			const res = await privateRequest.put(
				`/todo/priority/${data.id}`,
				{
					prioritized: priority,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			getData();
			toast.success("Priority changed successfully!");
		} catch (err: any) {
			toast.error("Failed to change priority.");
		}
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger
					className={`text-sm text-white px-2 py-1 rounded-full ${
						priority ? "bg-yellow-500" : "bg-gray-400"
					} transition-colors duration-300`}
				>
					{priority ? "PRIORITIZED" : "SIMPLE"}
				</DialogTrigger>

				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle>Do you want to change priority?</DialogTitle>
						<DialogDescription className="flex gap-2 flex-col">
							<select
								value={priority ? "true" : "false"}
								onChange={(e) =>
									handleChangePriority(e.target.value === "true")
								}
								className="w-full  px-3 py-2 bg-gradient-to-r from-blue-400 to-green-500 text-white rounded-md shadow-md"
							>
								<option className="text-black" value="true">
									True
								</option>
								<option className="text-black" value="false">
									False
								</option>
							</select>
							<button
								onClick={handleSubmit}
								className="bg-gradient-to-r rounded hover:scale-110 transition duration-200 delay-300 ease-in-out from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2"
							>
								Change Priority
							</button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Prioritized;
