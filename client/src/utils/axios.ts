import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:8000/api";

interface Token {
    token: string;
}

interface User extends Token {
    id: number;
    username: string;
    name: string;
    email: string;
}

// Get the user token from local storage
const userStorageData = localStorage.getItem("user");
const user: User | null = JSON.parse(userStorageData || "null");
const token: string | undefined = user?.token;
console.log(token)

export const publicRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const privateRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token || ""}`
    }
});
