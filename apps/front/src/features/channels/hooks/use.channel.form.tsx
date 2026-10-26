import {
	type UpsertChannelInput,
	upsertChannelSchemaFRONT,
} from "@fieldlink/contracts";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toastFormErrors } from "@/core/toast.submit.invalid";
import { useUpsertChannel } from "./use.upsert.channel";

export const channelDefaultValues: UpsertChannelInput = {
	id: undefined,
	customerId: "",
	title: "",
	description: "",
	mode: "DIGITAL",
	rx: "",
	tx: "",
	colorCode: 0,
	slot: 1,
	protocol: "DMR",
	talkgroup: "0",
};

type UseChannelFormOptions = {
	initialValues?: Partial<UpsertChannelInput>;
	onSuccess?: () => void;
};

export const useChannelForm = ({
	initialValues,
	onSuccess,
}: UseChannelFormOptions = {}) => {
	const { mutateAsync: upsertChannel } = useUpsertChannel();
	const form = useForm({
		defaultValues: {
			...channelDefaultValues,
			...initialValues,
		} as UpsertChannelInput,
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: upsertChannelSchemaFRONT,
		},
		onSubmitInvalid: async ({ formApi }) => {
			console.log(form.state.values);
			toastFormErrors(
				formApi.state.fieldMeta
					? Object.fromEntries(
							Object.entries(formApi.state.fieldMeta).map(([name, meta]) => [
								name,
								meta.errors,
							]),
						)
					: {},
			);
		},
		onSubmit: async ({ value, formApi }) => {
			const data = upsertChannelSchemaFRONT.parse(value);
			if (data.mode === "DIGITAL") {
				await upsertChannel({
					data: {
						id: data.id,
						rx: data.rx,
						tx: data.tx,
						title: data.title,
						customerId: data.customerId,
						description: data.description,
						colorCode: data.colorCode,
						slot: data.slot,
						mode: data.mode,
					},
				});
			}
			if (data.mode === "ANALOG") {
				await upsertChannel({
					data: {
						id: data.id,
						rx: data.rx,
						tx: data.tx,
						title: data.title,
						customerId: data.customerId,
						description: data.description,
						mode: data.mode,
						squelchMode: data.squelchMode,
						rxToneHz: data.rxToneHz,
						txToneHz: data.txToneHz,
						rxDcsCode: data.rxDcsCode,
						txDcsCode: data.txDcsCode,
					},
				});
			}

			// formApi.reset();
			onSuccess?.();
		},
	});

	return form;
};

export type ChannelForm = ReturnType<typeof useChannelForm>;
