"use client";
import { TodoError, TodoType } from "@/types/types";
import React, { useState, useEffect } from "react";
import { privateRequest } from "@/utils/axios";
import toast, { Toaster } from "react-hot-toast";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useToken } from "@/hooks/Token";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
const Todo = () => {
	const token = useToken();

	console.log(token);
	const [todos, setTodos] = useState<TodoType>({
		title: "",
		description: "",
	});
	const [errors, setErrors] = useState<TodoError>({});
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	const inputChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target as HTMLInputElement;
		setTodos((prevTodos) => ({ ...prevTodos, [name]: value }));
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			if (!token) {
				const response = await privateRequest.post(
					"/todo",
					{
						...todos,
						dueDate: date,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return;
			}
			const response = await privateRequest.post(
				"/todo",
				{
					...todos,
					dueDate: date,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Check if the response indicates success
			if (response.status === 200 && response.data.success) {
				toast.success("Todo successfully added");
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

	return (
		<div className="flex flex-col justify-center items-center mt-24">
			<Toaster />
			<h1 className="text-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 bg-clip-text text-transparent font-bold">
				Task Master
			</h1>
			<form
				onSubmit={submitHandler}
				className="bg-white flex mt-10 flex-col shadow-2xl w-96    gap-4 p-12   text-gray-700  rounded "
			>
				<div className="flex flex-col gap-2">
					<label className="text-xl">Title</label>
					<input
						type="text"
						name="title"
						className="rounded   p-1 outline  focus:outline-green-500 indent-1 hover:outline-red-500 transition-transform delay-150 ease-in-out hover:scale-105"
						placeholder=" Title..."
						value={todos.title}
						onChange={inputChangeHandler}
					/>
					{errors?.title && <p className="text-red-600">{errors.title}</p>}
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-xl">Description</label>
					<textarea
						className="rounded   p-1 outline  focus:outline-green-500 indent-1 hover:outline-red-500 transition-transform delay-150 ease-in-out hover:scale-105"
						placeholder="Description..."
						onChange={inputChangeHandler}
						name="description"
						value={todos.description}
					/>
					{errors?.description && (
						<p className="text-red-600">{errors.description}</p>
					)}
				</div>
				<label className="text-xl">Due Date</label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[240px] justify-start text-left font-normal",
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, "PPP") : <span>Pick a due date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0 bg-white" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
				<button
					type="submit"
					className="bg-gradient-to-r mt-4 hover:scale-105 transition-transform ease-in-out delay-150  from-purple-600 via-violet-600 to-green-700 hover:from-green-700 hover:via-cyan-700 hover:to-yellow-800 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
				>
					Create Todo
				</button>
			</form>
		</div>
	);
};

export default Todo;
