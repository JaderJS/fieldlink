import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ViewChannels } from "@/features/channels/domain/view.channels";
import { getChannelsOPTIONS } from "@/features/channels/hooks/use.get.channels";

export const Route = createFileRoute("/(private)/_protected/channels/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		context.queryClient.query(getChannelsOPTIONS());
	},
});

function RouteComponent() {
	const { data } = useSuspenseQuery(getChannelsOPTIONS());
	return <ViewChannels channels={data.channels} />;
}
