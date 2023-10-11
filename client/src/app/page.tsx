"use client";
import { useEffect } from "react";
import Cards from "@/components/common/Cards";
import Header from "@/components/common/Header";
import Todo from "@/components/features/Todo";
import { useRouter } from "next/navigation"; // Import the router

export default function Home() {
	const router = useRouter(); // Initialize the router

	useEffect(() => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("token");

			if (!token) {
				router.push("/login");
			}
		}
	}, []);

	return (
		<>
			<Header />
			<main className="bg-gradient-to-r from-pink-400 via-red-200 to-violet-400 p-4">
				<Cards />
			</main>
		</>
	);
}
