import { Edit } from "lucide-react";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { privateRequest } from "@/utils/axios";
import toast from "react-hot-toast";
import { TodoType } from "@/types/types";

import { TodoError } from "@/types/types";
import { useToken } from "@/hooks/Token";

interface CardProps {
	data: TodoType;
	getData: () => Promise<void>;
}

const UpdateDialog: React.FC<CardProps> = ({ data, getData }) => {
	const token = useToken();
	const [todo, setTodo] = useState<TodoType>({
		title: data.title || "",
		description: data.description || "",
	});
	const [date, setDate] = React.useState<Date | undefined>(new Date());
	const [errors, setErrors] = useState<TodoError>({});

	const handleFormSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const response = await privateRequest.put(
				`/todo/${data.id}`,
				{
					...todo,
					date,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200 && response.data.success) {
				getData();
				toast.success("Todo successfully updated.");
			} else {
				toast.error("An error occurred");
			}
		} catch (error: any) {
			if (error.response) {
				const inputerror = error.response.data.errors;

				setErrors(inputerror);
			} else {
				toast.error("An error occurred");
			}
		}
	};
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTodo({
			...todo,
			[name]: value,
		});
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Edit />
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Update Todo</DialogTitle>
					<DialogDescription>
						<form className="flex mt-4 flex-col space-y-4 p-4 text-gray-700">
							<div className="flex flex-col">
								<label className="text-lg font-semibold">Title</label>
								<input
									type="text"
									name="title"
									className="border rounded px-3 py-2"
									placeholder="Title"
									value={todo.title}
									onChange={handleInputChange}
								/>
								{errors?.title && (
									<p className="text-red-600">{errors.title}</p>
								)}
							</div>
							<div className="flex flex-col">
								<label className="text-lg font-semibold">Description</label>
								<textarea
									name="description"
									className="border rounded px-3 py-2 h-20"
									placeholder="Description..."
									value={todo.description}
									onChange={handleInputChange}
								></textarea>
								{errors?.description && (
									<p className="text-red-600">{errors.description}</p>
								)}
							</div>

							<button
								type="submit"
								onClick={handleFormSubmit}
								className="bg-gradient-to-r from-purple-600 via-violet-600 to-green-700 hover:from-green-700 hover:via-cyan-700 hover:to-yellow-800 text-white font-bold py-2 rounded-full transition-transform hover:scale-105 focus:outline-none focus:shadow-outline"
							>
								Update Todo
							</button>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateDialog;
