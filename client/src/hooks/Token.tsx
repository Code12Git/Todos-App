// useToken.js
"use client";
import { useEffect, useState } from "react";

export function useToken() {
	const [token, setToken] = useState<string | undefined>(undefined);

	useEffect(() => {
		// Retrieve the token from wherever it's stored (e.g., localStorage)
		const userStorageData = localStorage.getItem("user");
		console.log(userStorageData);
		const user = JSON.parse(userStorageData || "null");
		const userToken = user?.token || "";
		console.log(userToken);

		// Set the token in the state
		setToken(userToken);
	}, []);

	return token;
}
