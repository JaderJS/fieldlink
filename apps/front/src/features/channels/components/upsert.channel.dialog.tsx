import type { Channel } from "@fieldlink/server/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UpsertChannel } from "./upsert.channel";

export const EditChannelDialog = ({ channel }: { channel: Channel }) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<Button variant="ghost" size="icon" aria-label="Editar canal">
						<Pencil className="size-4" />
					</Button>
				}
			/>

			<DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Editar canal</DialogTitle>
					<DialogDescription>{channel.title}</DialogDescription>
				</DialogHeader>

				<UpsertChannel channel={channel} onSuccess={() => setOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};
