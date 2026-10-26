import { radio } from "@fieldlink/database/domain";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth/functions";
import { createStation } from "../api/api";

export function FormCreateStation() {
	const handleCreate = async (
		data: Omit<Parameters<typeof radio.stations.createStation>[0], "actorId">,
	) => {
		const { data: session } = await getServerSession();
		if (!session?.user) {
			throw new Error("User not authenticated");
		}
		createStation({
			data: {
				actorId: session?.user.id,
				customerId: "",
				mode: "ANALOG",
				title: "My debug",
			},
		});
	};

	return (
		<div>
			<Button
				onClick={() =>
					handleCreate({
						customerId: "",
						mode: "ANALOG",
						title: "abcd",
					})
				}
			>
				Criar nova estação
			</Button>
		</div>
	);
}
