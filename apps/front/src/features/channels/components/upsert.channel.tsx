import { Channel } from "@fieldlink/server/types";
import type { SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputFrequency } from "@/components/ui/my/input.frequency";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SelectCustomers } from "@/features/customers/components/select.customers";
import { type ChannelForm, useChannelForm } from "../hooks/use.channel.form";

export const UpsertChannel = ({
	channel,
	onSuccess,
}: {
	channel?: Channel;
	onSuccess?: () => void;
} = {}) => {
	const form = useChannelForm({
		initialValues: {
			id: channel?.id ?? "",
			title: channel?.title,
			description: channel?.description ?? "",
			rx: ((channel?.rx ?? 0) / 1000).toString() ?? "",
			tx: ((channel?.tx ?? 0) / 1000).toString() ?? "",
			customerId: channel?.customerId,
			colorCode: channel?.digital?.colorCode,
			slot: channel?.digital?.slot,
			talkgroup: channel?.digital?.talkgroupId,
			protocol: channel?.digital?.protocol as "DMR",
			squelchMode: channel?.analog?.squelchMode,
			rxDcsCode: channel?.analog?.rxDcsCode,
			txDcsCode: channel?.analog?.txDcsCode,
			rxToneHz: Number(channel?.analog?.rxToneHz),
			txToneHz: Number(channel?.analog?.txToneHz),
			mode: channel?.mode,
		},
		onSuccess: () => {
			onSuccess?.();
		},
	});

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	const changeMode = (mode: "DIGITAL" | "ANALOG") => {
		const { id, customerId, title, description, rx, tx } = form.state.values;
		const base = { id, customerId, title, description, rx, tx };

		form.reset(
			mode === "DIGITAL"
				? { ...base, mode, protocol: "DMR", colorCode: 0, slot: 1 }
				: { ...base, mode, squelchMode: "CARRIER" },
		);
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit}>
				<FieldSet>
					<FieldLegend></FieldLegend>
					<FieldDescription></FieldDescription>

					<FieldGroup>
						<form.Field
							name="title"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Titulo</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="description"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>

					<FieldGroup className="flex flex-row">
						<form.Field
							name="customerId"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Clientes</FieldLabel>
										<SelectCustomers
											value={field.state.value}
											onValueChange={(v) => field.handleChange(v)}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						<form.Field
							name="mode"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Modo</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(v) => {
												if (!v) return;
												changeMode(v);
											}}
										>
											<SelectTrigger>
												<SelectValue placeholder="Modo de operação" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Modos</SelectLabel>
													<SelectItem value="DIGITAL">DIGITAL</SelectItem>
													<SelectItem value="ANALOG">ANALOGICO</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>

					<FieldGroup className="flex flex-row">
						<form.Field
							name="rx"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>RX</FieldLabel>
										<InputFrequency
											id={field.name}
											name={field.name}
											value={field.state.value}
											onValueChange={(v) => field.handleChange(v)}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						<form.Field
							name="tx"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>TX</FieldLabel>
										<InputFrequency
											id={field.name}
											name={field.name}
											value={field.state.value}
											onValueChange={(v) => field.handleChange(v)}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>

					<FormChannelDigital form={form} />
					<FormChannelAnalog form={form} />
				</FieldSet>
				<Button type="submit">Salvar</Button>
			</form>
		</div>
	);
};

const FormChannelAnalog = ({ form }: { form: ChannelForm }) => {
	return (
		<form.Subscribe
			selector={(s) => s.values.mode}
			children={(mode) =>
				mode === "ANALOG" && (
					<FieldGroup className="flex flex-row">
						<form.Field
							name="squelchMode"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel>Squelch mode</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(v) =>
												field.handleChange(v as "CARRIER" | "CTCSS" | "DCS")
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="Selecione o modo de squelch" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Modos de silenciador</SelectLabel>
													<SelectItem value="CARRIER">CARRIER</SelectItem>
													<SelectItem value="CTCSS">CTCSS</SelectItem>
													<SelectItem value="DSC">DSC</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				)
			}
		/>
	);
};

const FormChannelDigital = ({ form }: { form: ChannelForm }) => {
	return (
		<form.Subscribe selector={(s) => s.values.mode}>
			{(mode) =>
				mode === "DIGITAL" && (
					<FieldGroup className="flex flex-row">
						<form.Field
							name="colorCode"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Color code</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(v) => field.handleChange(Number(v))}
										>
											<SelectTrigger>
												<SelectValue placeholder="Codigo de cor" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Codigo de cor</SelectLabel>
													{Array.from({ length: 16 }, (_, index) =>
														String(index),
													).map((value) => (
														<SelectItem key={value} value={value}>
															{value}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="slot"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Slot</FieldLabel>
										<Select
											value={field.state.value}
											onValueChange={(v) => field.handleChange(Number(v))}
										>
											<SelectTrigger>
												<SelectValue placeholder="Slot" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Slot</SelectLabel>
													<SelectItem value={"1"}>1</SelectItem>
													<SelectItem value={"2"}>2</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				)
			}
		</form.Subscribe>
	);
};
