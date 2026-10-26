import type z from "zod";
import type { getChannelSchema } from "./schema";

export type Channel = z.infer<typeof getChannelSchema>;
