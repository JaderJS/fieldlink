export { cn } from "cn";

// lib/mhz.ts
const MAX_INT_DIGITS = 3; // até 9999 MHz
const MAX_DECIMALS = 5; // 146.520

export const maskMHz = (raw: string): string => {
	const cleaned = raw.replace(/\./g, ",").replace(/[^\d,]/g, "");
	const [int = "", ...rest] = cleaned.split(",");
	const intPart = int.slice(0, MAX_INT_DIGITS);

	if (rest.length === 0) return intPart;

	return `${intPart},${rest.join("").slice(0, MAX_DECIMALS)}`;
};

export const padMHz = (value: string): string => {
	if (!value) return "";
	const [int, dec = ""] = value.split(",");
	return `${int || "0"},${dec.padEnd(MAX_DECIMALS, "0")}`;
};
