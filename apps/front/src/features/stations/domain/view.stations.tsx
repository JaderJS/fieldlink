import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ViewStationsProps = ComponentProps<"div"> & {
	stations: Array<{
		id: string;
	}>;
};

export function ViewStations({
	className,
	stations,
	...props
}: ViewStationsProps) {
	return (
		<div className={cn(className)} {...props}>
			{(stations ?? []).map((station) => (
				<div key={station.id}>{station.id}</div>
			))}
		</div>
	);
}
