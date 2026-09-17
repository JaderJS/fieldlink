import { ZodTypeAny } from "zod";

type FieldMeta = {
    label: string;
    showLabel: boolean;
    description?: string;
};

export const getFieldMeta = (field: ZodTypeAny, { name }: { name: string }): FieldMeta => {
    const defaultLabel = field._def?.fieldName ?? name // fallback genérico
    try {
        const parsed = field._def?.description ? JSON.parse(field._def.description) : {}

        return {
            label: parsed.label ?? defaultLabel,
            showLabel: parsed.showLabel !== false, // default: true
            description: parsed.description,
        };
    } catch (e) {
        // Se não for um JSON válido
        return {
            label: defaultLabel,
            showLabel: true,
        };
    }
};
