import type z from "zod";
import type { getCustomerSchema } from "./schemas";

export type Customer = z.infer<typeof getCustomerSchema>;
