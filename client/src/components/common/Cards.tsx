"use client";
import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import { privateRequest } from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { TodoType } from "@/types/types";
import { format } from "timeago.js";
import { motion } from "framer-motion";
import { useToken } from "@/hooks/Token";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
const containerVariants = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const Cards = () => {
	const token = useToken();
	console.log(token);
	const [data, setData] = useState<TodoType[]>([]);
	const [loading, setLoading] = useState(true);
	const [pgnum, setPgnum] = useState(0);
	const [pgsize, setPgsize] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");

	const handlePageChange = useCallback(
		(newPgnum: number) => {
			setPgnum(newPgnum);
		},
		[setPgnum]
	);
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const getData = async () => {
		try {
			let res;

			if (!token) {
				res = await privateRequest.get(
					`/todo/pagination?pgnum=${pgnum}&pgsize=${pgsize}`
				);
			} else {
				res = await privateRequest.get(`/todo/pagination`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						pgnum,
						pgsize,
						search: searchTerm,
					},
				});
			}

			setData(res.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};

	const handleNextPage = useCallback(() => {
		if (data.length === 0) {
			toast.error("No more todos available");
		} else {
			handlePageChange(pgnum + 1);
		}
	}, [data, handlePageChange, pgnum]);

	const handlePreviousPage = useCallback(() => {
		if (pgnum > 0) {
			handlePageChange(pgnum - 1);
		}
	}, [handlePageChange, pgnum]);

	useEffect(() => {
		if (token) {
			getData();
		}
	}, [token, searchTerm, pgnum, pgsize]);

	const formatDueDate = (dateString: string) => {
		const timeAgoInstance = format(dateString);
		return timeAgoInstance;
	};

	return (
		<>
			{/* Searching */}
			<div className="flex items-center justify-center h-full mt-10">
				<Input
					className="w-full rounded bg-white md:w-64 p-2  border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500"
					type="text"
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="Search..."
				/>
			</div>

			{/*Rendering Cards */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="p-4 md:p-6 lg:p-8 xl:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
			>
				{loading ? (
					<p className="text-center text-gray-500 animate-spin">
						<svg
							className="w-6 h-6 inline-block mr-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							></path>
						</svg>
						Loading...
					</p>
				) : (
					data?.map((todo) => (
						<motion.div key={todo.id} className="item" variants={itemVariants}>
							<Card
								data={todo}
								formatDueDate={formatDueDate}
								getData={getData}
							/>
						</motion.div>
					))
				)}
			</motion.div>

			{/*Pagination */}
			<div className="flex justify-between mt-10">
				<Button
					onClick={handlePreviousPage}
					variant="outline"
					className="bg-black rounded-e text-white border-none hover:bg-black hover:text-white hover:scale-110 transition delay-150 duration-200 ease-in-out"
				>
					Previous
				</Button>
				<Button
					onClick={handleNextPage}
					variant="outline"
					className="bg-black rounded-e text-white border-none hover:bg-black hover:text-white hover:scale-110 transition delay-150 duration-200 ease-in-out"
				>
					Next
				</Button>
			</div>
		</>
	);
};

export default Cards;
