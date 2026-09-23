import { radio } from "@fieldlink/database/domain";
import { getServerSession } from "@/lib/auth/server";
import { createStation } from "../api/api";

export function FormCreateStation() {
	const handleCreate = async (
		data: Parameters<typeof radio.stations.createStation>[0],
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

	return <div>Criar</div>;
}
