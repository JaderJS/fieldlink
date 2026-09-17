import { z } from "zod"

export const upsertArchiveSchema = z.object({
    cuid: z.string().optional(),
    title: z.string({ message: 'Escreva um nome para o arquivo' }).min(3, { message: 'O nome para o arquivo deve conter ao meno três caracteres' }),
    file: z.instanceof(File, {
        message: 'Por favor, selecione um arquivo'
    }).optional(),
    pathUrl: z.string().optional()
}).superRefine((data, ctx) => {
    // Validação condicional: file é obrigatório quando não há pathUrl
    if (!data.pathUrl && !data.file) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Por favor, selecione um arquivo ou forneça uma URL',
            path: ['file']
        });
    }

    // Validação adicional se necessário
    if (data.file && data.file.size === 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'O arquivo não pode estar vazio',
            path: ['file']
        });
    }
})

export type UpsertArchiveSchema = z.infer<typeof upsertArchiveSchema>