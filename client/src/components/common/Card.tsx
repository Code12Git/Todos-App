import React from "react";
import { TodoType } from "@/types/types";

interface CardProps {
	data: TodoType;
}

const Card: React.FC<CardProps> = ({ data }) => {
	return (
		<div className="bg-gradient-to-r  from-purple-400 via-pink-500 to-red-400 rounded-lg shadow-lg overflow-hidden w-full     mb-4">
			<div className="p-4">
				<div className="flex justify-between items-center mb-3">
					<h2 className="text-lg font-semibold text-white">{data.title}</h2>
					<div
						className={`text-sm text-white ${
							data.completed ? "bg-blue-500" : "bg-gray-400"
						} px-2 py-1 rounded-full`}
					>
						{data.completed ? "Completed" : "Incomplete"}
					</div>
				</div>

				<p className="text-gray-200 mb-4">{data.description}</p>

				<div className="flex justify-between items-center text-gray-300 mb-2">
					<div className="flex items-center">
						<i className="far fa-clock mr-2"></i> Updated At: {data.updatedAt}
					</div>
					<div className="flex items-center">
						<i className="far fa-clock mr-2"></i> Created At: {data.createdAt}
					</div>
				</div>

				<div className="flex justify-between items-center text-gray-300">
					<div className="flex items-center">
						<i className="far fa-calendar mr-2"></i> Due Date: {data.dueDate}
					</div>
					<div>
						<button className="text-blue-500 hover:text-blue-700 mx-2">
							<i className="fas fa-edit"></i>
						</button>
						<button className="text-red-500 hover:text-red-700">
							<i className="fas fa-trash"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
