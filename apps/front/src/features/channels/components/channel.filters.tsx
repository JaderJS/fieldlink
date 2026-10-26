import { Funnel, MoreVertical, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useChannelFilters } from "../hooks/use.channel.filters";

type Props = Pick<
	ReturnType<typeof useChannelFilters>,
	"params" | "setParams" | "hasFilters" | "clear"
>;

const ALL = "ALL";

export const ChannelFilters = ({
	params,
	setParams,
	clear,
	hasFilters,
}: Props) => {
	return (
		<div className="flex flex-wrap items-center justify-end gap-2">
			<Button className="flex-1">Novo canal</Button>
			<div className="relative min-w-52 flex-10">
				<InputGroup>
					<InputGroupInput
						placeholder="Buscar..."
						value={params.q}
						onChange={(e) => setParams({ q: e.target.value || null })}
					/>
					<InputGroupAddon align={"inline-end"}>
						<Search />
					</InputGroupAddon>
				</InputGroup>
			</div>

			<Popover>
				<PopoverTrigger
					render={
						<Button variant={hasFilters ? "default" : "outline"}></Button>
					}
				>
					<Funnel />
				</PopoverTrigger>
				<PopoverContent>
					<PopoverHeader>Filtros</PopoverHeader>
					<div className="grid gap-4">
						<div className="flex flex-row gap-2">
							<Input
								value={params.rx}
								onChange={(e) => setParams({ rx: e.target.value || null })}
								placeholder="RX (MHz)"
								inputMode="decimal"
								className=" font-mono"
								aria-label="Frequência RX em MHz"
							/>
							<Input
								value={params.tx ?? ""}
								onChange={(e) =>
									setParams({
										tx: !!e.target.value ? Number(e.target.value) : null,
									})
								}
								placeholder="TX (MHz)"
								inputMode="decimal"
								className="font-mono"
								aria-label="Frequência RX em MHz"
							/>
						</div>

						<Select
							value={params.spacingInKhz}
							onValueChange={(v) =>
								setParams({
									spacingInKhz: v,
								})
							}
						>
							<SelectTrigger className="w-full" aria-label="Modo">
								<SelectValue placeholder="wide" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Wide</SelectLabel>
									<SelectItem value="12500">12,5KHz</SelectItem>
									<SelectItem value="25000">25KHz</SelectItem>
									<SelectItem value="100000">1MHz</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select
							value={params.mode ?? ALL}
							onValueChange={(v) =>
								setParams({
									mode:
										v === ALL || v === null
											? null
											: (v as "ANALOG" | "DIGITAL"),
								})
							}
						>
							<SelectTrigger className="w-36" aria-label="Modo">
								<SelectValue placeholder="Modo" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={ALL}>Todos os modos</SelectItem>
								<SelectItem value="DIGITAL">Digital</SelectItem>
								<SelectItem value="ANALOG">Analógico</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</PopoverContent>
			</Popover>

			{hasFilters && (
				<Button variant="ghost" size="sm" onClick={clear}>
					<X className="size-4" />
					Limpar
				</Button>
			)}
		</div>
	);
};
