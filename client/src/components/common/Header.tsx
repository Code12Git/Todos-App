"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Header = () => {
	const router = useRouter();
	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");

		router.push("/login");
	};

	return (
		<div className="bg-gradient-to-r from-pink-400 via-red-200 to-violet-400 p-4">
			<div className="container mx-auto">
				<div className="flex items-center justify-between">
					<h1 className="text-xl md:text-2xl  bg-gradient-to-r from-red-400 via-blue-400 to-amber-400 bg-clip-text text-transparent  lg:text-3xl font-bold text-white">
						Task Master
					</h1>
					<Button
						className="bg-gradient-to-r rounded hover:scale-110 transition duration-200 delay-300 ease-in-out from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
						onClick={handleLogout} // Add onClick handler for logout
					>
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
