import { getRequestHeaders } from "@tanstack/react-start/server";
import axios, { type AxiosInstance } from "axios";

const API_URL = process.env.API_URL ?? "http://localhost:3333";
console.log(API_URL);

const FORWARDED_HEADERS = [
	"cookie",
	"authorization",
	"user-agent",
	"x-forwarded-for",
	"accept-language",
] as const;

export function apiServer(): AxiosInstance {
	const incoming = getRequestHeaders();
	const headers: Record<string, string> = {};

	for (const name of FORWARDED_HEADERS) {
		const value = incoming.get(name);
		if (value) headers[name] = value;
	}

	return axios.create({
		baseURL: API_URL,
		headers,
		timeout: 10_000,
	});
}

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3333",
	withCredentials: true,
	timeout: 10_000,
});
