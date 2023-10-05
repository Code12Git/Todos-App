"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { privateRequest } from "@/utils/axios";
import { TodoType } from "@/types/types";

const Cards = () => {
	const [data, setData] = useState<TodoType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await privateRequest.get("/todo");
				console.log(res.data.todos);
				setData(res.data.todos);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		getData();
	}, []);

	return (
		<div className="p-4 md:p-6 lg:p-8 xl:p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{" "}
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
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						></path>
					</svg>
					Loading...
				</p>
			) : (
				data.map((todo) => <Card key={todo.id} data={todo} />)
			)}
		</div>
	);
};

export default Cards;
