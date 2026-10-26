import type { getChannels } from "./use";

export type Channel = Awaited<ReturnType<typeof getChannels>>[0];
