import type { Channel } from "@fieldlink/server/types";
import { cn } from "cn";
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	RadioIcon,
	Search,
	Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { ChannelFilters } from "../components/channel.filters";
import { EditChannelDialog } from "../components/upsert.channel.dialog";
import { useChannelFilters } from "../hooks/use.channel.filters";
import { useGetChannels } from "../hooks/use.get.channels";

const formatMhz = (hz: number) =>
	`${(hz / 1_000_000).toFixed(5).replace(".", ",")} MHz`;

const formatDate = (date: Date | string) =>
	new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
	}).format(new Date(date));

const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
	<div className="flex flex-col gap-0.5">
		<span className="text-muted-foreground text-xs">{label}</span>
		<span className="font-medium text-sm">{value}</span>
	</div>
);

const Frequency = ({
	icon: Icon,
	label,
	hz,
}: {
	icon: typeof RadioIcon;
	label: string;
	hz: number;
}) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4 text-muted-foreground" />
		<div className="flex flex-col">
			<span className="text-muted-foreground text-xs">{label}</span>
			<span className="font-mono text-sm">{formatMhz(hz)}</span>
		</div>
	</div>
);

const DigitalDetails = ({
	digital,
}: {
	digital: NonNullable<Channel["digital"]>;
}) => (
	<div className="grid grid-cols-2 gap-3">
		<Info label="Protocolo" value={digital.protocol} />
		<Info label="Color code" value={digital.colorCode} />
		<Info label="Slot" value={digital.slot} />
		<Info label="Talkgroup" value={digital.talkgroupId ?? "—"} />
	</div>
);

const AnalogDetails = ({
	analog,
}: {
	analog: NonNullable<Channel["analog"]>;
}) => (
	<div className="grid grid-cols-2 gap-3">
		<Info label="Squelch" value={analog.squelchMode} />
		{analog.squelchMode === "CTCSS" && (
			<>
				<Info
					label="Tom TX"
					value={analog.txToneHz ? `${analog.txToneHz} Hz` : "—"}
				/>
				<Info
					label="Tom RX"
					value={analog.rxToneHz ? `${analog.rxToneHz} Hz` : "—"}
				/>
			</>
		)}
		{analog.squelchMode === "DCS" && (
			<>
				<Info label="DCS TX" value={analog.txDcsCode ?? "—"} />
				<Info label="DCS RX" value={analog.rxDcsCode ?? "—"} />
			</>
		)}
	</div>
);

const ChannelCard = ({ channel }: { channel: Channel }) => (
	<Card>
		<CardHeader>
			<div className="flex items-start justify-between gap-2">
				<CardTitle className="line-clamp-1">{channel.title}</CardTitle>
				<div className="flex items-center gap-1">
					<Badge variant={channel.mode === "DIGITAL" ? "default" : "secondary"}>
						{channel.mode === "DIGITAL" ? "Digital" : "Analógico"}
					</Badge>
					<EditChannelDialog channel={channel} />
					<Button variant={"destructive"} size={"sm"}>
						<Trash />
					</Button>
				</div>
			</div>
			<CardDescription className="line-clamp-2">
				{channel.description || "Sem descrição"}
			</CardDescription>
			<CardDescription>{channel.customer?.name}</CardDescription>
		</CardHeader>

		<CardContent className="flex flex-1 flex-col gap-4">
			<div className="grid grid-cols-2 gap-3">
				<Frequency icon={ArrowDownToLine} label="RX" hz={channel.rx} />
				<Frequency icon={ArrowUpFromLine} label="TX" hz={channel.tx} />
			</div>

			<Separator />

			{channel.mode === "DIGITAL" && channel.digital && (
				<DigitalDetails digital={channel.digital} />
			)}
			{channel.mode === "ANALOG" && channel.analog && (
				<AnalogDetails analog={channel.analog} />
			)}
			{!channel.digital && !channel.analog && (
				<span className="text-center text-muted-foreground">
					Nada cadastrado
				</span>
			)}
		</CardContent>

		<CardFooter className="text-muted-foreground text-xs">
			Atualizado em {formatDate(channel.updatedAt)} | por{" "}
			{channel.updater?.name}
		</CardFooter>
	</Card>
);

export const ViewChannels = ({ channels }: { channels: Channel[] }) => {
	const { filters, ...props } = useChannelFilters();

	const { data, isFetching, error } = useGetChannels({
		mode: filters.mode,
		rx: filters.rx,
		tx: filters.tx ?? undefined,
		search: filters.search,
	});

	// if (data?.channels.length === 0) {
	// 	return (
	// 		<div className="flex w-full flex-col items-center gap-2 py-12 text-muted-foreground">
	// 			<RadioIcon className="size-8" />
	// 			<p className="text-sm">Nenhum canal cadastrado</p>
	// 		</div>
	// 	);
	// }

	return (
		<div className="flex w-full flex-col gap-4">
			<ChannelFilters
				params={props.params}
				setParams={props.setParams}
				hasFilters={props.hasFilters}
				clear={props.clear}
			/>
			<div
				className={cn(
					isFetching ? "opacity-60 transition-opacity" : "transition-opacity",
					"grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
				)}
			>
				{data?.channels.map((channel) => (
					<ChannelCard key={channel.id} channel={channel} />
				))}
			</div>
		</div>
	);
};
