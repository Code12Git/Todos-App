'use client'
import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";

const BASE_URL = "http://13.233.40.102:8000/api";

interface Token {
    token: string;
}

interface User extends Token {
    id: number;
    username: string;
    name: string;
    email: string;
}

let token: string | undefined;

export const publicRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

export const privateRequest: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});