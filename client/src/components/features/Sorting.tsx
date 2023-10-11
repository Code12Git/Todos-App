"use client";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { privateRequest } from "@/utils/axios";
import toast from "react-hot-toast";
import { useToken } from "@/hooks/Token";

const Sorting = () => {
	const token = useToken();
	const priorityChangeHandler = async () => {
		try {
			const res = await privateRequest.get("todo/sort?prioritized=true", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			console.log(res.data);
			toast.success("Priority has been changed");
		} catch (err: any) {
			toast.error(err.message);
		}
	};
	return (
		<div>
			<Dialog>
				<DialogTrigger className="bg-black text-white p-2 w-24 rounded">
					Sort
				</DialogTrigger>
				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle>
							Which of the following methods you want to sort your Todos?
						</DialogTitle>
						<DialogDescription className="flex justify-around ">
							<Button
								variant="outline"
								onClick={priorityChangeHandler}
								className="bg-black  rounded text-white hover:scale-105 hover:bg-black hover:text-white"
							>
								Priority
							</Button>
							<Button
								variant="outline"
								className="bg-black rounded text-white hover:scale-105 hover:bg-black hover:text-white"
							>
								Date
							</Button>
							<Button
								variant="outline"
								className="bg-black rounded text-white hover:scale-105 hover:bg-black hover:text-white"
							>
								Button
							</Button>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default Sorting;
