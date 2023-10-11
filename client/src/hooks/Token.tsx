// useToken.js
"use client";
import { useEffect, useState } from "react";

export function useToken() {
	const [token, setToken] = useState<string | undefined>(undefined);

	useEffect(() => {
		const userStorageData = localStorage.getItem("user");
		const user = JSON.parse(userStorageData || "null");
		const userToken = user?.token || "";

		setToken(userToken);
	}, []);

	return token;
}
