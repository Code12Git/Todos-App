"use client";
import React, { useState } from "react";
import { TodoType } from "@/types/types";
import { Button } from "@/components/ui/button";
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

const Status: React.FC<Props> = ({ data, getData }) => {
	const token = useToken();
	const [status, setStatus] = useState(data.status);

	const handleChangeStatus = (newValue: string) => {
		setStatus(newValue);
	};

	const handleChangeHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		try {
			const res = await privateRequest.put(
				`/todo/status/${data.id}`,
				{
					status: status,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			getData();
			toast.success("Status changed successfully!");
		} catch (err: any) {
			toast.error("Failed to change status.");
		}
	};

	return (
		<div>
			<Dialog>
				<DialogTrigger
					className={`text-sm text-white ${
						status === "PENDING"
							? "bg-red-500"
							: status === "COMPLETED"
							? "bg-blue-500"
							: status === "IN_PROGRESS"
							? "bg-yellow-500"
							: "bg-gray-400"
					} px-2 py-1 rounded-full transition-colors duration-300`}
				>
					{status}
				</DialogTrigger>
				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle>Do you want to change status?</DialogTitle>
						<DialogDescription className="flex gap-2  flex-col">
							<select
								value={status}
								onChange={(e) => handleChangeStatus(e.target.value)}
								className="w-full  px-3 py-2 bg-gradient-to-r from-blue-400 to-green-500 text-white rounded-md shadow-md"
							>
								<option className="text-black" value="PENDING">
									PENDING
								</option>
								<option className="text-black" value="IN_PROGRESS">
									IN_PROGRESS
								</option>
								<option className="text-black" value="COMPLETED">
									COMPLETED
								</option>
							</select>
							<Button
								onClick={handleChangeHandler}
								className="w-44  rounded  bg-black hover:bg-black hover:text-white text-white"
							>
								Change Status
							</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Status;
