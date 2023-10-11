"use client";
import React from "react";
import { TodoType } from "@/types/types";
import { DeleteIcon, Edit } from "lucide-react";
import { privateRequest } from "@/utils/axios";
import toast, { Toaster } from "react-hot-toast";
import Status from "../features/Status";
import UpdateDialog from "./UpdateDialog";
import { useToken } from "@/hooks/Token";
import Prioritized from "../features/Prioritized";

interface CardProps {
	data: TodoType;
	formatDueDate: (dateString: string) => string;
	getData: () => Promise<void>;
}

const Card: React.FC<CardProps> = ({ data, formatDueDate, getData }) => {
	const token = useToken();

	const handleDelete = async () => {
		try {
			if (token) {
				const res = await privateRequest.delete(`/todo/${data.id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (res.status === 200) {
					// Successful delete
					getData();
					toast.success("Todo deleted successfully!");
				} else {
					// Handle any other response status (e.g., error handling)
					toast.error("Delete request failed");
				}
			} else {
				// Handle the case where the token is not available (e.g., user not authenticated)
				toast.error("Token is not available. User not authenticated.");
			}
		} catch (err: any) {
			toast.error("Error while deleting todo:", err);
		}
	};

	return (
		<div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-400  transition-transform hover:scale-105 cursor-pointer ease-in-out delay-300 duration-200 rounded shadow-lg overflow-hidden w-full mb-4">
			<div className="p-4">
				<div className="flex justify-between items-center mb-3">
					<h2 className="text-lg font-semibold text-white">{data.title}</h2>
					<Status getData={getData} data={data} />
					<Prioritized getData={getData} data={data} />
				</div>

				<p className="text-gray-200 mb-4">{data.description}</p>

				<div className="flex justify-between items-center text-gray-300 mb-2">
					<div className="flex items-center">
						<i className="far fa-clock mr-2"></i> Created At:{" "}
						{data.createdAt ? formatDueDate(data.createdAt) : "N/A"}
					</div>
				</div>

				<div className="flex justify-between items-center text-gray-300">
					<div className="flex items-center">
						<i className="far fa-calendar mr-2 animate-ping"></i> Due Date:{" "}
						{data.dueDate ? formatDueDate(data.dueDate) : "N/A"}
					</div>
					<div className="flex items-center">
						<button className="text-blue-500 hover:text-blue-700 mx-2 transition-colors duration-300">
							<UpdateDialog data={data} getData={getData} />
						</button>
						<button className="text-red-500 hover:text-red-700 transition-colors duration-300">
							<DeleteIcon onClick={handleDelete} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
